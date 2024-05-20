const express = require('express')
const router = express.Router()
const path = require('node:path')

// API
const axios = require('axios');

// Add your routes here - above the module.exports line


router.post('/user-details', function (req, res) {
    res.redirect('check-answers');
})


// router.post('/event-subject', function (req, res) {

//     let eventSubUser = req.session.data.eventSubUser;

//     if (eventSubUser == 'Not listed') {
//         let startQuestion = req.session.data.startQuestion;
//         if (startQuestion == 'Company') {
//             res.redirect('../org-dashboard'); //../suppliers-c/account-home
//         }
//         else if (startQuestion == 'Trust') {
//             res.redirect('../suppliers-b/account-home');
//         }
//         else {
//             res.redirect('../suppliers-d/account-home');
//         }
//     } else {
//         res.redirect('email-address');
//     }
// })



// Add another pattern

router.get('/:index/remove-user', function (req, res) {
    res.render(path.resolve(__dirname, 'remove-user'));
})

router.post('/:index/remove-user', function (req, res) {
    let removeUser = req.session.data.removeUser;
    const users = req.session.data.userArray || [];

    if (removeUser == 'Yes' && users.length) {
        const deleteIndex = req.params.index - 1;
        const maxIndex = users.length || 0;

        if (deleteIndex <= maxIndex) {
            users.splice(deleteIndex, 1);

            req.session.data.userArray = users;
            req.session.data.userCount = users.length;
        }
    }

    res.redirect('../add-another-user');
})

router.get('/:index/check-answers', function (req, res) {
    const data = req.session.data;
    const index = parseInt(req.params.index);
    const users = data.userArray || [];

    if (!users.length) {
        return res.redirect('../add-another-user');
    }

    const user = users[req.params.index - 1] || {};

    req.session.data = {
        ...data,
        ...user,
        editUser: index,
    };

    res.redirect('../check-answers');
})


router.post('/check-answers', function (req, res) {


    const data = req.session.data;
    const users = data.userArray || [];

    const user = {
        firstName: data.firstName,
        lastName: data.lastName,
        emailAddress: data.emailAddress
    };

    if (data.editUser) {
        users[data.editUser - 1] = user;
    }
    else {
        users.push(user)
        data.userArray = users;
        data.userCount = users.length;
    }

    delete data.editUser;

    res.redirect('add-another-user');
})



router.post('/add-another-user-route', function (req, res) {
    var sessionData = req.session.data;
    var userArray = sessionData.userArray || [];

    var user = {
        "id": userArray.length + 1,
        "User": sessionData.user,
    };

    userArray.push(user);
    sessionData.userArray = userArray;
    sessionData.userCount = userArray.length;

    res.redirect('add-another-user');
})


router.post('/add-another-user', function (req, res) {
    delete req.session.data.editUser;

    

    if (req.session.data.addAnotherUser == 'Yes') {
        res.redirect('user-details');
    }
    else {

        let startQuestion = req.session.data.startQuestion;
        if (startQuestion == 'Company') {
            res.redirect('../org-dashboard');//../suppliers-c/account-home
        }
        // else if (startQuestion == 'Trust') {
        //     res.redirect('../suppliers-b/account-home');
        // }
        // else {
        //     res.redirect('../suppliers-d/account-home');
        // }
        // res.redirect('../suppliers-d/account-home');
    }
})

router.post('/add-another-user', function (req, res) {
    delete req.session.data.editUser;

    if (req.session.data.userCount == '10') {
        res.redirect('non-individual-core-data');
    }
    else {
        res.redirect('user-details');
    }
});



module.exports = router


