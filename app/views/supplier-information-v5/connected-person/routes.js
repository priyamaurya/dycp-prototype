const express = require('express')
const router = express.Router()
const path = require('node:path')

// var journey=[
//     "has-connected-person", 
//     "is-registered-with-companies-house", 
//     "type", 
//     "category" 
// ];

// for (let i = 0; i < journey.length; i++) {
//     if(journey[i] == req.url.substring(1)){
//     console.log(req.body)
//     res.redirect(journey[i+1])
//     }
// }


  
var oRoute = {
    "/has-connected-person": "is-registered-with-companies-house",
    "/is-registered-with-companies-house": "type",
    "/type": "category",
    "/category": "address"
}

var oViews = {
    "/random-name": "name.html"
}

router.get('/random-name', function (req, res) {
    console.log(path.resolve(__dirname, oViews[req.url]));
    res.render(path.resolve(__dirname, oViews[req.url]));
});

router.post('/type', function (req, res) {
    res.redirect("random-name")
});
   
router.post('/*', function (req, res, next) {
    console.log("target", oRoute[req.url])
    res.redirect(oRoute[req.url]);

    //return next(); 
});

module.exports = router;