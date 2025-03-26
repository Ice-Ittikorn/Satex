const sqlite3 = require('sqlite3').verbose();

// สร้างการเชื่อมต่อกับฐานข้อมูล (หากไม่มีจะสร้างใหม่)
let db = new sqlite3.Database('example.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
    
    // ตารางหมวดหมู่อาหาร (สร้างก่อนการ insert)
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

      
        
        // เตรียมคำสั่ง INSERT ให้ตรงกับโครงสร้างของตาราง
        let stmt1 = db.prepare(`
          INSERT INTO "emp" (name, lastname, Phone, Email, gardID, Username, Password, Job)
          VALUES (?,?,?,?,?,?,?,?)
        `);

        // เพิ่มองค์ประกอบในตาราง
        stmt1.run('อิทธิกร', 'ทองสิมา', "0987654321", 'ice@gmail.com', '1234567890', 'admin', '1234', 'admin', (err) => {
          if (err) {
            console.error('Error inserting data:', err.message);
          } else {
            console.log('Data inserted successfully.');
          }
          stmt1.finalize(); // ปิดคำสั่ง
        });

        stmt1.run('ปวเรต', 'วงสุขสี', "01937452816", 'ter@gmail.com', '1234567890', 'chef', '2141', 'chef', (err) => {
            if (err) {
              console.error('Error inserting second data:', err.message);
            } else {
              console.log('Second data inserted successfully.');
            }
          });

          stmt1.run('รุสนีดา', 'กุวิง', "1234567890", 'rus@gmail.com', '1234567890', 'cashier', '2345', 'cashier', (err) => {
            if (err) {
              console.error('Error inserting second data:', err.message);
            } else {
              console.log('Second data inserted successfully.');
            }
          });
        
        // ดึงข้อมูลจากตารางและแสดงผล
        db.all('SELECT * FROM "emp"', [], (err, rows) => {
          if (err) {
            console.error('Error fetching data:', err.message);
          } else {
            console.log('Menu Data:');
            console.table(rows); // แสดงผลข้อมูลแบบตาราง
          }

          // ปิดการเชื่อมต่อฐานข้อมูลหลังจากดึงข้อมูลเสร็จ
          db.close((err) => {
            if (err) {
              console.error('Error closing database:', err.message);
            } else {
              console.log('Closed the database connection.');
            }
          });
        });
      }
    });

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

      
        
        // เตรียมคำสั่ง INSERT ให้ตรงกับโครงสร้างของตาราง
        let stmt2 = db.prepare(`
          INSERT INTO "Store" (name, instore, unit ,imgstore)
          VALUES (?,?,?,?)
        `);

        // เพิ่มองค์ประกอบในตาราง
        stmt2.run('น้ำตาล', '56', "กิโลกรัม", null, (err) => {
          if (err) {
            console.error('Error inserting data:', err.message);
          } else {
            console.log('Data inserted successfully.');
          }
          stmt2.finalize(); // ปิดคำสั่ง
        });

        stmt2.run('น้ำมัน', '20', "ลิตร", null, (err) => {
          if (err) {
            console.error('Error inserting data:', err.message);
          } else {
            console.log('Data inserted successfully.');
          }
          stmt2.finalize(); // ปิดคำสั่ง
        });

        stmt2.run('เนื้อหมู', '20', "กิโลกรัม,", null, (err) => {
          if (err) {
            console.error('Error inserting data:', err.message);
          } else {
            console.log('Data inserted successfully.');
          }
          stmt2.finalize(); // ปิดคำสั่ง
        });
        
        // ดึงข้อมูลจากตารางและแสดงผล
        db.all('SELECT * FROM "Store"', [], (err, rows) => {
          if (err) {
            console.error('Error fetching data:', err.message);
          } else {
            console.log('Menu Data:');
            console.table(rows); // แสดงผลข้อมูลแบบตาราง
          }

          // ปิดการเชื่อมต่อฐานข้อมูลหลังจากดึงข้อมูลเสร็จ
          db.close((err) => {
            if (err) {
              console.error('Error closing database:', err.message);
            } else {
              console.log('Closed the database connection.');
            }
          });
        });
      }
    });
  }
});
