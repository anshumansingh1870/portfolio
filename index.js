const express = require('express')
const { connectToMongoDB } = require('./connect')
const URL = require('./models/url')
const path = require('path')
const urlRoute = require('./routes/url')
const staticRoute = require('./routes/staticRouter')

const app = express();
const PORT = 7000;

connectToMongoDB("mongodb://127.0.0.1:27017/urlShortner").then(() => console.log('MongoDB connected'))

app.set("view engine" , "ejs");
app.set('views' , path.resolve('./views'))


app.use(express.json());
app.use(express.urlencoded({extended: false}))

app.use("/url", urlRoute);
app.use("/" , staticRoute)
app.use(express.static(path.join(__dirname, 'public')))



app.get('/test' , async (req,res) => {
    const allUrls = await URL.find({})
    return res.render('myHome' , {
        urls : allUrls,
    })
})
app.get('/url/:shortId', async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
        { shortId, },
        {
            $push: {
                visitHistory: {
                    timestamp: Date.now()
                }
            }
        }
    )
    
    res.redirect(entry.redirectURL)
})

app.listen(PORT, () => console.log(`Server started at port ${PORT}`));

