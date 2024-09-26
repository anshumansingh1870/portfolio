const express = require('express');
const URL = require('../models/url');

const router = express.Router();

router.get('/' , async (req, res) => {
    const allurls = await URL.find({})
    return res.render('myHome', {
        urls: allurls
    })
})

router.get('/dashboard' , async (req, res) => {
    const allurls = await URL.find({})
    return res.render('dashboard', {
        urls: allurls
    })
})

module.exports = router;