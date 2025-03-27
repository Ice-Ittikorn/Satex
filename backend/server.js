const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const multer = require('multer');
const path = require('path'); 

const app = express();
const port = 3002;

// Use CORS middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Serve static files from the 'uploads' folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Use JSON and URL-encoded parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to SQLite database
const db = new sqlite3.Database('example.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('✅ Connected to the SQLite database.');

    // Create tables (if not exist)
    db.run(`
      CREATE TABLE IF NOT EXISTS menu (
        menuid INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        emgname TEXT,
        inkitchen TEXT,
        price TEXT,
        details TEXT,
        component TEXT,
        todo TEXT,
        type TEXT,
        menuimg TEXT
      )
    `, (err) => {
      if (err) console.error('Error creating table:', err.message);
      else console.log('✅ Table "menu" is ready.');
    });
  }
});

// Route to get all menu items
app.get('/api/menu', (req, res) => {
  db.all('SELECT name, price, details, menuimg FROM menu', [], (err, rows) => {
    if (err) {
      res.status(500).send('Error fetching data: ' + err.message);
    } else {
      res.json(rows);
    }
  });
});

// Route to add a new menu item
app.post('/api/menu', (req, res) => {
  const { name, emgname, inkitchen, price, details, component, todo, type, menuimg } = req.body;
  const stmt = db.prepare(`
    INSERT INTO menu (name, emgname, inkitchen, price, details, component, todo, type, menuimg)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  stmt.run(name, emgname, inkitchen, price, details, component, todo, type, menuimg, (err) => {
    if (err) {
      res.status(500).send('Error inserting data: ' + err.message);
    } else {
      res.status(200).send('Menu item added successfully');
    }
    stmt.finalize();
  });
});

// Start the server
app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});
