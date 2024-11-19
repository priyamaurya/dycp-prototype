const express = require('express')
const router = express.Router()
const path = require('node:path')

// API
const axios = require('axios');
const { nextTick } = require('node:process');



// Route index page

router.get('/*', function(req,res, next){

  req.session.admin = false;

  if (!req.session.data["v"] ){
    req.session.proto_version = 7;
    req.session.data["v"] = 7;
    req.session.data["firstName"] = 'Joe';
    req.session.data["lastName"] = 'Bloggs';
    req.session.data["chno"] = "Yes"
    req.session.data["chnoInput"] = "93939393"
    req.session.data["orgName"] = 'Random Limited';
    req.session.data["orgType"] = 'Supplier';
    req.session.data["emailAddress"] = 'info@randomlimited.co.uk';
    req.session.data["supplierArray"] = 'Consortium supplier 1';
    req.session.data["supplierShareCode"] = '6789ABCFD';
  } 
  

  // else {
    return next();
  // }
});

router.get('/start', function (req, res) {
  // hack to simulate manage users page
  req.session.allowManageUsers = 0;
  res.render('supplier-information-v7/start');
});


router.post('/org-type', function (req, res) {
  var orgType = req.body.orgType;
  req.session.data.orgType = orgType;

  res.redirect('/supplier-information-v7/has-ch-number');
});

router.post('/has-ch-number', function (req, res) {
  req.session.data["orgName"] = 'Ministry of Justice UK';
  if(req.body.chnoInput == "12345678"){
    res.redirect('/supplier-information-v7/org-exists');
  } else {
    res.redirect('/supplier-information-v7/org-name');
  }
});

router.post('/org-name', function (req, res) {

  if(req.session.data.orgType.toLowerCase() == "supplier" && req.body.orgName.toLowerCase() == "capita plc"){
    res.redirect('/supplier-information-v7/org-exists');
  } else if(req.session.data.orgType.toLowerCase() == "buyer" && req.body.orgName.toLowerCase() == "defra"){
    res.redirect('/supplier-information-v7/org-exists');
  } else if(req.session.data.orgType.toLowerCase() == "buyer"){
    res.redirect('/supplier-information-v7/org-name-match');
  } else {
    res.redirect('/supplier-information-v7/org-address-uk');
  }

});

router.post('/org-name-match', function (req, res) {
  res.redirect('/supplier-information-v7/org-address-uk');
});


// router.get('/org-address-uk', function (req, res) {
//   res.render('supplier-information-v7/org-address-uk', {orgType: req.session.data.orgType});
// });
  
router.post('/org-email', function (req, res) {
  if (req.session.data.orgType.toLowerCase()  == 'buyer'){
    res.redirect('/supplier-information-v7/buyer-type');
  } else {
    res.redirect('/supplier-information-v7/org-overview'); 
  }
}); 


router.get('/buyer-type', function (req, res) {
  console.log(req.session)

  if (req.query['alternative-journey'] == 'yes')
    req.session.data['alternativeJourney'] = 'yes';
  else
    req.session.data['alternativeJourney'] = 'no';

  res.render('supplier-information-v7/buyer-type');
}); 




router.get('/manage-users', function (req, res) {

  console.log(req.session.allowManageUsers);
  if (req.session.allowManageUsers == 0) {
    res.render('supplier-information-v7/manage-users/cannot-manage-add-org');
  } else if (req.session.allowManageUsers == 2) {
    res.render('supplier-information-v7/manage-users/manage-users',{prompt: "userRequest"});
  } else {
    res.render('supplier-information-v7/manage-users/manage-users',{notification: req.query.n});
  }
  req.session.allowManageUsers++
});

router.post('/manage-users/remove-user', function (req, res) {
  res.redirect('/supplier-information-v7/manage-users?n=userRemoved');
});

router.post('/manage-users/add-user', function (req, res) {
  res.redirect('/supplier-information-v7/manage-users?n=userAdded');
});

router.post('/manage-users/update-user-admin', function (req, res) {
  res.redirect('/supplier-information-v7/manage-users?n=userUpdatedCurrent');
});

router.post('/manage-users/update-user', function (req, res) {
  res.redirect('/supplier-information-v7/manage-users?n=userUpdated');
});

router.post('/do-devolved-regulations-apply', function (req, res) {
  if(req.body.devoledRegsApply == 'Yes'){
    res.redirect('/supplier-information-v7/devolved-regulations');
  } else {
    if(req.session.data['alternativeJourney'] = 'yes')
      res.redirect('/supplier-information-v7/buyer-overview');
    else
      res.redirect('/supplier-information-v7/org-overview');
  }
  
});

router.post('/devolved-regulations', function (req, res) {
  if(req.session.data['alternativeJourney'] = 'yes')
    res.redirect('/supplier-information-v7/buyer-overview');
  else
    res.redirect('/supplier-information-v7/org-overview');
});


router.post('/buyer-overview', function (req, res) {
  if(req.session.data['alternativeJourney'] = 'yes')
    res.redirect('/supplier-information-v7/org-dashboard-4?registeredAsBoth=yes'); 
  else
    res.redirect('/supplier-information-v7/org-dashboard'); 
  //-3?registered-as-buyer=yes#buyer-details
});


/* connected persons */

// hack
router.get('/org-dashboard', function (req, res) {

  

  req.session.data.startQuestion = "Company"; // adding this line as there's no page that tells that the user is an individual
  
  var sessionData = req.session.data;
  var userArray = sessionData.userArray || [];

  console.log(sessionData)

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
    res.render('supplier-information-v7/org-dashboard');
  }
  
});

router.get('/org-dashboard-redirect', function (req, res) {
  var orgtype = req.query.orgtype ? req.query.orgtype : "Supplier";
  req.session.data['orgType'] = orgtype;
  res.redirect('org-dashboard-4');
});


router.get('/org-dashboard-4', function (req, res) {
  var registeredAsBoth = req.query.registeredAsBoth ? req.query.registeredAsBoth : "no";
  var showSuccessBanner = req.query.showSuccessBanner ? req.query.showSuccessBanner : "no";
  res.render('supplier-information-v7/org-dashboard-4',{registeredAsBoth: registeredAsBoth, showSuccessBanner: showSuccessBanner})
});



router.get('/org-address-overseas', function (req, res) {
  console.log(__dirname);
  res.render('supplier-information-v7/org-address-overseas', {
    countries: require('../../data/data').countries
  })
})


router.get('/org-id-overseas-country', function (req, res) {
  console.log(__dirname);
  res.render('supplier-information-v7/org-id-overseas-country', {
    countries: require('../../data/data').countries
  })
})




module.exports = router
