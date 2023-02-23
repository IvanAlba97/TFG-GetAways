const express = require('express');
const app = express();
const port = 3333;

const mysql = require('mysql2');



// Para solucionar el error de los CORS

const cors = require('cors');

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'GetAways_db'
});

app.use(express.json());

const bcrypt = require('bcrypt');
const router = express.Router();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const session = require('express-session');

// Configuración de express-session
app.use(session({
  secret: 'mi-secreto',
  resave: false,
  saveUninitialized: true,
  //store: sessionStore,
  cookie: { secure: false }
}));

const authRouter = express.Router();

app.post('/auth/login', (req, res) => {
  const { identifier, password } = req.body;
  connection.query('SELECT * FROM usuario WHERE nombre = ? OR correo = ?', [identifier, identifier], (error, results) => {
    if (error) {
      res.status(500).send('Error al buscar usuario');
    } else if (results.length === 0) {
      res.status(401).send('Usuario no encontrado');
    } else {
      const user = results[0];
      bcrypt.compare(password, user.contraseña, (error, result) => {
        if (error) {
          res.status(500).send('Error al comparar contraseñas');
        } else if (result) {
          // Inicializar la sesión y almacenar la información del usuario en la sesión
          req.session.user = { id: user.id, nombre: user.nombre, correo: user.correo };
          res.json(req.session.user);
        } else {
          res.status(401).send('Contraseña incorrecta');
        }
      });
    }
  });
});

authRouter.post('/logout', (req, res) => {
  req.session.destroy();
  res.send('Cierre de sesión exitoso');
});

authRouter.post('/register', (req, res) => {
  const { username, email, password } = req.body;

  bcrypt.hash(password, 10, (error, hash) => {
    if (error) {
      res.status(500).send('Error al cifrar contraseña');
    } else {
      connection.query('INSERT INTO Usuario (nombre, correo, contraseña) VALUES (?, ?, ?)', [username, email, hash], (error, results) => {
        if (error) {
          res.status(500).send('Error al registrar usuario');
        } else {
          res.send('Registro exitoso');
        }
      });
    }
  });
});

app.use('/auth', authRouter);

app.get('/', (req, res) => {
  res.send('Página principal');
});

app.get('/perfil', (req, res) => {
  if (req.session.user) {
    res.send(`Bienvenido ${req.session.user.username}`);
  } else {
    res.redirect('/login');
  }
});

app.get('/user', (req, res) => {
  if (req.session.user) {
    // Devolver la información del usuario almacenada en la sesión
    res.json({ user: req.session.user });
  } else {
    res.status(401).json({ error: 'No se ha iniciado sesión' });
  }
});

app.get('/session', (req, res) => {
  res.json({ session: req.session });
});

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

app.get('/search', (req, res) => {
  const { busqueda } = req.query;
  const query = `SELECT * FROM ruta_senderismo WHERE nombre LIKE '%${busqueda}%'`;

  connection.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.get('/equipaje', (req, res) => {
  const userId = req.session.user?.id;
  if (!userId) {
    res.sendStatus(401);
    return;
  }

  connection.query('SELECT * FROM lista_revisar WHERE id_usuario = ?', [userId], (err, result) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
      return;
    }

    const items = result.map(row => ({
      id: row.id,
      elemento: row.elemento,
      checked: row.marcado === 1
    }));

    res.json(items);
  });
});

app.post('/equipaje', (req, res) => {
  const userId = req.session.user?.id;

  if (!userId) {
    return res.status(401).json({ error: 'No se ha iniciado sesión' });
  }

  const elemento = req.body.elemento;
  if (!elemento) {
    return res.status(400).json({ error: 'El elemento es requerido' });
  }

  connection.query(
    'INSERT INTO lista_revisar (id_usuario, elemento, marcado) VALUES (?, ?, ?)',
    [userId, elemento, false],
    (error, result) => {
      if (error) {
        console.error('Error al insertar elemento en la base de datos', error);
        return res.status(500).json({ error: 'Error al insertar elemento en la base de datos' });
      }

      const nuevoId = result.insertId;
      const nuevoElemento = { id: nuevoId, elemento: elemento, marcado: false };
      res.json(nuevoElemento);
    }
  );
});

// Endpoint para actualizar el estado de un elemento
app.put('/equipaje/:id', (req, res) => {
  const { id } = req.params;
  const { checked } = req.body;

  const query = 'UPDATE lista_revisar SET marcado = ? WHERE id = ?';

  connection.query(query, [checked, id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error al actualizar el estado del elemento');
    } else {
      res.send('Estado del elemento actualizado correctamente');
    }
  });
});









app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});