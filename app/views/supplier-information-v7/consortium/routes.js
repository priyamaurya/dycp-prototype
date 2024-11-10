const express = require('express')
const router = express.Router()
const path = require('node:path')


// Add your routes here - above the module.exports line

// router.get('/overview', function (req, res) {

//     showConsortia = req.query.showConsortia ? req.query.showConsortia : false;
//     res.render(path.resolve(__dirname, 'overview'), {showConsortia, showConsortia});
// });


router.post('/confirm-supplier', function (req, res) {
    res.redirect('overview?showConsortia=true');
});

router.post('/add-another', function (req, res) {
    res.redirect('consortium-name');
});

router.post('/consortium-name', function (req, res) {
    res.redirect('select-consortium-lead');
});


router.post('/select-consortium-lead', function (req, res) {
    res.redirect('overview');
});


router.post('/enter-sharecode', function (req, res) {
    res.redirect('confirm-supplier');
});




module.exports = router



