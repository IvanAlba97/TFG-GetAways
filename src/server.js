const express = require('express');
const app = express();
const port = 3333;

const mysql = require('mysql2');
const nodemailer = require('nodemailer');
const passwordValidator = require('password-validator');
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
    return res.status(550).send({ message: 'Debes proporcionar un usuario y una contraseña.' });
  }

  connection.query('SELECT * FROM usuario WHERE nombre = ? OR correo = ?', [identifier, identifier], (error, results) => {
    if (error) {
      res.status(551).send('Error al buscar usuario');
    } else if (results.length === 0) {
      res.status(552).send({ message: 'Usuario no encontrado.' });
    } else {
      const user = results[0];
      if (user.habilitada) {
        bcrypt.compare(password, user.contraseña, (error, result) => {
          if (error) {
            res.status(553).send('Error al comparar contraseñas.');
          } else if (result) {
            // Inicializar la sesión y almacenar la información del usuario en la sesión
            req.session.user = { id: user.id, nombre: user.nombre, correo: user.correo };
            req.session.cookie.maxAge = 30 * 60 * 1000; // 30 minutos
            res.json(req.session.user);
          } else {
            res.status(554).send({ message: 'Contraseña incorrecta.' });
          }
        });
      } else {
        res.status(587).send({ message: 'Cuenta inhabilitada.' });
      }
    }
  });
});

app.post('/auth/logout', (req, res) => {
  req.session.destroy(error => {
    if (error) {
      console.log('Error al cerrar sesión:', error);
      res.status(555).json({ message: 'Error al cerrar sesión' });
    } else {
      res.clearCookie('connect.sid');
      res.json({ message: 'Sesión cerrada exitosamente.' });
    }
    // Cualquier código que necesites ejecutar después de la destrucción de la sesión debe estar aquí
  });
});

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'getaways.tfg@gmail.com',
    pass: 'zycsaykkjisspfvs'
  }
});

// Comprueba que el correo no se encuentra ya registrado en la base de datos
function checkEmail(email) {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM Usuario WHERE correo = ?', [email], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

const schema = new passwordValidator();

// Configurar el esquema de validación de contraseña
schema
  .is().min(8) // Mínimo 8 caracteres
  .is().max(100) // Máximo 100 caracteres
  .has().uppercase() // Al menos una letra mayúscula
  .has().lowercase() // Al menos una letra minúscula
  .has().digits() // Al menos un número
  .has().symbols() // Al menos un carácter especial
  .is().not().oneOf(['Passw0rd', '12345678']); // No permitir contraseñas comunes

authRouter.post('/register', async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

  if (!username || !email || !password || !confirmPassword) {
    return res.status(556).send({ error: 'Debes completar todos los campos.' });
  }

  if (password !== confirmPassword) {
    res.status(557).send({ error: 'Los campos contraseña y confirmar contraseña no coinciden.' });
  } else if (!schema.validate(password)) {
    res.status(558).send({ error: 'La contraseña no cumple con los criterios de seguridad. Debe tener mínimo 8 y máximo 100 caracteres, al menos una letra mayúscula, una letra minúscula, un número, un carácter especial, y no puede ser una contraseña común como Passw0rd o 12345678.' });
  } else {
    try {
      const results = await checkEmail(email);
      if (results.length > 0) {
        res.status(559).send({ error: 'El correo ya se encuentra en uso.' });
      } else {
        bcrypt.hash(password, 10, (error, hash) => {
          if (error) {
            res.status(560).send('Error al cifrar contraseña');
          } else {
            connection.query('INSERT INTO Usuario (nombre, correo, contraseña) VALUES (?, ?, ?)', [username, email, hash], (error, results) => {
              if (error) {
                res.status(561).send('Error al registrar usuario');
              } else {
                const mailOptions = {
                  from: 'getaways.tfg@gmail.com',
                  to: email,
                  subject: '¡Bienvenido a GetAways!',
                  text: `Hola ${username},\n\n¡Bienvenido a GetAways! Gracias por registrarte en nuestra aplicación para la valoración de rutas de senderismo.\n\nEn GetAways podrás encontrar toda la información que necesitas sobre las mejores rutas de senderismo de la zona, así como compartir tus experiencias y opiniones con otros usuarios. Además, podrás marcar tus rutas favoritas y recibir notificaciones sobre nuevas rutas y eventos relacionados con el senderismo.\n\nSi necesitas ayuda o tienes alguna pregunta, no dudes en contactar con nuestro equipo de soporte.\n\n¡Que disfrutes de tus aventuras en la naturaleza con GetAways!\n\nSaludos cordiales,\nEl equipo de GetAways.`
                };
                transporter.sendMail(mailOptions, function (error, info) {
                  if (error) {
                    console.log(error);
                  } else {
                    console.log('Email enviado: ' + info.response);
                  }
                });
                res.send('Registro exitoso');
              }
            });
          }
        });
      }
    } catch (error) {
      res.status(562).send('Error al verificar correo');
    }
  }
});


