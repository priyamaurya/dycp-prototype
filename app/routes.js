//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()
const axios = require('axios');

// Add your routes here



// Route index page
  
router.get('/one-login', function (req, res) {
  req.session.proto_version = req.query.v;
  res.render('one-login/index', {})
})


router.get('/one-login/enter-code', function (req, res) {
  res.render('one-login/enter-code', {proto_version: req.session.proto_version})
});

router.post('/supplier-information-v1/org-number', function (req, res) {
  res.redirect('org-location');
});


router.post('/supplier-information-v1/contracting-authority', function (req, res) {
  if(req.body.contractingAuthority == 'yes')
    res.redirect('/supplier-information-v1/contracting-authority-type')
  else
    res.redirect('/supplier-information-v1/org-number')
});


router.get('/supplier-information-v4/start', function (req, res) {
  // hack to simulate manage users page
  req.session.allowManageUsers = 0;
  res.render('supplier-information-v4/start');
});


router.post('/supplier-information-v4/org-type', function (req, res) {
  var orgType = req.body.orgType;
  req.session.orgType = orgType;

  res.redirect('/supplier-information-v4/has-ch-number');
});

router.post('/supplier-information-v4/has-ch-number', function (req, res) {
  if(req.body.chno == 'no'){
    res.redirect('/supplier-information-v4/org-id');
  } else {
    if(req.body.chnoInput == "12345678"){
      res.redirect('/supplier-information-v4/org-exists');
    } else {
      res.redirect('/supplier-information-v4/org-name');
    }
  }
});

router.post('/supplier-information-v4/org-name', function (req, res) {

    console.log(req.session);
  if(req.session.orgType == "supplier" && req.body.orgName.toLowerCase() == "capita plc"){
    res.redirect('/supplier-information-v4/org-exists');
  } else if(req.session.orgType == "buyer" && req.body.orgName.toLowerCase() == "defra"){
    res.redirect('/supplier-information-v4/org-exists');
  } else {
    res.redirect('/supplier-information-v4/org-email');
  }
});


router.get('/supplier-information-v4/org-address-uk', function (req, res) {
  res.render('supplier-information-v4/org-address-uk', {orgType: req.session.orgType});
});
  
router.post('/supplier-information-v4/org-address-uk', function (req, res) {
  if (req.session.orgType  == 'buyer'){
    res.redirect('/supplier-information-v4/buyer-type');
  } else {
    res.redirect('/supplier-information-v4/org-overview'); 
  }
}); 


router.get('/supplier-information-v4/manage-users', function (req, res) {

  console.log(req.session.allowManageUsers);
  if (req.session.allowManageUsers == 0) {
    res.render('supplier-information-v4/manage-users/cannot-manage-add-org');
  } else if (req.session.allowManageUsers == 2) {
    res.render('supplier-information-v4/manage-users/manage-users',{prompt: "userRequest"});
  } else {
    res.render('supplier-information-v4/manage-users/manage-users',{notification: req.query.n});
  }
  req.session.allowManageUsers++
});

router.post('/supplier-information-v4/manage-users/remove-user', function (req, res) {
  res.redirect('/supplier-information-v4/manage-users?n=userRemoved');
});

router.post('/supplier-information-v4/manage-users/add-user', function (req, res) {
  res.redirect('/supplier-information-v4/manage-users?n=userAdded');
});

router.post('/supplier-information-v4/manage-users/update-user-admin', function (req, res) {
  res.redirect('/supplier-information-v4/manage-users?n=userUpdatedCurrent');
});

router.post('/supplier-information-v4/manage-users/update-user', function (req, res) {
  res.redirect('/supplier-information-v4/manage-users?n=userUpdated');
});


/* connected persons */

// hack
router.get('/supplier-information-v4/org-dashboard', function (req, res) {

  req.session.data.startQuestion = "Company"; // adding this line as there's no page that tells that the user is an individual
  
  var sessionData = req.session.data;
  var userArray = sessionData.userArray || [];

  if (userArray.length == 0){
      var user = {
        id: "1",
        firstName: "Laura", 
        lastName: "Brown",
        emailAddress: "laura.brown@capita.com",
        userType: "Admin"
      }
      userArray.push(user);
      sessionData.userArray = userArray;
      sessionData.userCount = userArray.length;

      res.redirect('org-dashboard');
  } else {
    res.render('supplier-information-v4/org-dashboard');
  }
  
});



router.use('/supplier-information-v4/suppliers-c', require('./views/supplier-information-v4/suppliers-c/routes'))
router.use('/supplier-information-v4/connected', require('./views/supplier-information-v4/connected/routes'))
router.use('/supplier-information-v4/mandatory', require('./views/supplier-information-v4/mandatory/routes'))
router.use('/supplier-information-v4/discretionary', require('./views/supplier-information-v4/discretionary/routes'))
router.use('/supplier-information-v4/financial', require('./views/supplier-information-v4/financial/routes'))
router.use('/supplier-information-v4/economical', require('./views/supplier-information-v4/economical/routes'))
router.use('/supplier-information-v4/user', require('./views/supplier-information-v4/user/routes'))
router.use('/supplier-information-v4/download', require('./views/supplier-information-v4/download/routes'))

