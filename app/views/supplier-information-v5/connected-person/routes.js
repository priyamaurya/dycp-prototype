const express = require('express')
const router = express.Router()
const path = require('node:path')

var journey=[
    "has-connected-person", 
    "is-registered-with-companies-house", 
    "type", 
    "category" 
   ];
  
   
  router.post('/*', function (req, res, next) {
    for (let i = 0; i < journey.length; i++) {
      if(journey[i] == req.url.substring(1)){
        console.log(req.body)
        res.redirect(journey[i+1])
      }
    }
  
    //return next();
  });
  
  module.exports = router;