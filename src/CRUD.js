const express = require('express');
const app = express();
const port = 3333;

const mysql = require('mysql2');

const { check, validationResult } = require('express-validator');



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

  if (!identifier || !password) {
    return res.status(400).send({ message: 'Debes proporcionar un usuario y una contraseña' });
  }

  connection.query('SELECT * FROM usuario WHERE nombre = ? OR correo = ?', [identifier, identifier], (error, results) => {
    if (error) {
      res.status(500).send('Error al buscar usuario');
    } else if (results.length === 0) {
      res.status(401).send({message: 'Usuario no encontrado'});
    } else {
      const user = results[0];
      bcrypt.compare(password, user.contraseña, (error, result) => {
        if (error) {
          res.status(500).send('Error al comparar contraseñas');
        } else if (result) {
          // Inicializar la sesión y almacenar la información del usuario en la sesión
          req.session.user = { id: user.id, nombre: user.nombre, correo: user.correo };
          req.session.cookie.maxAge = 30 * 60 * 1000; // 30 minutos
          res.json(req.session.user);
        } else {
          res.status(401).send({message: 'Contraseña incorrecta'});
        }
      });
    }
  });
});



app.post('/auth/logout', (req, res) => {
  req.session.destroy(error => {
    if (error) {
      console.log('Error al cerrar sesión:', error);
      res.status(500).json({ message: 'Error al cerrar sesión' });
    } else {
      res.clearCookie('connect.sid');
      res.json({ message: 'Sesión cerrada exitosamente' });
    }
    // Cualquier código que necesites ejecutar después de la destrucción de la sesión debe estar aquí
  });
});


authRouter.post('/register', (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).send({ error: 'Debes completar todos los campos.' });
  }

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

// Middleware para manejar los errores de validación de los datos recibidos en el cuerpo de las peticiones
function validarDatos(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}

// Ruta para actualizar el nombre del usuario
app.post('/actualizar-nombre', (req, res) => {
  const { nombre } = req.body;
  const { id } = req.session.user;

  // Comprobar si el nombre está vacío
  if (!nombre) {
    return res.status(400).json({ message: 'El campo nombre es obligatorio.' });
  }

  connection.query('UPDATE usuario SET nombre = ? WHERE id = ?', [nombre, id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error al actualizar el nombre' });
    }

    // Actualizar el valor de la sesión con el nuevo nombre
    req.session.user.nombre = nombre;

    res.json({ user: req.session.user, message: 'Usuario actualizado correctamente' });
  });
});


// Ruta para actualizar el correo del usuario
app.post('/actualizar-correo', (req, res) => {
  const { correo, correoAntiguo } = req.body;
  const { id, correo: correoActual } = req.session.user;

  // Comprobar si el correo y el correoAntiguo no están vacíos
  if (!correo || !correoAntiguo) {
    return res.status(400).json({ message: 'Los campos correo antiguo y correo nuevo son obligatorios.' });
  }

  // Comprobar si el correo y el correoAntiguo son válidos
  if (!isValidEmail(correo) || !isValidEmail(correoAntiguo)) {
    return res.status(400).json({ message: 'El correo antiguo y el correo nuevo deben ser válidos' });
  }

  // Comprobar si el correoAntiguo es igual al correoActual
  if (correoAntiguo !== correoActual) {
    return res.status(400).json({ message: 'El correo antiguo no coincide con el correo actual del usuario' });
  }

  connection.query('UPDATE usuario SET correo = ? WHERE id = ?', [correo, id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error al actualizar el correo' });
    }
    // Actualizar el valor de la sesión con el nuevo correo
    req.session.user.correo = correo;

    res.json({ user: req.session.user, message: 'Correo actualizado correctamente' });
  });
});

function isValidEmail(email) {
  // Expresión regular para validar el formato del correo electrónico
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Devuelve true si el correo electrónico coincide con el formato de la expresión regular
  return emailRegex.test(email);
}

