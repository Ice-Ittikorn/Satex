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
      phone TEXT,
      email TEXT,
      gardID TEXT,
      username TEXT,
      password TEXT,
      job TEXT
  );

    `, (err) => {
      if (err) {
        console.error('Error creating table:', err.message);
      } else {
        console.log('Table "emp" is ready.');

      
        
        // เตรียมคำสั่ง INSERT ให้ตรงกับโครงสร้างของตาราง
        let stmt1 = db.prepare(`
          INSERT INTO "emp" (name, lastname, phone, email, gardID, username, password, job)
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
          Storeid INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT,
          count TEXT,
          unit TEXT,
          image TEXT
      );
    
        `, (err) => {
          if (err) {
            console.error('Error creating table:', err.message);
          } else {
            console.log('Table "Store" is ready.');
    
          
            
            // เตรียมคำสั่ง INSERT ให้ตรงกับโครงสร้างของตาราง
            let stmt2 = db.prepare(`
              INSERT INTO "Store" (name, count, unit, image)
              VALUES (?,?,?,?)
            `);
    
            // เพิ่มองค์ประกอบในตาราง
            stmt2.run('Pork Collar', '23', 'กิโลกรัม', '/uploads/s_Pork Collar.jpg', (err) => {
              if (err) {
                console.error('Error inserting data:', err.message);
              } else {
                console.log('Data inserted successfully.');
              }
              stmt2.finalize();
            });
            
            stmt2.run('Pork Loin', '24', 'กิโลกรัม', '/uploads/s_Pork Loin.jpg', (err) => {
              if (err) {
                console.error('Error inserting data:', err.message);
              } else {
                console.log('Data inserted successfully.');
              }
              stmt2.finalize();
            });
            
            stmt2.run('Ribeye', '25', 'กิโลกรัม', '/uploads/s_Ribeye.jpg', (err) => {
              if (err) {
                console.error('Error inserting data:', err.message);
              } else {
                console.log('Data inserted successfully.');
              }
              stmt2.finalize();
            });
            
            stmt2.run('Sirloin', '26', 'กิโลกรัม', '/uploads/s_Sirloin.jpg', (err) => {
              if (err) {
                console.error('Error inserting data:', err.message);
              } else {
                console.log('Data inserted successfully.');
              }
              stmt2.finalize();
            });
            
            stmt2.run('Tenderloin', '27', 'กิโลกรัม', '/uploads/s_Tenderloin.jpg', (err) => {
              if (err) {
                console.error('Error inserting data:', err.message);
              } else {
                console.log('Data inserted successfully.');
              }
              stmt2.finalize();
            });
            
            stmt2.run('เกลือ', '10', 'กิโลกรัม', '/uploads/s_เกลือ.jpg', (err) => {
              if (err) {
                console.error('Error inserting data:', err.message);
              } else {
                console.log('Data inserted successfully.');
              }
              stmt2.finalize();
            });
            
            stmt2.run('น้ำมันมะกอกหรือน้ำมันพืช', '15', 'ลิตร', '/uploads/s_น้ำมันมะกอกหรือน้ำมันพืช.jpeg', (err) => {
              if (err) {
                console.error('Error inserting data:', err.message);
              } else {
                console.log('Data inserted successfully.');
              }
              stmt2.finalize();
            });
            
            stmt2.run('เนย', '12', 'กิโลกรัม', '/uploads/s_เนย.jpg', (err) => {
              if (err) {
                console.error('Error inserting data:', err.message);
              } else {
                console.log('Data inserted successfully.');
              }
              stmt2.finalize();
            });
            
            stmt2.run('เนื้อปลาแซลมอน', '30', 'กิโลกรัม', '/uploads/s_เนื้อปลาแซลมอน.jpg', (err) => {
              if (err) {
                console.error('Error inserting data:', err.message);
              } else {
                console.log('Data inserted successfully.');
              }
              stmt2.finalize();
            });
            
            stmt2.run('ผักกาดหอม', '8', 'กิโลกรัม', '/uploads/s_ผักกาดหอม.png', (err) => {
              if (err) {
                console.error('Error inserting data:', err.message);
              } else {
                console.log('Data inserted successfully.');
              }
              stmt2.finalize();
            });
            
            stmt2.run('กะหล่ำปลีม่วง', '9', 'กิโลกรัม', '/uploads/s_กะหล่ำปลีม่วง.jpg', (err) => {
              if (err) {
                console.error('Error inserting data:', err.message);
              } else {
                console.log('Data inserted successfully.');
              }
              stmt2.finalize();
            });
            
            stmt2.run('มะเขือเทศเชอร์รี่', '7', 'กิโลกรัม', '/uploads/s_มะเขือเทศเชอร์รี่.jpg', (err) => {
              if (err) {
                console.error('Error inserting data:', err.message);
              } else {
                console.log('Data inserted successfully.');
              }
              stmt2.finalize();
            });
            
            
            stmt2.run('พริกหวาน', '11', 'กิโลกรัม', '/uploads/s_พริกหวาน.jpg', (err) => {
              if (err) {
                console.error('Error inserting data:', err.message);
              } else {
                console.log('Data inserted successfully.');
              }
              stmt2.finalize();
            });
            
            stmt2.run('อะโวคาโด', '5', 'กิโลกรัม', '/uploads/s_อะโวคาโด.jpg', (err) => {
              if (err) {
                console.error('Error inserting data:', err.message);
              } else {
                console.log('Data inserted successfully.');
              }
              stmt2.finalize();
            });
            
            stmt2.run('พริกไทยดำบด', '4', 'กิโลกรัม', '/uploads/s_พริกไทยดำบด.jpg', (err) => {
              if (err) {
                console.error('Error inserting data:', err.message);
              } else {
                console.log('Data inserted successfully.');
              }
              stmt2.finalize();
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

        // ตารางหมวดหมู่อาหาร (สร้างก่อนการ insert)
        db.run(`
          CREATE TABLE IF NOT EXISTS "menu" (
              menuid INTEGER PRIMARY KEY AUTOINCREMENT,
              name TEXT,
              engname TEXT,
              inkitchen TEXT,
              price TEXT,
              details TEXT,
              component TEXT,
              todo TEXT,
              type TEXT,
              menuimg TEXT
          );
        
            `, (err) => {
              if (err) {
                console.error('Error creating table:', err.message);
              } else {
                console.log('Table "menu" is ready.');
        
              
                
                // เตรียมคำสั่ง INSERT ให้ตรงกับโครงสร้างของตาราง
                let stmt3 = db.prepare(`
                  INSERT INTO "menu" (name, engname,inkitchen, price, details, component, todo,type,menuimg)
                  VALUES (?,?,?,?,?,?,?,?,?)
                `);
                stmt3.run('เสตก', 'Satex','4', "40", 'ทำจากวัวตัวสีขาว', 'เนื้อหมู', 'ทอด ต้ม ย่าง', 'เนื้อสัตว์', "/uploads/1743059388221.jpeg", (err) => {
                  if (err) {
                    console.error(err.message);
                  } else {
                    console.log("เพิ่มเมนูเสร็จสิ้น");
                  }
                });
                
                stmt3.run('สเต็ก','satex', '5', "30", 'ทำจากวัวตัวสีดำ', 'เนื้อวัว', 'ทอด ต้ม ย่าง', 'เนื้อสัตว์', null, (err) => {
                  if (err) {
                    console.error(err.message);
                  } else {
                    console.log("เพิ่มเมนูเสร็จสิ้น");
                  }
                });
                
                stmt3.run('ข้าวผัด','kawpud', '6', "20", 'ข้าวสวยผัดกับไข่', 'ไก่', 'ผัด', 'ข้าว', null, (err) => {
                  if (err) {
                    console.error(err.message);
                  } else {
                    console.log("เพิ่มเมนูเสร็จสิ้น");
                  }
                });
                
                    
                // ดึงข้อมูลจากตารางและแสดงผล
                db.all('SELECT * FROM "menu"', [], (err, rows) => {
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

