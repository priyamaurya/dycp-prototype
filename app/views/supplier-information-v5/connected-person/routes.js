const express = require('express')
const router = express.Router()
const path = require('node:path')

  
var oRoute = {
    "/registered-company-name-1": "registered-company-address-1",
    "/registered-company-address-1": "is-registered-company-address-same-1",
    "/registered-company-service-address-1":"registered-company-legal-form-1",
    "/registered-company-legal-form-1":"registered-company-ch-number-1",
    "/registered-company-ch-number-1":"registered-company-nature-of-control-1",
    "/registered-company-nature-of-control-1":"registered-company-registration-date-1",
    "/registered-company-registration-date-1":"registered-company-register-1",
    "/registered-company-register-1":"check-your-answers",

    "/director-name-1": "director-address-1",
    "/director-address-1": "is-director-address-same-1",
    "/director-service-address-1":"director-legal-form-1",
    "/director-legal-form-1":"director-ch-number-1",
    "/director-ch-number-1":"check-your-answers",


    "/parent-company-name-1": "parent-company-address-1",
    "/parent-company-address-1": "is-parent-company-address-same-1",
    "/parent-company-service-address-1":"parent-company-ch-number-1",
    "/parent-company-ch-number-1":"check-your-answers",


    "/taken-over-company-name-1": "taken-over-company-address-1",
    "/taken-over-company-address-1":"taken-over-company-ch-number-1",
    "/taken-over-company-ch-number-1":"taken-over-company-insolvent-date-1",
    "/taken-over-company-insolvent-date-1":"check-your-answers",

    "/other-org-with-control-name-1": "other-org-with-control-address-1",
    "/other-org-with-control-address-1": "is-other-org-with-control-address-same-1",
    "/other-org-with-control-service-address-1":"other-org-with-control-ch-number-1",
    "/other-org-with-control-ch-equivalent-overseas-1":"other-org-with-control-nature-of-control-1",
    "/other-org-with-control-nature-of-control-1":"other-org-with-control-registration-date-1",
    "/other-org-with-control-registration-date-1":"other-org-with-control-legal-form-1",
    "/other-org-with-control-legal-form-1":"check-your-answers",


    "/check-your-answers":"add-another-connected-person",

/*    "/is-same-address": "address-2",
    "/address-2": "legal-formation",
    "/legal-formation": "companies-house-number",
    "/companies-house-number": "nature-of-control",
    "/nature-of-control": "registerable-date",
    "/registerable-date": "register-name",
    "/register-name": "check-your-answers",
    "/check-your-answers": "add-another"*/
}

var oViews = {
    "/cp-type-1":"type.html",
    "/category-org-1": "category.html",
    
    "/registered-company-name-1":"name.html",
    "/registered-company-address-1":"address.html",
    "/is-registered-company-address-same-1":"is-same-address.html",
    "/registered-company-service-address-1": "address.html",
    "/registered-company-legal-form-1":"legal-formation.html",
    "/registered-company-ch-number-1":"companies-house-number.html",
    "/registered-company-nature-of-control-1":"nature-of-control.html",
    "/registered-company-registration-date-1":"date.html",
    "/registered-company-register-1":"register-name.html",

    "/director-name-1":"name.html",
    "/director-address-1":"address.html",
    "/is-director-address-same-1":"is-same-address.html",
    "/director-service-address-1": "address.html",
    "/director-legal-form-1":"legal-formation.html",
    "/director-ch-number-1":"companies-house-number.html",
    
    "/parent-company-name-1":"name.html",
    "/parent-company-address-1":"address.html",
    "/is-parent-company-address-same-1":"is-same-address.html",
    "/parent-company-service-address-1": "address.html",
    "/parent-company-ch-number-1":"companies-house-number.html",

    "/taken-over-company-name-1":"name.html",
    "/taken-over-company-address-1":"address.html",
    "/taken-over-company-ch-number-1":"companies-house-number.html",
    "/taken-over-company-insolvent-date-1":"date.html",
    
    "/other-org-with-control-name-1":"name.html",
    "/other-org-with-control-address-1":"address.html",
    "/is-other-org-with-control-address-same-1":"is-same-address.html",
    "/other-org-with-control-service-address-1":"address.html",
    "/other-org-with-control-ch-number-1":"companies-house-number.html",
    "/other-org-with-control-nature-of-control-1":"nature-of-control.html",
    "/other-org-with-control-ch-equivalent-overseas-1":"companies-house-number",
    "/other-org-with-control-registration-date-1":"date.html",
    "/other-org-with-control-legal-form-1":"legal-formation.html",



    "/category-indv-1": "category.html",
    "/category-trust-1": "category.html",
    "/person-name-only": "person.html"
}

