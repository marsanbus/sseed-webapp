import express from 'express';
import sqlite3 from 'sqlite3';
import cors from 'cors';

const app = express();
const port = 5000;

// Habilitar CORS y middleware para parsear JSON
app.use(cors());
app.use(express.json());

// Conectar a la base de datos SQLite
const db = new sqlite3.Database('./sseed.db', (err) => {
  if (err) {
    console.error('Error conectando a la base de datos:', err);
  } else {
    console.log('Conectado a la base de datos SQLite');
  }
});

// Ruta para obtener todos los entrenadores
app.get('/api/trainers', (req, res) => {
  const query = 'SELECT id, nombre, apellidos, correo, Fecha_nacimiento, Fisioterapeuta, CAFD, TSEAS, Médico, TAF, Otros, role FROM trainer'; // Excluye password

  db.all(query, (err, rows) => {
    if (err) {
      console.error('Error al obtener los entrenadores:', err);
      return res.status(500).json({ error: 'Error al obtener los entrenadores' });
    }
    res.json(rows);
  });
});

// Ruta para obtener todos los entrenadores
app.post('/api/trainers', (req, res) => {
  const { nombre, apellidos, correo, fechaNacimiento, titulacion, password } = req.body; // Asegúrate de extraer password

  const titulaciones = {
    Fisioterapeuta: titulacion.includes('Fisioterapeuta') ? 1 : 0,
    CAFD: titulacion.includes('CAFD') ? 1 : 0,
    TSEAS: titulacion.includes('TSEAS') ? 1 : 0,
    Médico: titulacion.includes('Médico') ? 1 : 0,
    TAF: titulacion.includes('TAF') ? 1 : 0,
    Otros: titulacion.includes('Otros') ? 1 : 0,
  };

  const query = `
    INSERT INTO trainer (nombre, apellidos, correo, Fecha_nacimiento, Fisioterapeuta, CAFD, TSEAS, Médico, TAF, Otros, password)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const params = [
    nombre,
    apellidos,
    correo,
    fechaNacimiento,
    titulaciones.Fisioterapeuta,
    titulaciones.CAFD,
    titulaciones.TSEAS,
    titulaciones.Médico,
    titulaciones.TAF,
    titulaciones.Otros,
    password, // Asegúrate de incluir password aquí
  ];

  db.run(query, params, function (err) {
    if (err) {
      console.error('Error al insertar el entrenador:', err);
      return res.status(500).json({ error: 'Error al insertar el entrenador' });
    }
    res.json({ id: this.lastID });
  });

  console.log('Datos recibidos:', req.body);
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor backend corriendo en http://localhost:${port}`);
});

// Manejadores de errores globales
process.on('uncaughtException', (err) => {
  console.error('Error no capturado:', err);
});

process.on('unhandledRejection', (err) => {
  console.error('Promesa rechazada no capturada:', err);
});

// Ruta para actualizar un entrenador
app.put('/api/trainers/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, apellidos, correo, fechaNacimiento, titulacion } = req.body;

  const titulaciones = {
    Fisioterapeuta: titulacion.includes('Fisioterapeuta') ? 1 : 0,
    CAFD: titulacion.includes('CAFD') ? 1 : 0,
    TSEAS: titulacion.includes('TSEAS') ? 1 : 0,
    Médico: titulacion.includes('Médico') ? 1 : 0,
    TAF: titulacion.includes('TAF') ? 1 : 0,
    Otros: titulacion.includes('Otros') ? 1 : 0,
  };

  const query = `
    UPDATE trainer 
    SET nombre = ?, apellidos = ?, correo = ?, Fecha_nacimiento = ?, Fisioterapeuta = ?, CAFD = ?, TSEAS = ?, Médico = ?, TAF = ?, Otros = ?
    WHERE id = ?
  `;

  const params = [
    nombre,
    apellidos,
    correo,
    fechaNacimiento,
    titulaciones.Fisioterapeuta,
    titulaciones.CAFD,
    titulaciones.TSEAS,
    titulaciones.Médico,
    titulaciones.TAF,
    titulaciones.Otros,
    id,
  ];

  db.run(query, params, function (err) {
    if (err) {
      console.error('Error al actualizar el entrenador:', err);
      return res.status(500).json({ error: 'Error al actualizar el entrenador' });
    }
    res.json({ message: 'Entrenador actualizado correctamente' });
  });
});