/*
router.post('/supplier-information-v4/connected-persons/connected-question', function (req, res) {
  res.redirect('/supplier-information-v4/connected-persons/companies-question');
});

router.post('/supplier-information-v4/connected-persons/companies-question', function (req, res) {
  res.redirect('/supplier-information-v4/connected-persons/person-question');
});

router.post('/supplier-information-v4/connected-persons/person-question', function (req, res) {
  res.redirect('/supplier-information-v4/connected-persons/persons');
});

router.post('/supplier-information-v4/connected-persons/persons', function (req, res) {

  let connectedPersons = req.session.data.connectedPersons;

  if (connectedPersons == 'A person with significant control over the supplier') {
    res.redirect('/supplier-information-v4/connected-persons/psc-individual');

  } else if (connectedPersons == 'A director or shadow director of the supplier') {
    res.redirect('/supplier-information-v4/connected-persons/director-individual');

  } else if (connectedPersons == 'A director or shadow director of the supplier (org)') {
    res.redirect('/supplier-information-v4/connected-persons/director-individual-ni');

  } else if (connectedPersons == 'A relevant legal entity (registrable)') {
    res.redirect('/supplier-information-v4/connected-persons/gov-organisation');

  } else if (connectedPersons == 'PSC (Person of significant control) organisation or Public Authority') {
    res.redirect('/supplier-information-v4/connected-persons/psc-individual-ni');

  } else if (connectedPersons == 'A parent undertaking or a subsidiary undertaking of the supplier') {
    res.redirect('/supplier-information-v4/connected-persons/parent-sub');

  } else if (connectedPersons == 'A predecessor company of the supplier') {
    res.redirect('/supplier-information-v4/connected-persons/predecessor');

  } else if (connectedPersons == 'An organisation with the right to exercise control') {
    res.redirect('/supplier-information-v4/connected-persons/right');

  } else if (connectedPersons == 'Right to exercise control') {
    res.redirect('/supplier-information-v4/connected-persons/right');

  } else {
    res.redirect('/supplier-information-v4/connected-persons/journey-page');
  }

});


router.post('/supplier-information-v4/connected-persons/gov-organisation', function (req, res) {
  res.redirect('gov-reg-address-type');
});

router.post('/supplier-information-v4/connected-persons/director-individual-ni', function (req, res) {
  res.redirect('director-reg-address-type-ni');
});

router.post('/supplier-information-v4/connected-persons/parent-sub', function (req, res) {
  res.redirect('parent-reg-address-type');
});

router.post('/supplier-information-v4/connected-persons/predecessor', function (req, res) {
  res.redirect('pred-reg-address-type');
});

router.post('/supplier-information-v4/connected-persons/right', function (req, res) {

  let personQuestion = req.session.data.personQuestion;

  if (personQuestion == "organisation") {
    res.redirect('right-reg-address-type');
  }
  else {
    res.redirect('right-residency');
  }
});

router.post('/supplier-information-v4/connected-persons/psc-individual', function (req, res) {
  res.redirect('address-type');
});

router.post('/supplier-information-v4/connected-persons/director-individual', function (req, res) {
  res.redirect('director-residency');
});

router.post('/supplier-information-v4/connected-persons/gov-reg-address-type', function (req, res) {
  let addressTypeGovReg = req.session.data.addressTypeGovReg;

  if (addressTypeGovReg == "No") {
    res.redirect('gov-reg-address');
  } else {
    res.redirect('find-reg-address-gov');
  }
});


router.post('/supplier-information-v4/connected-persons/director-reg-address-type-ni', function (req, res) {

  let addressTypeRegDirNi = req.session.data.addressTypeRegDirNi;

  if (addressTypeRegDirNi == "No") {
    res.redirect('dir-reg-address-ni');
  } else {
    res.redirect('find-reg-address-dir-ni');
  }
});

router.post('/supplier-information-v4/connected-persons/gov-reg-address', function (req, res) {
  res.redirect('gov-service-same');
});

router.post('/supplier-information-v4/connected-persons/gov-reg-address-uk', function (req, res) {
  res.redirect('gov-service-same');
});

router.post('/supplier-information-v4/connected-persons/gov-service-same', function (req, res) {

  let serviceSame = req.session.data.serviceSame;

  if (serviceSame == "Yes") {
    res.redirect('gov-law-register');
  } else {
    res.redirect('gov-address-type');
  }
})


router.post('/supplier-information-v4/connected-persons/gov-law-register', function (req, res) {
  res.redirect('nature-of-control-gov');
})


router.post('/supplier-information-v4/connected-persons/nature-of-control-gov', function (req, res) {
  res.redirect('date-registered-gov');
})


router.post('/supplier-information-v4/connected-persons/date-registered-gov', function (req, res) {
  res.redirect('gov-register');
})


router.post('/supplier-information-v4/connected-persons/gov-register', function (req, res) {
  res.redirect('check-answers-connected-person');
})
*/