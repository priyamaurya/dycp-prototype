const express = require('express')
const router = express.Router()
const path = require('node:path')


// Add your routes here - above the module.exports line

router.get('/overview', function (req, res) {

    showConsortia = req.query.showConsortia ? req.query.showConsortia : false;
    showNotification = req.query.showNotification ? req.query.showNotification : false;
    res.render(path.resolve(__dirname, 'overview'), {showConsortia, showNotification});
});


router.post('/add-another', function (req, res) {
    res.redirect('consortium-name');
});

router.post('/consortium-name', function (req, res) {
    res.redirect('select-consortium-lead');
});


router.post('/select-consortium-lead', function (req, res) {
    if(req.body['consortiumLead'].includes("International"))
        res.redirect('address-non-uk');
    else
        res.redirect('address');
});

router.post('/address', function (req, res) {
    res.redirect('overview');
});

router.post('/address-non-uk', function (req, res) {
    res.redirect('overview');
});

router.post('/enter-sharecode', function (req, res) {
    res.redirect('confirm-supplier');
});

router.post('/confirm-supplier', function (req, res) {
    res.redirect('overview?showConsortia=true&showNotification=true');
});


router.post('/update-sharecode', function (req, res) {
    res.redirect('overview?showConsortia=true&showNotification=true');
});


router.post('/remove-organisation', function (req, res) {
    res.redirect('overview');
});




module.exports = router



