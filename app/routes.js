//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

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
  })

  

router.post('/supplier-information-v3/org-type', function (req, res) {
    var orgType = req.body.orgType;
    req.session.orgType = orgType;
  
    // if(orgType == 'buyer')
    //   res.redirect('/supplier-information-v3/buyer-type');
    // else
    res.redirect('/supplier-information-v3/has-org-id');
  });
  
  /*
  router.post('/supplier-information-v3/has-ch-number', function (req, res) {
    if(req.body.chno == 'no')
      res.redirect('/supplier-information-v3/org-id');
    else
      res.redirect('/supplier-information-v3/org-name');
  });
  
  
  router.get('/supplier-information-v3/has-org-id', function (req, res) {
    res.render('supplier-information-v3/has-org-id', {orgType: req.session.orgType});
  });
  
  
  router.post('/supplier-information-v3/has-org-id', function (req, res) {
    if ( req.body.hasOrgId ){
      if (req.body.hasOrgId == 'yes')
        res.redirect('/supplier-information-v3/has-ch-number');
      else
        res.redirect('/supplier-information-v3/org-name')
    } else 
      res.redirect('/supplier-information-v3/has-org-id');
  });
  
  
  router.get('/supplier-information-v3/org-address-uk', function (req, res) {
    res.render('supplier-information-v3/org-address-uk', {orgType: req.session.orgType});
  });
  
  
  router.post('/supplier-information-v3/org-address-uk', function (req, res) {
  
    if (req.body.addressLine1){
      if (req.session.orgType  == 'buyer'){
        res.redirect('/supplier-information-v3/buyer-type');
      } else {
        res.redirect('/supplier-information-v3/org-overview'); 
      }
    } else {
      res.render('supplier-information-v3/org-address-uk', {orgType: req.session.orgType});
    }

  
  });    */


  router.post('/supplier-information-v4/org-type', function (req, res) {
    var orgType = req.body.orgType;
    req.session.orgType = orgType;

    res.redirect('/supplier-information-v4/has-ch-number');
  });

  router.post('/supplier-information-v4/has-ch-number', function (req, res) {
    if(req.body.chno == 'no')
      res.redirect('/supplier-information-v4/org-id');
    else
      res.redirect('/supplier-information-v4/org-name');
  });
  