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

// Autenticación de usuarios
/* app.post('/login', (req, res) => {
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
}); */

// Registro de usuarios
/* app.post('/register', (req, res) => {
  const { username, email, password } = req.body;
  connection.query('INSERT INTO usuario (nombre, correo, contraseña) VALUES (?, ?, ?)', [username, email, password], (error, results) => {
    if (error) throw error;
    res.status(200).send('User registered successfully');
  });
}); */

app.get('/search', (req, res) => {
  const { busqueda } = req.query;
  const query = `SELECT * FROM ruta_senderismo WHERE nombre LIKE '%${busqueda}%'`;

  connection.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});







app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});