// Ruta para eliminar un entrenador
app.delete('/api/trainers/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM trainer WHERE id = ?';

  db.run(query, [id], function (err) {
    if (err) {
      console.error('Error al eliminar el entrenador:', err);
      return res.status(500).json({ error: 'Error al eliminar el entrenador' });
    }
    res.json({ message: 'Entrenador eliminado correctamente' });
  });
});

// Ruta para registrar un nuevo usuario
app.post('/api/users', (req, res) => {
  const {
    nombre,
    apellidos,
    birthDate,
    weight,
    height,
    email,
    disease,
    treatment,
    specificAnswers,
    assignedProfessional,
  } = req.body;

  // Convertir specificAnswers a una cadena JSON
  const specificAnswersString = JSON.stringify(specificAnswers);

  const query = `
    INSERT INTO users (nombre, apellidos, birthDate, weight, height, email, disease, treatment, specificAnswers, assignedProfessional)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const params = [
    nombre,
    apellidos,
    birthDate,
    weight,
    height,
    email,
    disease,
    treatment,
    specificAnswersString,
    assignedProfessional,
  ];

  db.run(query, params, function (err) {
    if (err) {
      console.error('Error al insertar el usuario:', err);
      return res.status(500).json({ error: 'Error al insertar el usuario' });
    }
    res.json({ id: this.lastID });
  });
});

// Ruta para obtener todos los usuarios
app.get('/api/users', (req, res) => {
  const query = 'SELECT * FROM users';

  db.all(query, (err, rows) => {
    if (err) {
      console.error('Error al obtener los usuarios:', err);
      return res.status(500).json({ error: 'Error al obtener los usuarios' });
    }
    res.json(rows);
  });
});

// Ruta para actualizar un usuario
app.put('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const {
    nombre,
    apellidos,
    birthDate,
    weight,
    height,
    email,
    disease,
    treatment,
    specificAnswers,
    assignedProfessional,
  } = req.body;

  // Convertir specificAnswers a una cadena JSON
  const specificAnswersString = JSON.stringify(specificAnswers);

  const query = `
    UPDATE users 
    SET nombre = ?, apellidos = ?, birthDate = ?, weight = ?, height = ?, email = ?, disease = ?, treatment = ?, specificAnswers = ?, assignedProfessional = ?
    WHERE id = ?
  `;

  const params = [
    nombre,
    apellidos,
    birthDate,
    weight,
    height,
    email,
    disease,
    treatment,
    specificAnswersString,
    assignedProfessional,
    id,
  ];

  db.run(query, params, function (err) {
    if (err) {
      console.error('Error al actualizar el usuario:', err);
      return res.status(500).json({ error: 'Error al actualizar el usuario' });
    }
    res.json({ message: 'Usuario actualizado correctamente' });
  });
});

// Ruta para eliminar un usuario
app.delete('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM users WHERE id = ?';

  db.run(query, [id], function (err) {
    if (err) {
      console.error('Error al eliminar el usuario:', err);
      return res.status(500).json({ error: 'Error al eliminar el usuario' });
    }
    res.json({ message: 'Usuario eliminado correctamente' });
  });
});

// Ruta para autenticar profesionales
app.post('/api/trainers/login', (req, res) => {
  const { correo, password } = req.body;

  const query = 'SELECT * FROM trainer WHERE correo = ? AND password = ?';
  const params = [correo, password];

  db.get(query, params, (err, row) => {
    if (err) {
      console.error('Error al autenticar el profesional:', err);
      return res.status(500).json({ error: 'Error al autenticar el profesional' });
    }

    if (row) {
      // Si el profesional existe, devolver sus datos (sin la contraseña)
      const { password, ...userData } = row;
      res.json({ success: true, user: userData });
    } else {
      // Si no existe, devolver un error
      res.status(401).json({ success: false, message: 'Credenciales incorrectas' });
    }
  });
});