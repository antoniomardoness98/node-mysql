const express = require('express');
const mysql = require('mysql');

const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000

const app = express()

app.use(express.json())

//creamos la conexión
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  connection: '',
  database: 'node_mysql'
})

//ROUTES
app.get('/', (req, res) => {
  res.send('Welcome to my api')
})

//Crud de clientes
app.get('/clientes', (req, res) => {
  const sql = 'SELECT * FROM clientes'

  connection.query(sql, (error, results) => {
    if (error) throw error
    if (results.length > 0){
      res.json(results)
    } else {
      res.send('No hay resultados')
    }
  })

})

app.get('/clientes/:id', (req, res) => {
  const {id} = req.params
  const sql = `SELECT * FROM clientes WHERE id=${id}`
  connection.query(sql, (error, result) => {
    if (error) throw error
    if (result.length > 0){
      res.json(result)
    } else {
      res.send('No hay resultados')
    }
  })

})

app.post('/agregar', (req, res) => {
  const sql = 'INSERT INTO clientes SET ?'
  const clienteObj = {
    nombre: req.body.nombre,
    ciudad: req.body.ciudad,
  }

  connection.query(sql, clienteObj, error => {
    if (error) throw error
    res.send('Cliente creado')
  })
})

app.put('/editar/:id', (req, res) => {
  const {id} = req.params
  const {nombre, ciudad} = req.body
  const sql = `UPDATE clientes SET nombre = '${nombre}', ciudad = '${ciudad}' WHERE id = ${id}`
  
  connection.query(sql, error => {
    if (error) throw error
    res.send('Cliente actualizado')
  })
})

app.delete('/eliminar/:id', (req, res) => {
  const {id} = req.params
  const sql = `DELETE FROM clientes WHERE id = ${id}`

  connection.query(sql, error => {
    if (error) throw error
    res.send('Cliente eliminado')
  })
})

//check connect
connection.connect(error => {
  if(error) throw error;
  console.log('Database server running!');
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))