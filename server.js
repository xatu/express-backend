const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mysql = require('mysql')

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123',
    database: 'curso_angular4'
})

app.use(bodyParser.urlencoded( { extended : true }))

app.use(bodyParser.json())

const port = 8080

const router = express.Router()

// LISTAR TODOS LOS PRODUCTOS
router.get('/products', (req, res) => {
    let sql="SELECT * FROM products"    
    conn.query(sql, (err,rows) => {
        if(err) throw err
        if(rows.length > 0) {
            res.json({ 
                status: 'success',
                code: 200,
                message: rows                
            })     
        } else {
            res.json( { 
                status: 'error',
                code: 404,
                message: 'No se ha encontrado ningun producto'                
            })
        }        
    })
})

// DEVOLVER UN SOLO PRODUCTO
router.get('/product/:id', (req, res) => {
    let id=req.params.id
    let sql="SELECT * FROM products WHERE id=?"    
    conn.query(sql, [id], (err,row) => {
        if(err) throw err
        if(row.length > 0) {
            res.json({ 
                status: 'success',
                code: 200,
                message: row                
            })     
        } else {
            res.json( { 
                status: 'error',
                code: 404,
                message: 'No se ha encontrado ningun producto'                
            })                        
        }        
    })
})

// ELIMINAR UN PRODUCTO
router.post('/delete-product/:id', (req, res) => {
    let id=req.params.id
    let sql="DELETE FROM products WHERE id=?"    
    conn.query(sql, [id], (err,result) => {
        if(err) throw err
        res.json({ 
            status: 'success',
            code: 200,
            message: 'delete ' + result.affectedRows + ' rows'                
        })     
    })    
})


// ACTUALIZAR UN PRODUCTO
router.post('/update-product/:id', (req, res) => {
})

// GUARDAR PRODUCTOS
router.post('/insert-product', (req, res) => {
    let sql = "INSERT INTO products (name, description, price, image) VALUES (?,?,?,?)"
    let json = JSON.parse(req.body.json)
    let values = [
        json.name,
        json.description,
        json.price,
        json.image
    ]
    
    conn.query(sql, values, (err) => {
        if(err) {
            console.log(err)
            res.json( { 
                status: 'error',
                code: 404,
                message: 'Producto NO se ha creado'                
            })
        } else {
            res.json( { 
                status: 'success',
                code: 200,
                message: 'Producto creado correctamente'                
            })
        } 
    })
})    



// SUBIR UNA IMAGEN A UN PRODUCTO
router.post('/upload-file', (req, res) => {

})

app.use('/api',router)

app.listen(port)

console.log('Server running at url: http://localhost:' + port + '/api')