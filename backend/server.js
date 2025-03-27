const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3002;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// เชื่อมต่อฐานข้อมูล SQLite
const db = new sqlite3.Database('example.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('✅ Connected to the SQLite database.');

    // ✅ สร้างตาราง emp
    db.run(`
      CREATE TABLE IF NOT EXISTS emp (
        empid INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        lastname TEXT,
        phone TEXT,
        email TEXT,
        gardID TEXT,
        username TEXT,
        password TEXT,
        job TEXT
      )
    `, (err) => {
      if (err) console.error('Error creating table:', err.message);
      else console.log('✅ Table "emp" is ready.');
    });

    // ✅ สร้างตาราง store
    db.run(`
      CREATE TABLE IF NOT EXISTS store (
        storeid INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        count INTEGER,
        unit TEXT,
        image TEXT
      )
    `, (err) => {
      if (err) console.error('Error creating table:', err.message);
      else console.log('✅ Table "store" is ready.');
    });
  }
});

// ✅ จัดการการอัปโหลดไฟล์
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// ✅ Login
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'กรุณากรอกชื่อผู้ใช้และรหัสผ่าน' });
  }

  const query = `SELECT * FROM emp WHERE username = ? AND password = ?`;
  db.get(query, [username, password], (err, row) => {
    if (err) return res.status(500).json({ message: 'เกิดข้อผิดพลาดในเซิร์ฟเวอร์' });
    if (row) {
      res.status(200).json({ success: true, message: 'เข้าสู่ระบบสำเร็จ', user: row });
    } else {
      res.status(401).json({ success: false, message: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' });
    }
  });
});

// ✅ ดึงข้อมูลพนักงานทั้งหมด
app.get('/api/employees', (req, res) => {
  db.all('SELECT * FROM emp', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// ✅ ดึงข้อมูลพนักงานตาม ID
app.get('/api/employees/:id', (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM emp WHERE empid = ?', [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (row) res.json(row);
    else res.status(404).json({ message: 'Employee not found' });
  });
});

// ✅ เพิ่มข้อมูลพนักงานใหม่
app.post('/api/employees', (req, res) => {
  const { name, lastname, phone, email, gardID, username, password, job } = req.body;

  if (!name || !lastname || !phone || !email || !gardID || !username || !password || !job) {
    return res.status(400).json({ message: 'กรุณากรอกข้อมูลให้ครบถ้วน' });
  }

  const stmt = db.prepare(`
    INSERT INTO emp (name, lastname, phone, email, gardID, username, password, job)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);
  stmt.run([name, lastname, phone, email, gardID, username, password, job], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'เพิ่มพนักงานสำเร็จ', empid: this.lastID });
  });
  stmt.finalize();
});

// ✅ อัปเดตข้อมูลพนักงาน
app.put('/api/employees/:id', (req, res) => {
  const { id } = req.params;
  const { name, lastname, phone, email, job, username, password } = req.body;

  const sql = `
    UPDATE emp
    SET name = ?, lastname = ?, phone = ?, email = ?, job = ?, username = ?, password = ?
    WHERE empid = ?
  `;

  db.run(sql, [name, lastname, phone, email, job, username, password, id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'อัปเดตพนักงานสำเร็จ' });
  });
});

// ✅ ลบข้อมูลพนักงาน
app.delete('/api/employees/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM emp WHERE empid = ?', [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'ลบพนักงานสำเร็จ' });
  });
});

// ✅ เพิ่มข้อมูลร้านค้า
app.post('/api/stores', upload.single('image'), (req, res) => {
  const { name, count, unit } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : null;

  const query = `
    INSERT INTO store (name, count, unit, image)
    VALUES (?, ?, ?, ?)
  `;
  
  db.run(query, [name, count, unit, image], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ storeid: this.lastID });
  });
});

// ✅ ดึงข้อมูลร้านค้าทั้งหมด
app.get('/api/stores', (req, res) => {
  db.all('SELECT * FROM store', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// ✅ ลบข้อมูลร้านค้า
app.delete('/api/stores/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM store WHERE storeid = ?', [id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'ลบร้านค้าสำเร็จ' });
  });
});

// ✅ เปิดเซิร์ฟเวอร์
app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});
