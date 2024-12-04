const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express(); // 'app' debe ser inicializado antes de usarlo
const port = 3001;

// Configurar middleware
app.use(cors());
app.use(express.json());

// Conexión a la base de datos
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'portfolioELM_users_model'
});

db.connect((err) => {
  if (err) {
    console.error('Error conectando a la base de datos:', err);
    process.exit(1); // Salir si hay un error
  }
  console.log('Conectado a la base de datos MySQL');
});

// Ruta de autenticación de usuario
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Usuario y contraseña son requeridos' });
  }

  const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
  db.query(query, [username, password], (err, results) => {
    if (err) {
      console.error('Error ejecutando la consulta:', err);
      return res.status(500).json({ message: 'Error del servidor' });
    }

    if (results.length > 0) {
      res.status(200).json({ message: 'Inicio de sesión exitoso', authorized: true });
    } else {
      res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
    }
  });
});

// Actualizar "Acerca de mí":
app.put('/update-about', (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ message: 'El texto es requerido' });
  }

  const query = 'UPDATE about_me SET text = ? WHERE id = 1';
  db.query(query, [text], (err) => {
    if (err) {
      console.error('Error ejecutando la consulta:', err);
      return res.status(500).json({ message: 'Error del servidor' });
    }

    res.status(200).json({ message: 'Acerca de mí actualizado correctamente' });
  });
});

app.get('/get-about', (req, res) => {
  const query = 'SELECT text FROM about_me WHERE id = 1';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error ejecutando la consulta:', err);
      return res.status(500).json({ message: 'Error del servidor' });
    }

    if (results.length > 0) {
      res.status(200).json({ text: results[0].text });
    } else {
      res.status(404).json({ message: 'No se encontró información. Asegúrate de que la tabla `about_me` contenga un registro con `id = 1`.' });
    }
  });
});

// Actualizar Datos de Contacto:
app.put('/update-contact', (req, res) => {
  const { email, telefono, instagram } = req.body;

  if (!email && !telefono && !instagram) {
    return res.status(400).json({ message: 'Se requiere al menos un campo para actualizar' });
  }

  const query = 'UPDATE contact SET email = ?, telefono = ?, instagram = ? WHERE id = 1';
  db.query(query, [email, telefono, instagram], (err) => {
    if (err) {
      console.error('Error ejecutando la consulta:', err);
      return res.status(500).json({ message: 'Error del servidor' });
    }

    res.status(200).json({ message: 'Información de contacto actualizada correctamente' });
  });
});

app.get('/get-contact', (req, res) => {
  const query = 'SELECT email, telefono, instagram FROM contact WHERE id = 1';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error ejecutando la consulta:', err);
      return res.status(500).json({ message: 'Error del servidor' });
    }

    if (results.length > 0) {
      res.status(200).json(results[0]);
    } else {
      res.status(404).json({ message: 'No se encontró información de contacto. Asegúrate de que la tabla `contact` contenga un registro con `id = 1`.' });
    }
  });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
