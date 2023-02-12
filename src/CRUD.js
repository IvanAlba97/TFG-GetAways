const express = require('express');
const app = express();
const mysql = require('mysql2');

// Para solucionar el error de los CORS

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Configurar la conexión a la base de datos
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'getaways_db'
});

// Conectar a la base de datos
connection.connect();

app.use(express.json());

// Obtener todas las rutas
app.get('/', (req, res) => {
  connection.query('SELECT * FROM ruta_senderismo', (error, results) => {
    if (error) {
      return res.status(500).json({
        error: error
      });
    }
    res.json(results);
  });
});

// Obtener una ruta por ID
app.get('/:id', (req, res) => {
  const rutaId = req.params.id;
  connection.query('SELECT * FROM ruta_senderismo WHERE id = ?', [rutaId], (error, results) => {
    if (error) {
      return res.status(500).json({
        error: error
      });
    }
    if (results.length === 0) {
      return res.status(404).json({
        error: 'Ruta no encontrada'
      });
    }
  });
});

// Crear una nueva ruta
app.post('/', (req, res) => {
  const ruta = req.body;
  connection.query('INSERT INTO ruta_senderismo SET ?', ruta, (error, result) => {
    if (error) {
      return res.status(500).json({
        error: error
      });
    }
    res.status(201).json({
      id: result.insertId,
      message: 'Ruta creada'
    });
  });
});

// Actualizar una ruta
app.put('/:id', (req, res) => {
  const rutaId = req.params.id;
  const ruta = req.body;
  connection.query('UPDATE ruta_senderismo SET ? WHERE id = ?', [ruta, rutaId], (error, result) => {
    if (error) {
      return res.status(500).json({
        error: error
      });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({
        error: 'Ruta no encontrada'
      });
    }
    res.json({
      message: 'Ruta actualizada'
    });
  });
});

// Eliminar una ruta
app.delete('/:id', (req, res) => {
  const rutaId = req.params.id;
  connection.query('DELETE FROM ruta_senderismo WHERE id = ?', [rutaId], (error, result) => {
    if (error) {
      return res.status(500).json({
        error: error
      });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({
        error: 'Ruta no encontrada'
      });
    }
    res.json({
      message: 'Ruta eliminada'
    });
  });
});

// Escuchar en un puerto específico
app.listen(3333, () => {
  console.log('Servidor iniciado en el puerto 3333');
});
