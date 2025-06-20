const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware para parsear JSON
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Ruta para guardar citas
app.post('/api/citas', (req, res) => {
  const dbPath = path.join(__dirname, 'database/db.json');
  const nuevaCita = req.body;

  // Leer base de datos (o usar SQLite)
  fs.readFile(dbPath, (err, data) => {
    if (err) throw err;
    const db = JSON.parse(data);
    db.citas.push(nuevaCita);

    // Guardar
    fs.writeFile(dbPath, JSON.stringify(db, null, 2), (err) => {
      if (err) throw err;
      res.status(201).send('Cita guardada');
    });
  });
});

// Ruta para obtener citas
app.get('/api/citas', (req, res) => {
  const dbPath = path.join(__dirname, 'database/db.json');
  fs.readFile(dbPath, (err, data) => {
    if (err) throw err;
    res.json(JSON.parse(data).citas);
  });
});

app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});