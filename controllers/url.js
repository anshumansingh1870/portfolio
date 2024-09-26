const shortid = require('shortid');
const URL = require('../models/url')


async function handleGenerateNewShortUrl(req , res) {
    const body = req.body;
    if(!body.url) return res.status(400).json({error: 'url is required'}) 
    const shortId = shortid();

     await URL.create({
        shortId: shortId,
        newUrlCreated: 'http://localhost:7000/'+shortId,
        redirectURL: body.url,
        visitHistory: [],
     })

     return res.render('newUrl' , {
        newUrl: 'http://localhost:7000/url/'+shortId
     })
    //  return res.json(
    //     { id: shortId , newUrl: 'http://localhost:7000/url/'+shortId}
    // )
}

async function handleGetAnalytics(req , res){
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId })
    return res.json({ totalClicks: result.visitHistory.length , analytics: result.visitHistory})
}

module.exports = {
    handleGenerateNewShortUrl,
    handleGetAnalytics
}