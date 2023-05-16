const express = require('express')
const mongoose = require('mongoose')
const urlRoute = require('./routes/url')
const URL = require('./models/url')
const app = express()
require('dotenv').config()

// MongoDB Connection
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true
}).then(()=>console.log("Connect DataBase Succeed"))
.catch((err)=>console.console.log(err))

app.use(express.json())

//Router
app.use("/url", urlRoute)

app.get('/:shortId', async (req, res) => {
    const shortId = req.params.shortId
    const entry = await URL.findOneAndUpdate({
        shortId
    }, {$push: {
        visitHistory: {
            timestamp: Date.now()
        }
    }})
    res.redirect(entry.redirectURL)
})

//Set Port
const port = process.env.PORT || 4000
app.listen(port, () => {
    console.log(`Start Server In Port ${port}`)
})