CREATE TABLE Usuario (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  correo VARCHAR(255) NOT NULL,
  contraseña VARCHAR(255) NOT NULL
);

CREATE TABLE Ruta_senderismo (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  descripcion TEXT NOT NULL,
  imagen VARCHAR(255) NOT NULL,
  permiso_necesario BOOLEAN NOT NULL,
  como_llegar TEXT NOT NULL,
  enlace_maps VARCHAR(255),
  media_valoraciones FLOAT
);

CREATE TABLE Lista_pendientes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  id_usuario INT NOT NULL,
  id_ruta INT NOT NULL,
  FOREIGN KEY (id_usuario) REFERENCES Usuarios (id),
  FOREIGN KEY (id_ruta) REFERENCES Rutas_senderismo (id)
);

CREATE TABLE Lista_realizadas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  id_usuario INT NOT NULL,
  id_ruta INT NOT NULL,
  FOREIGN KEY (id_usuario) REFERENCES Usuarios (id),
  FOREIGN KEY (id_ruta) REFERENCES Rutas_senderismo (id)
);

CREATE TABLE Valoracion (
  id INT AUTO_INCREMENT PRIMARY KEY,
  id_usuario INT NOT NULL,
  id_ruta INT NOT NULL,
  valoracion INT NOT NULL,
  comentario TEXT,
  publica BOOLEAN NOT NULL,
  FOREIGN KEY (id_usuario) REFERENCES Usuarios (id),
  FOREIGN KEY (id_ruta) REFERENCES Rutas_senderismo (id)
);

CREATE TABLE Lista_revisar (
  id INT AUTO_INCREMENT PRIMARY KEY,
  id_usuario INT NOT NULL,
  elemento VARCHAR(255) NOT NULL,
  FOREIGN KEY (id_usuario) REFERENCES Usuarios (id)
);
