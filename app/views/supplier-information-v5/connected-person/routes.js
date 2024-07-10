const express = require('express')
const router = express.Router()
const path = require('node:path')

  
var oRoute = {
    "/has-connected-person": "is-registered-with-companies-house",
    "/is-registered-with-companies-house": "type",
    "/type": "category",
    "/category": "name",
    "/name": "address",
    "/address": "is-same-address",
    "/is-same-address": "address-2",
    "/address-2": "legal-formation",
    "/legal-formation": "companies-house-number",
    "/companies-house-number": "nature-of-control",
    "/nature-of-control": "registerable-date",
    "/registerable-date": "register-name",
    "/register-name": "check-your-answers",
    "/check-your-answers": "add-another"
}

var oViews = {
    "/address-2": "address.html",
    "/registerable-date": "date.html"
}


router.post('/has-connected-person', function (req, res, next) {
    if(req.body.hasConnectedPerson == 'No')
        res.redirect('../supplier-information');
    else
        return next();
});

router.post('/type', function (req, res, next) {

    switch(req.body.typeOfConnectedPerson){
        case 'Individual':
            console.log(req.body.typeOfConnectedPerson);
            break;
        case 'Trustee or trust':
            console.log(req.body.typeOfConnectedPerson);
            break;
        default:
            return next();

    }

    if(req.body.hasConnectedPerson == 'No')
        res.redirect('../supplier-information');
    else
        return next();
});


router.get('/*', function (req, res, next) {
    if(oViews[req.url])
        res.render(path.resolve(__dirname, oViews[req.url]), {page: req.url});
    else
        res.render(path.resolve(__dirname, `${req.url.substring(1)}.html`), {page: req.url});
});
   
router.post('/*', function (req, res, next) {
    res.redirect(oRoute[req.url]);
});

module.exports = router;