app.use('/auth', authRouter);

app.get('/', (req, res) => {
  res.send('Página principal');
});

// Ruta para actualizar el nombre del usuario
app.post('/update-username', (req, res) => {
  const { username, password } = req.body;
  const userId = req.session.user?.id;
  // Comprobar si el nombre está vacío
  if (!username || !password) {
    return res.status(563).json({ message: 'Los campos son obligatorios.' });
  }
  connection.query('SELECT * FROM usuario WHERE id = ?', [userId], (error, results) => {
    if (error) {
      res.status(551).send('Error al buscar usuario.');
    } else if (results.length === 0) {
      res.status(552).send({ message: 'Usuario no encontrado' });
    } else {
      const user = results[0];
      bcrypt.compare(password, user.contraseña, (error, result) => {
        if (error) {
          res.status(553).send('Error al comparar contraseñas.');
        } else if (result) {
          connection.query('UPDATE usuario SET nombre = ? WHERE id = ?', [username, userId], (err, result) => {
            if (err) {
              console.error(err);
              return res.status(564).json({ message: 'Error al actualizar el nombre.' });
            }
            // Actualizar el valor de la sesión con el nuevo nombre
            req.session.user.nombre = username;
            res.json({ user: req.session.user, message: 'Usuario actualizado correctamente.' });
          });
        } else {
          res.status(554).send({ message: 'Contraseña incorrecta.' });
        }
      });
    }
  });
});

// Ruta para actualizar el correo del usuario
app.post('/update-email', (req, res) => {
  const { newEmail, oldEmail, password } = req.body;
  const { id: userId, correo: currentEmail } = req.session.user;
  // Comprobar que los campos no estén vacíos
  if (!newEmail || !oldEmail || !password) {
    return res.status(565).json({ message: 'Los campos son obligatorios.' });
  }

  connection.query('SELECT * FROM usuario WHERE id = ?', [userId], (error, results) => {
    if (error) {
      res.status(551).send('Error al buscar usuario.');
    } else if (results.length === 0) {
      res.status(552).send({ message: 'Usuario no encontrado' });
    } else {
      const user = results[0];
      bcrypt.compare(password, user.contraseña, (error, result) => {
        if (error) {
          res.status(553).send('Error al comparar contraseñas.');
        } else if (result) {
          // Comprobar si el correo es válido
          if (!isValidEmail(newEmail)) {
            return res.status(566).json({ message: 'El correo nuevo debe ser válido' });
          }
          // Comprobar si el correo antiguo es igual al correo actual
          if (oldEmail !== currentEmail) {
            return res.status(567).json({ message: 'El correo antiguo no coincide con el correo actual del usuario' });
          }
          connection.query('UPDATE usuario SET correo = ? WHERE id = ?', [newEmail, userId], (err, result) => {
            if (err) {
              console.error(err);
              return res.status(568).json({ message: 'Error al actualizar el correo' });
            }
            // Actualizar el valor de la sesión con el nuevo correo
            req.session.user.correo = newEmail;
            res.json({ user: req.session.user, message: 'Correo actualizado correctamente' });
          });
        } else {
          res.status(554).send({ message: 'Contraseña incorrecta.' });
        }
      });
    }
  });
});

