const express = require('express')
const router = express.Router()
const path = require('node:path')

// API
const axios = require('axios');

router.get('/*', function(req,res, next){
  if (!req.session.proto_version)
    res.redirect('/one-login/?v=4');
  else
    return next();
});

// Route index page

router.get('/start', function (req, res) {
  // hack to simulate manage users page
  req.session.allowManageUsers = 0;
  res.render('supplier-information-v4/start');
});


router.post('/org-type', function (req, res) {
  var orgType = req.body.orgType;
  req.session.orgType = orgType;

  res.redirect('/supplier-information-v4/has-ch-number');
});

router.post('/has-ch-number', function (req, res) {
  if(req.body.chno.toLowerCase() == 'no'){
    res.redirect('/supplier-information-v4/org-id');
  } else {
    if(req.body.chnoInput == "12345678"){
      res.redirect('/supplier-information-v4/org-exists');
    } else {
      res.redirect('/supplier-information-v4/org-name');
    }
  }
});

router.post('/org-name', function (req, res) {

    console.log(req.session);
  if(req.session.orgType.toLowerCase() == "supplier" && req.body.orgName.toLowerCase() == "capita plc"){
    res.redirect('/supplier-information-v4/org-exists');
  } else if(req.session.orgType.toLowerCase() == "buyer" && req.body.orgName.toLowerCase() == "defra"){
    res.redirect('/supplier-information-v4/org-exists');
  } else {
    res.redirect('/supplier-information-v4/org-email');
  }
});


router.get('/org-address-uk', function (req, res) {
  res.render('supplier-information-v4/org-address-uk', {orgType: req.session.orgType});
});
  
router.post('/org-address-uk', function (req, res) {
  if (req.session.orgType.toLowerCase()  == 'buyer'){
    res.redirect('/supplier-information-v4/buyer-type');
  } else {
    res.redirect('/supplier-information-v4/org-overview'); 
  }
}); 


router.get('/manage-users', function (req, res) {

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

router.post('/manage-users/remove-user', function (req, res) {
  res.redirect('/supplier-information-v4/manage-users?n=userRemoved');
});

router.post('/manage-users/add-user', function (req, res) {
  res.redirect('/supplier-information-v4/manage-users?n=userAdded');
});

router.post('/manage-users/update-user-admin', function (req, res) {
  res.redirect('/supplier-information-v4/manage-users?n=userUpdatedCurrent');
});

router.post('/manage-users/update-user', function (req, res) {
  res.redirect('/supplier-information-v4/manage-users?n=userUpdated');
});

router.post('/do-devolved-regulations-apply', function (req, res) {
  if(req.body.devoledRegsApply == 'Yes'){
    res.redirect('/supplier-information-v4/devolved-regulations');
  } else {
    res.redirect('/supplier-information-v4/org-overview');
  }
  
});


/* connected persons */

// hack
router.get('/org-dashboard', function (req, res) {

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


router.get('/org-address-overseas', function (req, res) {
  res.render('supplier-information-v4/org-address-overseas', {
    countries: require(__dirname+'/data/data').countries
  })
})



module.exports = router

// router.use('/supplier-information-v4/suppliers-c', require('../../views/supplier-information-v4/suppliers-c/routes'))
// router.use('/supplier-information-v4/connected', require('../../views/supplier-information-v4/connected/routes'))
// router.use('/supplier-information-v4/mandatory', require('../../views/supplier-information-v4/mandatory/routes'))
// router.use('/supplier-information-v4/discretionary', require('../../views/supplier-information-v4/discretionary/routes'))
// router.use('/supplier-information-v4/financial', require('../../views/supplier-information-v4/financial/routes'))
// router.use('/supplier-information-v4/economical', require('../../views/supplier-information-v4/economical/routes'))
// router.use('/supplier-information-v4/user', require('../../views/supplier-information-v4/user/routes'))
// router.use('/supplier-information-v4/download', require('views/supplier-information-v4/download/routes'))
