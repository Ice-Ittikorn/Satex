const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3001; // เปลี่ยนพอร์ตเป็น 3001

// ใช้ middleware เพื่อแปลงข้อมูลจาก JSON
app.use(express.json());

// เชื่อมต่อกับฐานข้อมูล SQLite
let db = new sqlite3.Database('example.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
    
    // สร้างตาราง "emp" ถ้ายังไม่มี
    db.run(`
      CREATE TABLE IF NOT EXISTS "emp" (
        empid INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        lastname TEXT,
        Phone TEXT,
        Email TEXT,
        gardID TEXT,
        Username TEXT,
        Password TEXT,
        Job TEXT
      )
    `, (err) => {
      if (err) {
        console.error('Error creating table:', err.message);
      } else {
        console.log('Table "emp" is ready.');
      }
    });
  }
});

// Endpoint เพื่อดึงข้อมูลพนักงานทั้งหมด
app.get('/api/employees', (req, res) => {
  db.all('SELECT * FROM emp', [], (err, rows) => {
    if (err) {
      console.error('Error fetching data:', err.message);
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// Endpoint เพื่อดึงข้อมูลพนักงานตาม empid
app.get('/api/employees/:id', (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM emp WHERE empid = ?', [id], (err, row) => {
    if (err) {
      console.error('Error fetching data:', err.message);
      return res.status(500).json({ error: err.message });
    }
    if (row) {
      res.json(row);
    } else {
      res.status(404).json({ message: 'Employee not found' });
    }
  });
});

// Endpoint เพื่อเพิ่มพนักงานใหม่
app.post('/api/employees', (req, res) => {
  const { name, lastname, Phone, Email, gardID, Username, Password, Job } = req.body;

  let stmt = db.prepare(`
    INSERT INTO emp (name, lastname, Phone, Email, gardID, Username, Password, Job)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  stmt.run([name, lastname, Phone, Email, gardID, Username, Password, Job], function (err) {
    if (err) {
      console.error('Error inserting data:', err.message);
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: 'Employee added successfully', empid: this.lastID });
  });

  stmt.finalize();
});

// Endpoint เพื่ออัพเดตข้อมูลพนักงาน
app.put('/api/employees/:id', (req, res) => {
  const { id } = req.params;
  const { name, lastname, Phone, Email, gardID, Username, Password, Job } = req.body;

  const query = `
    UPDATE emp
    SET name = ?, lastname = ?, Phone = ?, Email = ?, gardID = ?, Username = ?, Password = ?, Job = ?
    WHERE empid = ?
  `;

  db.run(query, [name, lastname, Phone, Email, gardID, Username, Password, Job, id], function (err) {
    if (err) {
      console.error('Error updating data:', err.message);
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.json({ message: 'Employee updated successfully' });
  });
});

// Endpoint เพื่อลบพนักงาน
app.delete('/api/employees/:id', (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM emp WHERE empid = ?';

  db.run(query, [id], function (err) {
    if (err) {
      console.error('Error deleting data:', err.message);
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.json({ message: 'Employee deleted successfully' });
  });
});

// เริ่มเซิร์ฟเวอร์
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
