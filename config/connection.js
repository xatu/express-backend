const env = require('./env.json'),
    mysql = require('mysql')

let node_env = process.env.NODE_ENV || 'development'

console.log(env[node_env])

module.exports = mysql.createConnection({
    host: env[node_env].host,
    user: env[node_env].user,
    password: env[node_env].password,    
    database: env[node_env].database
})

 