function isValidEmail(email) {
  // Expresión regular para validar el formato del correo electrónico
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Devuelve true si el correo electrónico coincide con el formato de la expresión regular
  return emailRegex.test(email);
}

// Ruta para actualizar la contraseña del usuario
app.post('/update-password', (req, res) => {
  const { oldPassword, newPassword, newRepeatedPassword } = req.body;
  const { id } = req.session.user;

  // Comprobar si la contraseña y la contraseñaNueva no están vacías
  if (!oldPassword || !newPassword || !newRepeatedPassword) {
    return res.status(569).json({ message: 'Todos los campos referentes a la contraseña son obligatorios.' });
  }

  // Obtener la contraseña encriptada de la base de datos
  connection.query('SELECT contraseña FROM usuario WHERE id = ?', [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(570).json({ message: 'Error al obtener la contraseña.' });
    }

    if (result.length === 0) {
      return res.status(571).json({ message: 'El usuario no existe' });
    }

    const hashedPassword = result[0].contraseña;

    // Comparar la contraseña antigua con la existente en la base de datos
    bcrypt.compare(oldPassword, hashedPassword, (err, isMatch) => {
      if (err) {
        /* console.error(err); */
        return res.status(572).json({ message: 'Error al actualizar la contraseña' });
      }

      if (!isMatch) {
        return res.status(573).json({ message: 'La contraseña antigua no coincide con la contraseña actual del usuario' });
      }

      // Comprobar si la nueva contraseña se repite correctamente
      if (newPassword !== newRepeatedPassword) {
        return res.status(567).json({ message: 'La nueva contraseña y su confirmación no coinciden' });
      }

      // Comprobar que la contraseña cumple los requisitos mínimos para que sea segura
      if (!schema.validate(newPassword)) {
        return res.status(558).send({ message: 'La contraseña no cumple con los criterios de seguridad. Debe tener mínimo 8 y máximo 100 caracteres, al menos una letra mayúscula, una letra minúscula, un número, un carácter especial, y no puede ser una contraseña común como Passw0rd o 12345678.' });
      }

      // Actualizar la contraseña del usuario
      bcrypt.hash(newPassword, 10, (err, hashedNewPassword) => {
        if (err) {
          /* console.error(err); */
          return res.status(574).json({ message: 'Error al encriptar la contraseña' });
        }

        connection.query('UPDATE usuario SET contraseña = ? WHERE id = ?', [hashedNewPassword, id], (err, result) => {
          if (err) {
            console.error(err);
            return res.status(572).json({ message: 'Error al actualizar la contraseña' });
          }

          // Devolver respuesta exitosa
          res.json({ message: 'Contraseña actualizada correctamente' });
        });
      });
    });
  });
});

app.get('/user', (req, res) => {
  if (req.session?.user) {
    // Devolver la información del usuario almacenada en la sesión
    res.json({ user: req.session.user });
  } else {
    //res.status(401).json({ error: 'No se ha iniciado sesión' });
  }
});

app.get('/user/:id', (req, res) => {
  const userId = req.params.id;
  const sql = `SELECT * FROM Usuario WHERE id = ${userId}`;

  connection.query(sql, (error, results) => {
    if (error) {
      console.error('Error al obtener los datos del usuario:', error);
      res.status(575).json({ error: 'Error al obtener los datos del usuario' });
    } else {
      if (results.length > 0) {
        const user = results[0];
        res.json(user);
      } else {
        res.status(571).json({ error: 'Usuario no encontrado' });
      }
    }
  });
});

app.get('/session', (req, res) => {
  res.json({ session: req.session });
});

