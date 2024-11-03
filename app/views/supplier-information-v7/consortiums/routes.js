const express = require('express')
const router = express.Router()
const path = require('node:path')


// Add your routes here - above the module.exports line

// Consortium pages routing

router.post('/consortium-share-code', function (req, res) {
    res.redirect('/supplier-information-v7/consortiums/add-supplier-consortium');
  });
  
  router.post('/add-supplier-consortium', function (req, res) {
    res.redirect('/supplier-information-v7/consortiums/add-suppliers');
  });
  
  router.post('/add-suppliers', function (req, res) {
    if(req.body.addAnotherSupplier.toLowerCase() == 'yes'){
      res.redirect('/supplier-information-v7/consortiums/consortium-share-code');
    }
    else {
      res.redirect('/supplier-information-v7/consortiums/consortium-suppliers');
    }
  });
  
  router.post('/consortium-admin-name', function (req, res) {
    res.redirect('/supplier-information-v7/consortiums/consortium-admin-address');
  });
  
  router.post('/consortium-admin-address', function (req, res) {
    res.redirect('/supplier-information-v7/consortiums/consortium-admin-email');
  });
  
  router.post('/consortium-admin-email', function (req, res) {
    res.redirect('/supplier-information-v7/consortiums/consortium-name');
  });
  
  router.post('/consortium-formal-name', function (req, res) {
    res.redirect('/supplier-information-v7/consortiums/consortium-dashboard');
  });
  
  router.post('/consortium-uniqueId', function (req, res) {
    res.redirect('/supplier-information-v7/consortiums/consortium-formal-name');
  });
  
  router.post('/consortium-formal-name', function (req, res) {
    res.redirect('/supplier-information-v7/consortiums/org-dashboard');
  });
  

module.exports = router
