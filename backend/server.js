const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const multer = require('multer');
const path = require('path'); // You forgot to import `path` for handling file extensions

const app = express();
const port = 3002;

// ✅ Middleware สำหรับแปลงข้อมูลจาก JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// ✅ เชื่อมต่อฐานข้อมูล SQLite
let db = new sqlite3.Database('example.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');

    // ✅ สร้างตาราง "emp" ถ้ายังไม่มี
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
      if (err) {
        console.error('Error creating table:', err.message);
      } else {
        console.log('Table "emp" is ready.');
      }
    });
  }
});

// ✅ เช็ค Login
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


// ✅ ดึงข้อมูลพนักงานตาม empid
app.get('/api/employees/:id', (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM emp WHERE empid = ?', [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (row) {
      res.json(row);
    } else {
      res.status(404).json({ message: 'Employee not found' });
    }
  });
});

// ✅ เพิ่มพนักงานใหม่
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

  if (!name || !lastname || !phone || !email || !job || !username || !password) {
    return res.status(400).json({ message: 'กรุณากรอกข้อมูลให้ครบถ้วน' });
  }

  const sql = `
    UPDATE emp
    SET name = ?, lastname = ?, phone = ?, email = ?, job = ?, username = ?, password = ?
    WHERE empid = ?
  `;
  
  db.run(sql, [name, lastname, phone, email, job, username, password, id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.json({ message: 'อัปเดตพนักงานสำเร็จ' });
  });
});

// ✅ ลบข้อมูลพนักงาน
app.delete('/api/employees/:id', (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM emp WHERE empid = ?';
  db.run(query, [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) {
      return res.status(404).json({ message: 'ไม่พบพนักงานที่ต้องการลบ' });
    }
    res.json({ message: 'ลบพนักงานสำเร็จ' });
  });

});

// Create the Store table
db.run(`
  CREATE TABLE IF NOT EXISTS "Store" (
    storeid INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    instore TEXT,
    unit TEXT,
    imgstore TEXT
  )
`, (err) => {
  if (err) {
    console.error('Error creating table:', err.message);
  } else {
    console.log('Table "Store" is ready.');
  }
});

// ✅ ดึงข้อมูลร้านค้า
app.get('/api/stores', (req, res) => {
  db.all('SELECT * FROM Store', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// การจัดการการอัปโหลดไฟล์
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// ✅ Endpoint สำหรับการเพิ่มร้านค้า
app.post('/api/stores', upload.single('image'), (req, res) => {
  const { name, instore, unit } = req.body;
  const imgstore = req.file ? `/uploads/${req.file.filename}` : null;

  // Insert into the Store table
  const query = `
    INSERT INTO Store (name, instore, unit, imgstore)
    VALUES (?, ?, ?, ?)
  `;
  
  db.run(query, [name, instore, unit, imgstore], function(err) {
    if (err) {
      return res.status(500).json({ message: 'Failed to add store item', error: err.message });
    }
    res.status(201).json({ message: 'Store item added successfully', store_id: this.lastID });
  });
});

const fetchEmployeeData = async () => {
  try {
      const response = await axios.get(`http://localhost:3002/api/employees/${empId}`);
      console.log("Employee data:", response.data); // ➡️ ดูว่าได้ข้อมูลครบหรือเปล่า
      if (response.data) {
          setFormData(response.data);
      }
  } catch (error) {
      console.error('เกิดข้อผิดพลาดในการดึงข้อมูลพนักงาน:', error);
      alert('ไม่สามารถดึงข้อมูลพนักงานได้');
  }
};

app.get('/api/employees/:id', (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM emp WHERE empid = ?', [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    console.log('Data fetched:', row); // ➡️ เช็คว่าได้ข้อมูลครบไหม
    if (row) {
      res.json(row);
    } else {
      res.status(404).json({ message: 'Employee not found' });
    }
  });
});


// ✅ เริ่มเซิร์ฟเวอร์
app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});
