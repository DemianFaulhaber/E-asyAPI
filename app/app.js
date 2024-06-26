const express = require('express');

const router = require("../routes/router");

const cors = require('cors')

const app = express()



app.get("/", (req,res) => {
    res.send("running on express")
})

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(cors())

app.use("/api/v1", router)



module.exports = app