var listOfCountries = require('../../../data/data').nationalities;


router.post('/is-registered-with-companies-house', function (req, res, next) {
    if(req.body.isRegisteredWithCompaniesHouse == 'No')
        res.redirect('cp-type-2');
    else
        res.redirect('cp-type-1');
});

router.post('/has-connected-person', function (req, res, next) {
    if(req.body.hasConnectedPerson == 'No')
        res.redirect('../supplier-information');
    else
        res.redirect('is-registered-with-companies-house');
});

router.post('/cp-type-1', function (req, res, next) {
    switch(req.body.typeOfConnectedPerson){
        case 'Individual':
            res.redirect("category-indv-1");
            break;
        case 'Trustee or trust':
            res.redirect("category-trust-1");
            break;
        default:
            res.redirect("category-org-1");
    }
});

router.post('/category-org-1', function (req, res, next) {
    switch(req.body.categoryOfConnectedPerson){
        case 'director or the same responsibilities':
            res.redirect("director-name-1");
            break;
        case 'parent or subsidiary company':
            res.redirect("parent-company-name-1");
            break;
        case 'a company your organisation has taken over':
            res.redirect("taken-over-company-name-1");
            break;
        case 'any other organisation with significant influence or control':
            res.redirect("other-org-with-control-name-1");
            break;
        default:
            res.redirect("registered-company-name-1");
    }
});

router.post('/is-registered-company-address-same-1', function (req, res, next) {
    if(req.body.isSameAddress == 'No')
        res.redirect('registered-company-legal-form-1');
    else
        res.redirect('registered-company-service-address-1');
});

router.post('/is-director-address-same-1', function (req, res, next) {
    if(req.body.isSameAddress == 'No')
        res.redirect('director-legal-form-1');
    else
        res.redirect('director-service-address-1');
});


router.post('/is-parent-company-address-same-1', function (req, res, next) {
    if(req.body.isSameAddress == 'No')
        res.redirect('parent-company-ch-number-1');
    else
        res.redirect('parent-company-service-address-1');
});

router.post('/is-other-org-with-control-address-same-1', function (req, res, next) {
    if(req.body.isSameAddress == 'No')
        res.redirect('other-org-with-control-ch-number-1');
    else
        res.redirect('other-org-with-control-service-address-1');
});

router.post('/other-org-with-control-ch-number-1', function (req, res, next) {
    if(req.body.hasCompaniesHouseNumber == 'No')
        res.redirect('other-org-with-control-ch-equivalent-overseas-1');
    else
        res.redirect('other-org-with-control-nature-of-control-1');
});




// router.post('/category-other', function (req, res, next) {
//     if ( req.body.categoryOfConnectedPerson == 'any other individual with significant influence or control' ){
//         res.redirect('person-name-only');
//     } else {
//         return next();
//     }
// });



router.get('/*', function (req, res, next) {

    if(!req.session.data.listOfCountries)
        req.session.data.listOfCountries = listOfCountries;


    if(oViews[req.url])
        res.render(path.resolve(__dirname, oViews[req.url]), {page: req.url});
    else
        res.render(path.resolve(__dirname, `${req.url.substring(1)}.html`), {page: req.url});
});
   
router.post('/*', function (req, res, next) {
    res.redirect(oRoute[req.url]);
});

module.exports = router;