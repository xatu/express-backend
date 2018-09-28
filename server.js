const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),    
    router = require('./routes/routes')

app.use(bodyParser.urlencoded( { extended : true }))

app.use(bodyParser.json())

app.use('/uploads', express.static('uploads'))

const port = process.env.NODE_PORT || 8080

app.use('/api', router)

app.listen(port)

console.log('Server running at url: http://localhost:' + port + '/api')