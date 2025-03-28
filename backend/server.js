const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const multer = require('multer');
const path = require('path'); // Only declare it once


const app = express();
const port = 3002;

// Serve static files from the 'uploads' folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

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

    // ✅ สร้างตาราง menu

    db.run(`
      CREATE TABLE IF NOT EXISTS "menu" (
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

        // ✅ สร้างตาราง oder

    db.run(`
          CREATE TABLE IF NOT EXISTS "oder" (
            oderid INTEGER PRIMARY KEY AUTOINCREMENT,
            manu TEXT,
            note TEXT,
            tableid TEXT,
            status TEXT
          );
        `, (err) => {
          if (err) {
            console.error('Error creating table:', err.message);
          } else {
            console.log('Table "oder" is ready.');
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
// ✅ อัปเดตข้อมูลร้านค้า
app.put('/api/stores/:id', (req, res) => {
  const { id } = req.params;
  const { name, count, unit } = req.body; // แค่รับข้อมูลที่ต้องการแก้ไข

  const query = `
    UPDATE store
    SET name = ?, count = ?, unit = ?
    WHERE storeid = ?
  `;

  db.run(query, [name, count, unit, id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'อัปเดตข้อมูลสินค้าสำเร็จ' });
  });
});

app.get('/api/stores/:id', (req, res) => {
  const storeid = req.params.id;
  const query = `SELECT * FROM store WHERE storeid = ?`;

  db.get(query, [storeid], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ message: 'Store not found' });
    }
    res.json(row);
  });
});

app.put('/api/stores/:id', (req, res) => {
  const storeid = req.params.id;
  const { name, quantity } = req.body; // หรือค่าส่งมาอื่นๆ
  
  const query = `UPDATE store SET name = ?, quantity = ? WHERE storeid = ?`;

  db.run(query, [name, quantity, storeid], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ message: 'Store not found' });
    }
    res.json({ message: 'Product updated successfully' });
  });
});

// Get all menu items
app.get('/api/menu', (req, res) => {
  db.all('SELECT * FROM "menu"', [], (err, rows) => {
    if (err) {
      res.status(500).send('Error fetching data: ' + err.message);
    } else {
      res.json(rows);
    }
  });
});

// Add a menu item
app.post('/api/menu', (req, res) => {
  const { name, inkitchen, price, details, component, todo, type, menuimg } = req.body;
  const stmt = db.prepare(`
    INSERT INTO "menu" (name, engname, inkitchen, price, details, component, todo, type, menuimg)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?,?)
  `);

  stmt.run(name,eventNames, inkitchen, price, details, component, todo, type, menuimg, (err) => {
    if (err) {
      res.status(500).send('Error inserting data: ' + err.message);
    } else {
      res.status(200).send('Menu item added successfully');
    }
    stmt.finalize();
  });
});

app.get('/api/orders', (req, res) => {
  db.all('SELECT * FROM oder', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows); // ส่งข้อมูลทั้งหมดจากตาราง "oder"
  });
});

// API สำหรับการเพิ่มข้อมูลออร์เดอร์
app.post('/api/orders', express.json(), (req, res) => {
  const { manu, note, tableid, status, price } = req.body;  // เพิ่ม price ในการรับข้อมูลจาก request
  const stmt = db.prepare('INSERT INTO "oder" (manu, note, tableid, status, price) VALUES (?, ?, ?, ?, ?)');  // เพิ่ม price ใน query

  stmt.run(manu, note, tableid, status, price, (err) => {  // เพิ่ม price ในการใส่ค่าลงในฐานข้อมูล
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(201).json({ message: 'Order added successfully.' });
  });
  stmt.finalize();
});
// กำหนด API สำหรับลบข้อมูลทั้งหมดของโต๊ะ
// กำหนด API สำหรับลบข้อมูลทั้งหมดของโต๊ะ
app.delete('/api/orders/table/:tableId', (req, res) => {
  const tableId = req.params.tableId;
  const query = `DELETE FROM oder WHERE tableid = ?`;
  
  db.run(query, [tableId], function(err) {
    if (err) {
      console.error('Error deleting orders for table:', err.message);
      return res.status(500).send('Error deleting orders for table');
    }
    res.status(200).send('All orders for table deleted successfully');
  });
});


app.get('/api/orders/:id', (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM oder WHERE oderid = ?', [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (row) {
      res.json(row); // ส่งข้อมูลออร์เดอร์ที่มี oderid ตามที่ระบุ
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  });
});

// ✅ อัปเดตข้อมูลออร์เดอร์รวมถึงราคา
app.put('/api/orders/:id', (req, res) => {
  const { id } = req.params;
  const { manu, note, status, price } = req.body;

  const query = `
    UPDATE oder
    SET manu = ?, note = ?, status = ?, price = ?
    WHERE oderid = ?
  `;

  db.run(query, [manu, note, status, price, id], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json({ message: 'Order updated successfully' });
  });
});


app.get('/api/orders/table/:tableId', (req, res) => {
  const tableId = req.params.tableId;
  const query = `SELECT * FROM oder WHERE tableid = ?`; // ใช้ตาราง 'oder'

  db.all(query, [tableId], (err, rows) => {
    if (err) {
      console.error('Error fetching orders:', err.message);
      return res.status(500).send('Error fetching orders');
    }
    res.json({
      orders: rows.map(order => ({
        name: order.manu, // แสดง manu แทน name
        price: order.price, // ใช้ราคาในฐานข้อมูล
      })),
    });
  });
});

// API ลบคำสั่งซื้อทั้งหมดของโต๊ะนั้น
app.delete('/api/orders/table/:tableId', (req, res) => {
  const tableId = req.params.tableId;
  const query = `DELETE FROM oder WHERE tableid = ?`; // ลบคำสั่งซื้อที่ตรงกับ tableId

  db.run(query, [tableId], function(err) {
    if (err) {
      console.error('Error deleting orders for table:', err.message);
      return res.status(500).send('Error deleting orders for table');
    }
    res.status(200).send('All orders for table deleted successfully');

  });
});

app.get('/api/menu/:menuid', (req, res) => {
  const menuid = req.params.menuid;
  // Query the database for the menu with the given menuid
  db.get('SELECT * FROM menu WHERE menuid = ?', [menuid], (err, row) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    if (!row) {
      return res.status(404).json({ error: 'Menu not found' });
    }
    res.json(row);
  });
});

// Assuming you're using Express.js for the backend

app.delete('/api/menu/:menuid', (req, res) => {
  const menuid = req.params.menuid;

  // Perform deletion logic, e.g., SQL query
  db.run('DELETE FROM menu WHERE menuid = ?', [menuid], function(err) {
    if (err) {
      console.error('Error deleting menu item:', err);
      return res.status(500).json({ error: 'Failed to delete menu item' });
    }
    res.status(200).json({ message: 'Menu item deleted successfully' });
  });
});

// ✅ Add a menu item
app.post('/api/menu', (req, res) => {
  const { name, inkitchen, price, details, component, todo, type, menuimg } = req.body;
  const stmt = db.prepare(`
    INSERT INTO "menu" (name, emgname, inkitchen, price, details, component, todo, type, menuimg)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?,?)
  `);

  stmt.run(name,eventNames, inkitchen, price, details, component, todo, type, menuimg, (err) => {
    if (err) {
      res.status(500).send('Error inserting data: ' + err.message);
    } else {
      res.status(200).send('Menu item added successfully');
    }
    stmt.finalize();
  });
});



app.put('/api/menu/:menuid', (req, res) => {
  const { menuid } = req.params;
  const { name, inkitchen, price, details, component, todo, type } = req.body;
  console.log('Received data:', req.body);  // Log incoming data

  // Check for missing fields
  if (!name || !inkitchen || !price || !details || !component || !todo || !type) {
    return res.status(400).json({ error: 'กรุณากรอกข้อมูลให้ครบถ้วน' });
  }

  const sql = `
    UPDATE menu
    SET name = ?, inkitchen = ?, price = ?, details = ?, component = ?, todo = ?, type = ?
    WHERE menuid = ?
  `;

  db.run(sql, [name, inkitchen, price, details, component, todo, type, menuid], function (err) {
    if (err) {
      console.error('Error updating menu:', err);
      return res.status(500).json({ error: 'Failed to update menu' });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: 'Menu not found' });
    }

    res.status(200).json({ message: 'Menu updated successfully' });
  });
});



app.delete("/api/orders/:oderid", (req, res) => {
  const { oderid } = req.params;

  if (!oderid) {
    return res.status(400).json({ error: "❌ ต้องระบุ oderid" });
  }

  db.run("DELETE FROM oder WHERE oderid = ?", [oderid], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: "✅ ลบรายการสำเร็จ!" });
  });
});








// ✅ เปิดเซิร์ฟเวอร์
app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});
