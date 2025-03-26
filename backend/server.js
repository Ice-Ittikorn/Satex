const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const port = 3002;

// ✅ Middleware สำหรับแปลงข้อมูลจาก JSON
app.use(express.json());
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
      CREATE TABLE IF NOT EXISTS "emp" (
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

// ✅ Endpoint เช็ค Login
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'กรุณากรอกชื่อผู้ใช้และรหัสผ่าน' });
  }

  const query = `SELECT * FROM emp WHERE username = ? AND password = ?`;
  db.get(query, [username, password], (err, row) => {
    if (err) {
      return res.status(500).json({ message: 'เกิดข้อผิดพลาดในเซิร์ฟเวอร์' });
    }
    if (row) {
      return res.status(200).json({ success: true, message: 'เข้าสู่ระบบสำเร็จ', user: row });
    } else {
      return res.status(401).json({ success: false, message: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' });
    }
  });
});

app.delete('/api/employees/:empId', (req, res) => {
  const { empId } = req.params;
  const query = 'DELETE FROM emp WHERE empid = ?';
  
  db.run(query, [empId], function (err) {
      if (err) {
          return res.status(500).json({ message: 'เกิดข้อผิดพลาดในการลบข้อมูล' });
      }
      if (this.changes === 0) {
          return res.status(404).json({ message: 'ไม่พบพนักงานที่ต้องการลบ' });
      }
      res.status(200).json({ message: 'ลบพนักงานสำเร็จ' });
  });
});


// ✅ ดึงข้อมูลพนักงานทั้งหมด
app.get('/api/employees', (req, res) => {
  db.all('SELECT * FROM emp', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// ✅ ดึงข้อมูลพนักงานตาม empid
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

// ✅ เพิ่มพนักงานใหม่
app.post('/api/employees', (req, res) => {
  const { name, lastname, phone, email, gardID, username, password, job } = req.body;

  if (!name || !lastname || !phone || !email || !gardID || !username || !password || !job) {
    return res.status(400).json({ message: 'กรุณากรอกข้อมูลให้ครบถ้วน' });
  }

  let stmt = db.prepare(`
    INSERT INTO emp (name, lastname, phone, email, gardID, username, password, job)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  stmt.run([name, lastname, phone, email, gardID, username, password, job], function (err) {
    if (err) {
      console.error('Error inserting data:', err.message);
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: 'Employee added successfully', empid: this.lastID });
  });

  stmt.finalize();
});

// ✅ อัปเดตข้อมูลพนักงาน (รวมถึง username และ password)
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

// ✅ ลบข้อมูลพนักงาน
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

  // API สำหรับเพิ่มพนักงานใหม่
app.post('/api/employees', (req, res) => {
  const { name, lastname, phone, email, gardID, username, password, job } = req.body;

  const stmt = db.prepare('INSERT INTO emp (name, lastname, phone, email, gardID, username, password, job) VALUES (?, ?, ?, ?, ?, ?, ?, ?)');
  stmt.run([name, lastname, phone, email, gardID, username, password, job], function (err) {
      if (err) {
          console.error('Error inserting data:', err.message);
          return res.status(500).send('ไม่สามารถเพิ่มพนักงานได้');
      }
      res.status(200).send('เพิ่มพนักงานสำเร็จ!');
  });
});



// ========== PUT: อัปเดตข้อมูล store ==========
app.put('/stores/:id', (req, res) => {
  const { name, instore, unit, imgstore } = req.body;
  const { id } = req.params;
  const sql = `UPDATE Store SET name = ?, instore = ?, unit = ?, imgstore = ? WHERE storeid = ?`;
  db.run(sql, [name, instore, unit, imgstore, id], function (err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ updated: this.changes });
  });
});

// ========== DELETE: ลบข้อมูล store ==========
app.delete('/stores/:id', (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM Store WHERE storeid = ?`;
  db.run(sql, id, function (err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ deleted: this.changes });
  });
});

// ========== GET: ดึงข้อมูล store ทั้งหมด ==========
app.get('/stores', (req, res) => {
  db.all('SELECT * FROM Store', [], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// ========== POST: เพิ่มข้อมูล store ==========
app.post('/stores', (req, res) => {
  const { name, instore, unit, imgstore } = req.body;
  const sql = `INSERT INTO Store (name, instore, unit, imgstore) VALUES (?, ?, ?, ?)`;
  db.run(sql, [name, instore, unit, imgstore], function (err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ id: this.lastID });
  });
});



    // กำหนดการจัดการการอัปโหลดไฟล์
    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
          // เก็บไฟล์ไว้ที่โฟลเดอร์ 'uploads'
          cb(null, 'uploads/');
      },
      filename: (req, file, cb) => {
          // ตั้งชื่อไฟล์ด้วย timestamp
          cb(null, Date.now() + path.extname(file.originalname));
      }
    });
  
    // 📌 Endpoint สำหรับการเพิ่มเมนู
  app.post('/api/employees', upload.single('image'), (req, res) => {
    const { name, instore, unit, description, category_id, status } = req.body;
    const imgstore = req.file ? `/uploads/${req.file.filename}` : null;
  
    // Insert into database
    const query = `
        INSERT INTO menu (name, instore,imgstore)
        VALUES (?, ?, ?, ?)
    `;
    db.run(query, [name, instore, unit,imgstore, status], function(err) {
        if (err) {
            return res.status(500).json({ message: 'Failed to add menu item', error: err.message });
        }
        res.status(201).json({ message: 'Menu item added successfully', menu_id: this.lastID });
    });
  });
  
    const upload = multer({ storage: storage });
  

});

// ✅ เริ่มเซิร์ฟเวอร์
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
