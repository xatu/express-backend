const express = require('express'),
    app = express(),
    cors = require('cors')
    bodyParser = require('body-parser'),    
    router = require('./routes/routes')

app.use(cors())

app.use(bodyParser.urlencoded( { extended : true }))

app.use(bodyParser.json())

app.use('/uploads', express.static('uploads'))

const port = process.env.NODE_PORT || 8080

app.use('/v1', router)

app.listen(port)

console.log('Server running at url: http://localhost:' + port + '/v1')