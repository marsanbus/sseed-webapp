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
app.post('/api/trainers', (req, res) => {
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
    INSERT INTO trainer (nombre, apellidos, correo, Fecha_nacimiento, Fisioterapeuta, CAFD, TSEAS, Médico, TAF, Otros)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
  ];

  db.run(query, params, function (err) {
    if (err) {
      console.error('Error al insertar el entrenador:', err); // Agrega este console.log
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