// Ruta para actualizar la contraseña del usuario
app.post('/actualizar-contrasena', (req, res) => {
  const { contrasenaAntigua, contrasenaNueva, contrasenaNuevaRepetida } = req.body;
  const { id } = req.session.user;

  // Comprobar si la contraseña y la contraseñaNueva no están vacías
  if (!contrasenaAntigua || !contrasenaNueva || !contrasenaNuevaRepetida) {
    return res.status(400).json({ message: 'Todos los campos referentes a la contraseña son obligatorios.' });
  }

  // Obtener la contraseña encriptada de la base de datos
  connection.query('SELECT contraseña FROM usuario WHERE id = ?', [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error al actualizar la contraseña' });
    }

    if (result.length === 0) {
      return res.status(400).json({ message: 'El usuario no existe' });
    }

    const hashedPassword = result[0].contraseña;

    // Comparar la contraseña antigua con la existente en la base de datos
    bcrypt.compare(contrasenaAntigua, hashedPassword, (err, isMatch) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error al actualizar la contraseña' });
      }

      if (!isMatch) {
        return res.status(400).json({ message: 'La contraseña antigua no coincide con la contraseña actual del usuario' });
      }

      // Comprobar si la nueva contraseña se repite correctamente
      if (contrasenaNueva !== contrasenaNuevaRepetida) {
        return res.status(400).json({ message: 'La nueva contraseña y su repetición no coinciden' });
      }

      // Actualizar la contraseña del usuario
      bcrypt.hash(contrasenaNueva, 10, (err, hashedNewPassword) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: 'Error al actualizar la contraseña' });
        }

        connection.query('UPDATE usuario SET contraseña = ? WHERE id = ?', [hashedNewPassword, id], (err, result) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Error al actualizar la contraseña' });
          }

          // Devolver respuesta exitosa
          res.json({ message: 'Contraseña actualizada correctamente' });
        });
      });
    });
  });
});



function isValidPassword(password) {
  // Expresión regular para validar el formato de la contraseña
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

  // Devuelve true si la contraseña coincide con el formato de la expresión regular
  return passwordRegex.test(password);
}

