const express = require('express'),
    conn = require('../config/connection.js'),
    upload = require('../util/upload_images'),
    router = express.Router()

// LISTAR TODOS LOS PRODUCTOS
router.get('/products', (req, res) => {
    let sql="SELECT * FROM products"    
    conn.query(sql, (err,rows) => {
        if(err) throw err
        if(rows.length > 0) {
            res.json({ 
                status: 'success',
                code: 200,
                data: rows                
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
router.get('/products/:id', (req, res) => {
    let id=req.params.id
    let sql="SELECT * FROM products WHERE id=?"    
    conn.query(sql, [id], (err,row) => {
        if(err) throw err
        if(row.length > 0) {
            res.json({ 
                status: 'success',
                code: 200,
                data: row                
            })     
        } else {
            res.json( { 
                status: 'error',
                code: 404,
                message: 'Producto no encontrado'                
            })                        
        }        
    })
})

// ELIMINAR UN PRODUCTO
router.delete('/products/:id', (req, res) => {
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
router.put('/products/:id', (req, res) => {
    let sql = "UPDATE products SET name = ?, description = ?, price = ?, image = ? WHERE id = ?"
    let json = JSON.parse(req.body.json)
    let values = [
        json.name,
        json.description,
        json.price,
        json.image,
        req.params.id
    ]
    conn.query(sql, values, err => {
        if (err) {
            console.log(err)
            res.json( { 
                status: 'error',
                code: 404,
                message: 'El producto no se ha actualizado'                
            })           
        } else {
            res.json( { 
                status: 'success',
                code: 200,
                message: 'El producto se ha actualizado correctamente'                
            })            
        }
    })    
})

// GUARDAR PRODUCTOS
router.post('/products', (req, res) => {
    let sql = "INSERT INTO products (name, description, price, image) VALUES (?,?,?,?)"
    let json = JSON.parse(req.body.json)
    let values = [
        json.name,
        json.description,
        json.price,
        json.image
    ]
    
    conn.query(sql, values, err => {
        if(err) {
            console.log(err)
            res.json( { 
                status: 'error',
                code: 404,
                message: 'El producto no se ha creado'                
            })
        } else {
            res.json( { 
                status: 'success',
                code: 200,
                message: 'El producto se ha creado correctamente'                
            })
        } 
    })
})    

// SUBIR UNA IMAGEN A UN PRODUCTO
router.post('/images', upload.single('uploads'), (req, res) => {    
    res.json({
        status: 'success',
        code: 200,
        message: 'La imagen se ha subido',
        filename: req.imageName                 
    })    
})

module.exports = router;