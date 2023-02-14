const express = require('express');
const app = express();
const port = 3333;

const mysql = require('mysql2');

// Para solucionar el error de los CORS

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'GetAways_db'
});

app.use(express.json());

// Obtener todas las rutas de senderismo
app.get('/ruta_senderismo', (req, res) => {
  connection.query('SELECT * FROM ruta_senderismo', (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

// Obtener una ruta de senderismo por su ID
app.get('/ruta_senderismo/:id', (req, res) => {
  const id = req.params.id;
  connection.query('SELECT * FROM ruta_senderismo WHERE id = ?', [id], (error, results) => {
    if (error) throw error;
    res.send(results[0]);
  });
});

// Crear una nueva ruta de senderismo
app.post('/ruta_senderismo', (req, res) => {
  const ruta = req.body;
  connection.query('INSERT INTO ruta_senderismo SET ?', ruta, (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

// Actualizar una ruta de senderismo
app.put('/ruta_senderismo/:id', (req, res) => {
  const id = req.params.id;
  const ruta = req.body;
  connection.query('UPDATE ruta_senderismo SET ? WHERE id = ?', [ruta, id], (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

// Eliminar una ruta de senderismo
app.delete('/ruta_senderismo/:id', (req, res) => {
  const id = req.params.id;
  connection.query('DELETE FROM ruta_senderismo WHERE id = ?', [id], (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

// Obtener 6 primeras rutas para el carrusel
app.get('/carrusel', (req, res) => {
  connection.query('SELECT * FROM ruta_senderismo WHERE id < 6', (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