app.get('/user', (req, res) => {
  if (req.session.user) {
    // Devolver la información del usuario almacenada en la sesión
    res.json({ user: req.session.user });
  } else {
    //res.status(401).json({ error: 'No se ha iniciado sesión' });
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
  query = 'SELECT ruta_senderismo.*, provincia.nombre AS nombre_provincia, COUNT(ruta_completada.id_ruta) AS num_ocurrencias FROM ruta_senderismo INNER JOIN provincia ON ruta_senderismo.id_provincia = provincia.id LEFT JOIN ruta_completada ON ruta_senderismo.id = ruta_completada.id_ruta GROUP BY ruta_senderismo.id';
  connection.query(query, (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

// Obtener una ruta de senderismo por su ID
app.get('/ruta_senderismo/:id', (req, res) => {
  const id = req.params.id;
  connection.query('SELECT ruta_senderismo.*, provincia.nombre AS provincia FROM ruta_senderismo JOIN provincia ON ruta_senderismo.id_provincia = provincia.id WHERE ruta_senderismo.id = ?', [id], (error, results) => {
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
  if (!req.session.user) {
    //res.status(401).json({ error: 'No autorizado' });
  } else {
    const idUsuario = req.session.user.id;
    connection.query('SELECT ruta.id, ruta.nombre, ruta.descripcion, ruta.imagen, ruta.longitud, ruta.tipo, ruta.dificultad, ruta.permiso_necesario, ruta.como_llegar, ruta.enlace_maps, ruta.media_valoraciones FROM ruta_senderismo AS ruta JOIN ruta_pendiente AS pendiente ON ruta.id = pendiente.id_ruta WHERE pendiente.id_usuario = ?', [idUsuario], (error, results) => {
      if (error) throw error;
      res.json(results);
    });
  }
});


// Consulta si existe una ruta pendiente para el usuario con el id especificado
app.get('/ruta-pendiente/:id', (req, res) => {
  if (!req.session.user) {
    //res.status(401).json({ error: 'No autorizado' });
  } else {
    const idUsuario = req.session.user.id;
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

app.get('/ruta-completada', (req, res) => {
  if (!req.session.user) {
    //res.status(401).json({ error: 'No autorizado' });
  } else {
    const idUsuario = req.session.user.id;
    connection.query('SELECT ruta.id, ruta.nombre, ruta.descripcion, ruta.imagen, ruta.longitud, ruta.tipo, ruta.dificultad, ruta.permiso_necesario, ruta.como_llegar, ruta.enlace_maps, ruta.media_valoraciones FROM ruta_senderismo AS ruta JOIN ruta_completada AS completada ON ruta.id = completada.id_ruta WHERE completada.id_usuario = ?', [idUsuario], (error, results) => {
      if (error) throw error;
      res.json(results);
    });
  }
});

// Consulta si existe una ruta completada para el usuario con el id especificado
app.get('/ruta-completada/:id', (req, res) => {
  if (!req.session.user) {
    //res.status(401).json({ error: 'No autorizado' });
  } else {
    const idUsuario = req.session.user.id;
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

// Manejador para obtener todas las valoraciones
app.get('/comments/:id_ruta', (req, res) => {
  const { id_ruta } = req.params;
  let query = 'SELECT v.*, u.nombre FROM valoracion v JOIN usuario u ON v.id_usuario = u.id WHERE v.id_ruta = ?';
  const queryParams = [id_ruta];

  if (req.session.user) {
    const id_usuario = req.session.user.id;
    query += ' AND v.id_usuario <> ?';
    queryParams.push(id_usuario);
  }

  connection.query(query, queryParams, (err, results) => {
    if (err) {
      console.error('Error executing MySQL query: ' + err.stack);
      return res.status(500).json({ message: 'Internal server error' });
    }
    res.json(results);
  });
});

app.get('/my-comment/:id_ruta', (req, res) => {
  if (req.session.user) {
    const { id_ruta } = req.params;
    const id_usuario = req.session.user.id;
    let query = 'SELECT v.*, u.nombre FROM valoracion v JOIN usuario u ON v.id_usuario = u.id WHERE v.id_ruta = ? AND v.id_usuario = ?';
    query += ' AND v.id_usuario = ?';
    connection.query(query, [id_ruta, id_usuario, id_usuario], (err, results) => {
      if (err) {
        console.error('Error executing MySQL query: ' + err.stack);
        return res.status(500).json({ message: 'Internal server error' });
      }
      if (results.length !== 0) {
        res.json(results);
      }
      
    });
  } else {
    //res.status(401).json({ message: 'Se requiere una sesión para acceder a esta ruta.' });
  }
});

app.put('/edit-my-comment', (req, res) => {
  const { commentId, newComment, newRating, publico } = req.body;
  const query = 'UPDATE valoracion SET valoracion = ?, comentario = ?, publica = ? WHERE id = ?';
  connection.query(query, [newRating, newComment, publico, commentId], (err, results) => {
    if (err) {
      console.error('Error executing MySQL query: ' + err.stack);
      return res.status(500).json({ message: 'Internal server error' });
    }
    res.json({ message: 'Comment updated successfully' });
  });
});

app.delete('/delete-my-comment/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM valoracion WHERE id = ?';
  connection.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error executing MySQL query: ' + err.stack);
      return res.status(500).json({ message: 'Internal server error' });
    }
    res.json({ message: 'Comment deleted successfully' });
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

app.put('/actualizar-media-valoraciones', (req, res) => {
  const { id_ruta } = req.body;
  const sql = `UPDATE ruta_senderismo SET media_valoraciones = (SELECT ROUND(AVG(valoracion), 2) as media_valoraciones FROM valoracion WHERE id_ruta = ? GROUP BY id_ruta) WHERE id = ?`;

  connection.query(sql, [id_ruta, id_ruta], (err, result) => {
    if (err) throw err;
    res.send('Media de valoraciones actualizada correctamente');
  });
});

app.get('/provincias', (req, res) => {
  const query = 'SELECT * FROM provincia';
  connection.query(query, (error, results) => {
    if(error) {
      res.status(500).send('Error al obtener la tabla provincia');
    } else {
      res.status(200).send(results);
    }
  })
})



app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});