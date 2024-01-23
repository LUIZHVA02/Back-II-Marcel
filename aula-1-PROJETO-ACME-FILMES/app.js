const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()

app.use ((request, response, next)=>{

    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')

    app.use(cors())

    next()
})