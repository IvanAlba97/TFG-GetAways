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

app.post('/auth/logout', (req, res) => {
  // Destruir la sesión del usuario
  req.session.destroy(error => {
    if (error) {
      console.log('Error al cerrar sesión:', error);
      res.status(500).json({ message: 'Error al cerrar sesión' });
    } else {
      res.clearCookie('connect.sid');
      res.json({ message: 'Sesión cerrada exitosamente' });
    }
  });
  req.session = null;
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

// Definir la ruta para obtener los datos del usuario con el id dado
app.get('/user/:id', (req, res) => {
  const userId = req.params.id;
  const sql = `SELECT * FROM Usuario WHERE id = ${userId}`;

  connection.query(sql, (error, results) => {
    if (error) {
      console.error('Error al obtener los datos del usuario:', error);
      res.status(500).json({ error: 'Error al obtener los datos del usuario' });
    } else {
      if (results.length > 0) {
        const user = results[0];
        res.json(user);
      } else {
        res.status(404).json({ error: 'Usuario no encontrado' });
      }
    }
  });
});

app.get('/session', (req, res) => {
  res.json({ session: req.session });
});

// Obtener todas las rutas de senderismo
app.get('/ruta-senderismo', (req, res) => {
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

// Definir la ruta para manejar la solicitud DELETE
app.delete('/equipaje/:itemId', (req, res) => {
  const itemId = req.params.itemId;

  const query = 'DELETE FROM lista_revisar WHERE id = ?';

  connection.query(query, [itemId], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error al eliminar el elemento');
    } else {
      res.send('Elemento eliminado correctamente');
    }
  });
});

app.get('/ruta-pendiente', (req, res) => {
  const idUsuario = req.session.user.id;

  if (!idUsuario) {
    res.status(401).json({ error: 'No autorizado' });
  } else {
    connection.query('SELECT ruta.id, ruta.nombre, ruta.descripcion, ruta.imagen, ruta.longitud, ruta.tipo, ruta.dificultad, ruta.permiso_necesario, ruta.como_llegar, ruta.enlace_maps, ruta.media_valoraciones FROM ruta_senderismo AS ruta JOIN ruta_pendiente AS pendiente ON ruta.id = pendiente.id_ruta WHERE pendiente.id_usuario = ?', [idUsuario], (error, results) => {
      if (error) throw error;
      res.json(results);
    });
  }
});

// Consulta si existe una ruta pendiente para el usuario con el id especificado
app.get('/ruta-pendiente/:id', (req, res) => {
  const idUsuario = req.session.user.id;

  if (!idUsuario) {
    res.status(401).json({ error: 'No autorizado' });
  } else {
    connection.query('SELECT EXISTS(SELECT * FROM ruta_pendiente WHERE id_usuario = ? AND id_ruta = ?) AS existe', [idUsuario, req.params.id], (error, results) => {
      if (error) throw error;
      res.json(results[0]);
    });
  }
});

// Actualiza el estado de la ruta pendiente
app.post('/actualizar-pendientes', (req, res) => {
  const { id } = req.body;
  const id_ruta = id;
  /* const checked_ruta = checked; */
  const id_usuario = req.session.user.id;
  let query;
  let values;

  // Consulta si existe una ruta pendiente para el usuario con el id especificado
  connection.query('SELECT EXISTS(SELECT * FROM ruta_pendiente WHERE id_usuario = ? AND id_ruta = ?) AS existe', [id_usuario, id_ruta], (error, results) => {
    if (error) throw error;

    // Si existe la ruta pendiente, actualiza su estado
    if (results[0].existe) {
      query = 'DELETE FROM ruta_pendiente WHERE id_usuario = ? AND id_ruta = ?';
      values = [id_usuario, id_ruta];
    } else {
      // Si no existe la ruta pendiente, la crea con el estado especificado
      query = 'INSERT INTO ruta_pendiente (id_usuario, id_ruta) VALUES (?, ?)';
      values = [id_usuario, id_ruta];
    }

    // Ejecuta la consulta
    connection.query(query, values, (error, results) => {
      if (error) throw error;
      res.json({ success: true });
    });
  });
});

// Consulta si existe una ruta completada para el usuario con el id especificado
app.get('/ruta-completada/:id', (req, res) => {
  const idUsuario = req.session.user.id;

  if (!idUsuario) {
    res.status(401).json({ error: 'No autorizado' });
  } else {
    connection.query('SELECT EXISTS(SELECT * FROM ruta_completada WHERE id_usuario = ? AND id_ruta = ?) AS existe', [idUsuario, req.params.id], (error, results) => {
      if (error) throw error;
      res.json(results[0]);
    });
  }
});

// Actualiza el estado de la ruta completada
app.post('/actualizar-completadas', (req, res) => {
  const { id } = req.body;
  const id_ruta = id;
  const id_usuario = req.session.user.id;
  let query;
  let values;

  // Consulta si existe una ruta completada para el usuario con el id especificado
  connection.query('SELECT EXISTS(SELECT * FROM ruta_completada WHERE id_usuario = ? AND id_ruta = ?) AS existe', [id_usuario, id_ruta], (error, results) => {
    if (error) throw error;

    // Si existe la ruta completada, actualiza su estado
    if (results[0].existe) {
      query = 'DELETE FROM ruta_completada WHERE id_usuario = ? AND id_ruta = ?';
      values = [id_usuario, id_ruta];
    } else {
      // Si no existe la ruta completada, la crea con el estado especificado
      query = 'INSERT INTO ruta_completada (id_usuario, id_ruta) VALUES (?, ?)';
      values = [id_usuario, id_ruta];
    }

    // Ejecuta la consulta
    connection.query(query, values, (error, results) => {
      if (error) throw error;
      res.json({ success: true });
    });
  });
});


app.get('/ruta-completada', (req, res) => {
  const idUsuario = req.session.user.id;

  if (!idUsuario) {
    res.status(401).json({ error: 'No autorizado' });
  } else {
    connection.query('SELECT ruta.id, ruta.nombre, ruta.descripcion, ruta.imagen, ruta.longitud, ruta.tipo, ruta.dificultad, ruta.permiso_necesario, ruta.como_llegar, ruta.enlace_maps, ruta.media_valoraciones FROM ruta_senderismo AS ruta JOIN ruta_completada AS completada ON ruta.id = completada.id_ruta WHERE completada.id_usuario = ?', [idUsuario], (error, results) => {
      if (error) throw error;
      res.json(results);
    });
  }
});

// Manejador para obtener todas las valoraciones
app.get('/comments/:id_ruta', (req, res) => {
  const { id_ruta } = req.params;
  connection.query('SELECT v.*, u.nombre FROM valoracion v JOIN usuario u ON v.id_usuario = u.id WHERE v.id_ruta = ?', [id_ruta], (err, results) => {
    if (err) {
      console.error('Error executing MySQL query: ' + err.stack);
      return res.status(500).json({ message: 'Internal server error' });
    }
    res.json(results);
  });
});

// Ruta para agregar nuevos comentarios
app.post('/nuevo-comentario', (req, res) => {
  const id_usuario = req.session.user.id;
  // Obtiene los datos del comentario desde el cuerpo de la solicitud
  const { id_ruta, valoracion, comentario, publica } = req.body;

  // Crea una nueva entrada en la tabla valoracion con los datos del comentario
  const query = `INSERT INTO valoracion (id_usuario, id_ruta, valoracion, comentario, publica) VALUES (${id_usuario}, ${id_ruta}, ${valoracion}, '${comentario}', ${publica})`;

  connection.query(query, (error, results, fields) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error al agregar el comentario');
    } else {
      res.status(200).send('Comentario agregado correctamente');
    }
  });
});









app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});