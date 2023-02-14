const express = require('express');
const app = express();
const port = 3333;

const mysql = require('mysql2');

// Para solucionar el error de los CORS

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
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

// Autenticación de usuarios
app.post('/login', (req, res) => {
  const identifier = req.body.identifier;
  const password = req.body.password;
  
  connection.query('SELECT * FROM usuario WHERE (nombre = ? OR correo = ?) AND contraseña = ?', [identifier, identifier, password], (error, results) => {
    if (error) throw error;
    if (results.length > 0) {
      res.status(200).send('Login successful');
    } else {
      res.status(401).send('Invalid credentials');
    }
  });
});

// Registro de usuarios
app.post('/register', (req, res) => {
  const { username, email, password } = req.body;
  
  connection.query('INSERT INTO usuario (nombre, correo, contraseña) VALUES (?, ?, ?)', [username, email, password], (error, results) => {
    if (error) throw error;
    res.status(200).send('User registered successfully');
  });
});


app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