// Obtener todas las rutas de senderismo
app.get('/hiking-route', (req, res) => {
  query = 'SELECT ruta_senderismo.*, provincia.nombre AS nombre_provincia, COUNT(ruta_completada.id_ruta) AS num_ocurrencias FROM ruta_senderismo INNER JOIN provincia ON ruta_senderismo.id_provincia = provincia.id LEFT JOIN ruta_completada ON ruta_senderismo.id = ruta_completada.id_ruta GROUP BY ruta_senderismo.id';
  connection.query(query, (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

// Obtener una ruta de senderismo por su ID
app.get('/hiking-route/:id', (req, res) => {
  const id = req.params.id;
  connection.query('SELECT ruta_senderismo.*, provincia.nombre AS provincia, coordenada.latitud, coordenada.longitud FROM ruta_senderismo JOIN provincia ON ruta_senderismo.id_provincia = provincia.id JOIN coordenada ON coordenada.id_ruta=ruta_senderismo.id WHERE ruta_senderismo.id = ?', [id], (error, results) => {
    if (error) throw error;
    res.send(results[0]);
  });
});

// Crear una nueva ruta de senderismo
app.post('/hiking-route', (req, res) => {
  const ruta = req.body;
  connection.query('INSERT INTO ruta_senderismo SET ?', ruta, (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

// Actualizar una ruta de senderismo
app.put('/hiking-route/:id', (req, res) => {
  const id = req.params.id;
  const ruta = req.body;
  connection.query('UPDATE ruta_senderismo SET ? WHERE id = ?', [ruta, id], (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

// Eliminar una ruta de senderismo
app.delete('/hiking-route/:id', (req, res) => {
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

app.get('/search/:search', (req, res) => {
  const { search } = req.params;
  const query = `SELECT * FROM ruta_senderismo WHERE nombre LIKE '%${search}%'`;

  connection.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.get('/baggage', (req, res) => {
  const userId = req.session.user?.id;
  if (!userId) {
    res.sendStatus(576);
    return;
  }

  connection.query('SELECT * FROM lista_revisar WHERE id_usuario = ?', [userId], (err, result) => {
    if (err) {
      console.error(err);
      res.sendStatus(577);
      return;
    }

    const items = result.map(row => ({
      id: row.id,
      item: row.elemento,
      checked: row.marcado === 1
    }));

    res.json(items);
  });
});

app.post('/baggage', (req, res) => {
  const userId = req.session.user?.id;

  if (!userId) {
    return res.status(576).json({ error: 'No se ha iniciado sesión' });
  }

  const item = req.body.item;
  if (!item) {
    return res.status(578).json({ error: 'El elemento es requerido' });
  }

  connection.query(
    'INSERT INTO lista_revisar (id_usuario, elemento, marcado) VALUES (?, ?, ?)',
    [userId, item, false],
    (error, result) => {
      if (error) {
        console.error('Error al insertar elemento en la base de datos', error);
        return res.status(579).json({ error: 'Error al insertar elemento en la base de datos' });
      }

      const newId = result.insertId;
      const newItem = { id: newId, elemento: item, marcado: false };
      res.json(newItem);
    }
  );
});

// Endpoint para actualizar el estado de un elemento
app.put('/baggage/:id', (req, res) => {
  const { id } = req.params;
  const { checked } = req.body;

  const query = 'UPDATE lista_revisar SET marcado = ? WHERE id = ?';

  connection.query(query, [checked, id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(580).send('Error al actualizar el estado del elemento');
    } else {
      res.send('Estado del elemento actualizado correctamente');
    }
  });
});

// Definir la ruta para manejar la solicitud DELETE
app.delete('/baggage/:itemId', (req, res) => {
  const itemId = req.params.itemId;

  const query = 'DELETE FROM lista_revisar WHERE id = ?';

  connection.query(query, [itemId], (err, result) => {
    if (err) {
      console.error(err);
      res.status(581).send('Error al eliminar el elemento');
    } else {
      res.send('Elemento eliminado correctamente');
    }
  });
});

app.get('/pending-route', (req, res) => {
  if (!req.session.user) {
    //res.status(576).json({ error: 'No autorizado' });
  } else {
    const userId = req.session.user.id;
    connection.query('SELECT ruta.id, ruta.nombre, ruta.descripcion, ruta.imagen, ruta.longitud, ruta.tipo, ruta.dificultad, ruta.permiso_necesario, ruta.como_llegar, ruta.enlace_maps, ruta.media_valoraciones FROM ruta_senderismo AS ruta JOIN ruta_pendiente AS pendiente ON ruta.id = pendiente.id_ruta WHERE pendiente.id_usuario = ?', [userId], (error, results) => {
      if (error) throw error;
      res.json(results);
    });
  }
});


// Consulta si existe una ruta pendiente para el usuario con el id especificado
app.get('/pending-route/:id', (req, res) => {
  if (!req.session.user) {
    //res.status(576).json({ error: 'No autorizado' });
  } else {
    const userId = req.session.user.id;
    connection.query('SELECT EXISTS(SELECT * FROM ruta_pendiente WHERE id_usuario = ? AND id_ruta = ?) AS exists_', [userId, req.params.id], (error, results) => {
      if (error) throw error;
      res.json(results[0]);
    });
  }
});

// Actualiza el estado de la ruta pendiente
app.post('/update-pendings', (req, res) => {
  const { id } = req.body;
  const routeId = id;
  /* const checked_ruta = checked; */
  const userId = req.session.user.id;
  let query;
  let values;

  // Consulta si existe una ruta pendiente para el usuario con el id especificado
  connection.query('SELECT EXISTS(SELECT * FROM ruta_pendiente WHERE id_usuario = ? AND id_ruta = ?) AS exists_', [userId, routeId], (error, results) => {
    if (error) throw error;

    // Si existe la ruta pendiente, actualiza su estado
    if (results[0].exists_) {
      query = 'DELETE FROM ruta_pendiente WHERE id_usuario = ? AND id_ruta = ?';
      values = [userId, routeId];
    } else {
      // Si no existe la ruta pendiente, la crea con el estado especificado
      query = 'INSERT INTO ruta_pendiente (id_usuario, id_ruta) VALUES (?, ?)';
      values = [userId, routeId];
    }

    // Ejecuta la consulta
    connection.query(query, values, (error, results) => {
      if (error) throw error;
      res.json({ success: true });
    });
  });
});

app.get('/completed-route', (req, res) => {
  if (!req.session.user) {
    //res.status(576).json({ error: 'No autorizado' });
  } else {
    const userId = req.session.user.id;
    connection.query('SELECT ruta.id, ruta.nombre, ruta.descripcion, ruta.imagen, ruta.longitud, ruta.tipo, ruta.dificultad, ruta.permiso_necesario, ruta.como_llegar, ruta.enlace_maps, ruta.media_valoraciones FROM ruta_senderismo AS ruta JOIN ruta_completada AS completada ON ruta.id = completada.id_ruta WHERE completada.id_usuario = ?', [userId], (error, results) => {
      if (error) throw error;
      res.json(results);
    });
  }
});

// Consulta si existe una ruta completada para el usuario con el id especificado
app.get('/completed-route/:id', (req, res) => {
  if (!req.session.user) {
    //res.status(576).json({ error: 'No autorizado' });
  } else {
    const userId = req.session.user.id;
    connection.query('SELECT EXISTS(SELECT * FROM ruta_completada WHERE id_usuario = ? AND id_ruta = ?) AS exists_', [userId, req.params.id], (error, results) => {
      if (error) throw error;
      res.json(results[0]);
    });
  }
});

// Actualiza el estado de la ruta completada
app.post('/update-completed', (req, res) => {
  const { id } = req.body;
  const routeId = id;
  const userId = req.session.user.id;
  let query;
  let values;

  // Consulta si existe una ruta completada para el usuario con el id especificado
  connection.query('SELECT EXISTS(SELECT * FROM ruta_completada WHERE id_usuario = ? AND id_ruta = ?) AS exists_', [userId, routeId], (error, results) => {
    if (error) throw error;

    // Si existe la ruta completada, actualiza su estado
    if (results[0].exists_) {
      query = 'DELETE FROM ruta_completada WHERE id_usuario = ? AND id_ruta = ?';
      values = [userId, routeId];
    } else {
      // Si no existe la ruta completada, la crea con el estado especificado
      query = 'INSERT INTO ruta_completada (id_usuario, id_ruta) VALUES (?, ?)';
      values = [userId, routeId];
    }

    // Ejecuta la consulta
    connection.query(query, values, (error, results) => {
      if (error) throw error;
      res.json({ success: true });
    });
  });
});

// Manejador para obtener todas las valoraciones
app.get('/comments/:routeId', (req, res) => {
  const { routeId } = req.params;
  let query = 'SELECT v.*, u.nombre FROM valoracion v JOIN usuario u ON v.id_usuario = u.id WHERE v.id_ruta = ? AND v.publica = 1';
  const queryParams = [routeId];

  if (req.session.user) {
    const userId = req.session.user.id;
    query += ' AND v.id_usuario <> ?';
    queryParams.push(userId);
  }

  connection.query(query, queryParams, (err, results) => {
    if (err) {
      console.error('Error executing MySQL query: ' + err.stack);
      return res.status(582).json({ message: 'Error al obtener los comentarios.' });
    }
    res.json(results);
  });
});

app.get('/my-comment/:routeId', (req, res) => {
  if (req.session.user) {
    const { routeId } = req.params;
    const userId = req.session.user.id;
    let query = 'SELECT v.*, u.nombre FROM valoracion v JOIN usuario u ON v.id_usuario = u.id WHERE v.id_ruta = ? AND v.id_usuario = ?';
    connection.query(query, [routeId, userId], (err, results) => {
      if (err) {
        console.error('Error executing MySQL query: ' + err.stack);
        return res.status(582).json({ message: 'Error al obtener el comentario del usuario autenticado.' });
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
  const { commentId, newComment, newRating, public_ } = req.body;
  const query = 'UPDATE valoracion SET valoracion = ?, comentario = ?, publica = ? WHERE id = ?';
  connection.query(query, [newRating, newComment, public_, commentId], (err, results) => {
    if (err) {
      console.error('Error executing MySQL query: ' + err.stack);
      return res.status(583).json({ message: 'Internal server error' });
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
      return res.status(584).json({ message: 'Internal server error' });
    }
    res.json({ message: 'Comment deleted successfully' });
  });
});


// Ruta para agregar nuevos comentarios
app.post('/new-comment', (req, res) => {
  const userId = req.session.user.id;
  // Obtiene los datos del comentario desde el cuerpo de la solicitud
  const { routeId, rating, comment, public_ } = req.body;

  // Crea una nueva entrada en la tabla valoracion con los datos del comentario
  const query = `INSERT INTO valoracion (id_usuario, id_ruta, valoracion, comentario, publica) VALUES (${userId}, ${routeId}, ${rating}, '${comment}', ${public_})`;

  connection.query(query, (error, results, fields) => {
    if (error) {
      console.error(error);
      res.status(585).send('Error al añadir el comentario');
    } else {
      res/* .status(200) */.send('Comentario añadido correctamente');
    }
  });
});

app.put('/update-average-rating', (req, res) => {
  const { routeId } = req.body;
  const sql = `UPDATE ruta_senderismo SET media_valoraciones = (SELECT ROUND(AVG(valoracion), 2) as media_valoraciones FROM valoracion WHERE id_ruta = ? GROUP BY id_ruta) WHERE id = ?`;

  connection.query(sql, [routeId, routeId], (err, result) => {
    if (err) throw err;
    res.send('Media de valoraciones actualizada correctamente');
  });
});

app.get('/provinces', (req, res) => {
  const query = 'SELECT * FROM provincia';
  connection.query(query, (error, results) => {
    if (error) {
      res.status(586).send('Error al obtener la tabla provincia');
    } else {
      res.send(results);
    }
  })
})

app.delete("/delete-account", (req, res) => {
  // Recuperar el id_usuario de la sesión
  const userId = req.session.user?.id;
  // Eliminar registros de la tabla lista_revisar
  connection.query(
    "DELETE FROM lista_revisar WHERE id_usuario = ?",
    [userId],
    (error, results) => {
      if (error) throw error;
      // Eliminar registros de la tabla valoracion
      connection.query(
        "DELETE FROM valoracion WHERE id_usuario = ?",
        [userId],
        (error, results) => {
          if (error) throw error;
          // Eliminar registros de la tabla ruta_pendiente
          connection.query(
            "DELETE FROM ruta_pendiente WHERE id_usuario = ?",
            [userId],
            (error, results) => {
              if (error) throw error;
              // Eliminar registros de la tabla ruta_completada
              connection.query(
                "DELETE FROM ruta_completada WHERE id_usuario = ?",
                [userId],
                (error, results) => {
                  if (error) throw error;
                  // Eliminar registro de la tabla Usuario
                  connection.query(
                    "DELETE FROM Usuario WHERE id = ?",
                    [userId],
                    (error, results) => {
                      if (error) throw error;
                      // Enviar una respuesta exitosa al cliente
                      res.sendStatus(200);
                    }
                  );
                }
              );
            }
          );
        }
      );
    }
  );
  req.session.destroy();
});

app.get("/is-admin", (req, res) => {
  if (req.session.user) {
    const userId = req.session.user?.id;
    const query = `SELECT * FROM usuario WHERE id = ? AND es_admin = 1`;
    connection.query(query, [userId], (err, result) => {
      if (err) {
        throw err;
      }
      if (result.length > 0) {
        res.json({ isAdmin: true });
      } else {
        res.json({ isAdmin: false });
      }
    });
  }
})







// Ruta para obtener la lista de usuarios
app.get("/users", (req, res) => {
  connection.query("SELECT * FROM usuario ORDER BY nombre ASC", (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

/* // Ruta para crear un nuevo usuario
app.post("/users", (req, res) => {
  const { name, email } = req.body;
  connection.query(
    "INSERT INTO usuario (nombre, correo) VALUES (?, ?)",
    [name, email],
    (err, result) => {
      if (err) throw err;
      res.send(result);
    }
  );
}); */

// Ruta para actualizar un usuario existente
app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const { userId, checked } = req.body;
  connection.query(
    "UPDATE usuario SET habilitada = ? WHERE id = ?",
    [checked, userId],
    (err, result) => {
      if (err) throw err;
      res.send(result);
    }
  );
});

// Ruta para borrar un usuario
app.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  connection.query(
    "DELETE FROM lista_revisar WHERE id_usuario = ?",
    [id],
    (error, results) => {
      if (error) throw error;
      // Eliminar registros de la tabla valoracion
      connection.query(
        "DELETE FROM valoracion WHERE id_usuario = ?",
        [id],
        (error, results) => {
          if (error) throw error;
          // Eliminar registros de la tabla ruta_pendiente
          connection.query(
            "DELETE FROM ruta_pendiente WHERE id_usuario = ?",
            [id],
            (error, results) => {
              if (error) throw error;
              // Eliminar registros de la tabla ruta_completada
              connection.query(
                "DELETE FROM ruta_completada WHERE id_usuario = ?",
                [id],
                (error, results) => {
                  if (error) throw error;
                  // Eliminar registro de la tabla Usuario
                  connection.query(
                    "DELETE FROM Usuario WHERE id = ?",
                    [id],
                    (error, results) => {
                      if (error) throw error;
                      // Enviar una respuesta exitosa al cliente
                      res.sendStatus(200);
                    }
                  );
                }
              );
            }
          );
        }
      );
    }
  );
});








// Ruta para obtener la lista de rutas de senderismo
app.get("/routes", (req, res) => {
  connection.query("SELECT * FROM ruta_senderismo ORDER BY nombre ASC", (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// Ruta para crear una nueva ruta de senderismo
app.post("/routes", (req, res) => {
  const newRoute = req.body;
  connection.query(
    "INSERT INTO ruta_senderismo (id_provincia, nombre, descripcion, imagen, longitud, tipo, dificultad, permiso_necesario, como_llegar, enlace_maps) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [newRoute.id_provincia, newRoute.nombre, newRoute.descripcion, newRoute.imagen, newRoute.longitud, newRoute.tipo, newRoute.dificultad, newRoute.permiso_necesario, newRoute.como_llegar, newRoute.enlace_maps],
    (err, result) => {
      if (err) throw err;
      res.send(result);
    }
  );
});

// Ruta para actualizar una ruta de senderismo existente
app.put("/routes/:id", (req, res) => {
  const { id } = req.params;
  const { newRoute } = req.body;
  connection.query(
    "UPDATE ruta_senderismo SET id_provincia = ?, nombre = ?, descripcion = ?, imagen = ?, longitud = ?, tipo = ?, dificultad = ?, permiso_necesario = ?, como_llegar = ?, enlace_maps = ? WHERE id = ?",
    [newRoute.id_provincia, newRoute.nombre, newRoute.descripcion, newRoute.imagen, newRoute.longitud, newRoute.tipo, newRoute.dificultad, newRoute.permiso_necesario, newRoute.como_llegar, newRoute.enlace_maps, id],
    (err, result) => {
      if (err) throw err;
      res.send(result);
    }
  );
});

// Ruta para borrar una ruta de senderismo
app.delete("/routes/:id", (req, res) => {
  const { id } = req.params;
  connection.query("DELETE FROM ruta_pendiente WHERE id_ruta = ?", [id], (err, result) => {
    if (err) throw err;
    connection.query("DELETE FROM ruta_completada WHERE id_ruta = ?", [id], (err, result) => {
      if (err) throw err;
      connection.query("DELETE FROM valoracion WHERE id_ruta = ?", [id], (err, result) => {
        if (err) throw err;
        connection.query("DELETE FROM ruta_senderismo WHERE id = ?", [id], (err, result) => {
          if (err) throw err;
          res.send(result);
        });
      });
    });
  });
});




// Ruta para obtener una lista de todas las publicaciones del usuario autenticado
app.get('/my-publications', (req, res) => {
  const userId = req.session.user?.id;
  connection.query('SELECT * FROM publicacion WHERE id_usuario = ? ORDER BY id DESC', [userId], (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

// Ruta para obtener una lista de todas las publicaciones
app.get('/publications', (req, res) => {
  connection.query('SELECT publicacion.*, usuario.nombre AS nombre_usuario FROM publicacion INNER JOIN usuario ON publicacion.id_usuario = usuario.id ORDER BY publicacion.id DESC', (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

app.post('/new-publication', (req, res) => {
  const userId = req.session.user?.id;
  const newPublication = req.body;
  if (!newPublication.titulo || !newPublication.descripcion) {
    return res.status(563).json({ message: 'Los campos son obligatorios.' });
  }
  connection.query('INSERT INTO publicacion (id_usuario, titulo, descripcion) VALUES (?, ?, ?)', [userId, newPublication.titulo, newPublication.descripcion], (error, results) => {
    if (error) throw error;
    return res.json({ message: 'Publicación añadida correctamente.' });
  });
});

app.delete('/delete-publication/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM publicacion WHERE id = ?';
  connection.query(query, [id], (err, results) => {
    if (err) {
      return res.status(584).json({ message: 'Error al eliminar publicación.' });
    }
    res.json({ message: 'Publicación eliminada correctamente.' });
  });
})

app.put("/edit-publication/:id", (req, res) => {
  const { id } = req.params;
  const { editedPublication } = req.body;
  connection.query(
    "UPDATE publicacion SET titulo = ?, descripcion = ? WHERE id = ?",
    [editedPublication.titulo, editedPublication.descripcion, id],
    (err, result) => {
      if (err) {
        return res.status(585).json({ message: 'Error al editar la publicación.' });
      }
      res.json({ message: 'Publicación actualizada correctamente.' });
    }
  );
});






app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});