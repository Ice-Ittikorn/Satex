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
            
            stmt2.run('น้ำมันมะกอก', '15', 'ลิตร', '/uploads/s_น้ำมันมะกอกหรือน้ำมันพืช.jpeg', (err) => {
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
            
            stmt2.run('พริกไทยดำบด', '0', 'กิโลกรัม', '/uploads/s_พริกไทยดำบด.jpg', (err) => {
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
                stmt3.run('สเต็กหมู', 'Pork Steak','4', "179", 'ทำจากหมูคุณภาพเลี้ยงด้วยลูกระเบิด', 'สันคอหมู,เกลือ,พริกไทยดำ,ซอสหมัก,เนย,กระเทียม,โรสแมรี่,มันฝรั่งทอด,สลัด', 'ย่าง', 'สเต็ก', "/uploads/1921Pork.jpg", (err) => {
                  if (err) {
                    console.error(err.message);
                  } else {
                    console.log("เพิ่มเมนูเสร็จสิ้น");
                  }
                });

                stmt3.run('สเต็กเนื้อA5','Meat steak A5', '5', "219", 'ทำจากวัวตัวสีดำคุณภาพต้องสีดำเท่านั้นเพราะเนื้อจะนุ่มละมุ่น', 'เนื้อวัวA5,เกลือทะเล,พริกไทยดำ,เนย,กระเทียม,มันฝรั่งทอด,ผักเครื่อเคียง', 'ย่าง', 'สต็ก', "/uploads/1740cow.jpg", (err) => {
                  if (err) {
                    console.error(err.message);
                  } else {
                    console.log("เพิ่มเมนูเสร็จสิ้น");
                  }
                });

                stmt3.run('สเต็กปลาแซลม่อน','Salmon Steak', '6', "349", 'ทำจากแซลม่อนส่งตรงจากเจแปนแดนปลาดิบ', 'เนื้อแซลม่อน,เกลือ,พริกไทยดำ,น้ำมันมะกอก,มะนาว,หน่อไม้ฝรั่ง,สลัด', 'ย่าง', 'สต็ก', "/uploads/1747salmon.jpg", (err) => {
                  if (err) {
                    console.error(err.message);
                  } else {
                    console.log("เพิ่มเมนูเสร็จสิ้น");
                  }
                });

                stmt3.run('สเต็กไก่','Chicken Steak', '3', "169", 'ทำจากไก่ที่เลี้ยงด้วยกระสุนจากอัฟกานิสถาน', 'เนื้ออกไก่,ซอสหมัก,เกลือ,พริกไทย,น้ำมันมะกอก,สลัด,ซอสพริกไทยดำ', 'ทอด ย่าง', 'สต็ก', "/uploads/1927Chicken.jpg", (err) => {
                  if (err) {
                    console.error(err.message);
                  } else {
                    console.log("เพิ่มเมนูเสร็จสิ้น");
                  }
                });
stmt3.run('สเต็กปลาดอลลี่','Dolly Steak', '5', "169", 'ทำจากปลาดอลลี่ที่ตกมาได้จากน่านน้ำอเมซอน', 'เนื้อปลาดอลลี่,เกลือ,พริกไทย,น้ำมันมะกอก,สลัด', 'ทอด ย่าง', 'สต็ก', "/uploads/1928Dolly.jpg", (err) => {
                  if (err) {
                    console.error(err.message);
                  } else {
                    console.log("เพิ่มเมนูเสร็จสิ้น");
                  }
                });

                stmt3.run('มันบด','Mashed potatoes', '8', "68", 'มันที่ปลูกด้วยสารเคมี x', 'มันฝรั่ง,เนย,นมสด,เกลือ,พริกไทยขาว', 'บด', 'อาหารทานเล่น', "/uploads/2007มันบด.jpg", (err) => {
                  if (err) {
                    console.error(err.message);
                  } else {
                    console.log("เพิ่มเมนูเสร็จสิ้น");
                  }
                });

                stmt3.run('เฟรนฟราย','Frenแ้ fireห', '10', "52", 'สั่งตรงมาจากอเมริกา', 'มันฝรั่ง,น้ำมันพืช,เกลือ', 'ทอด', 'อาหารทานเล่น', "/uploads/2008เฟรนฟราย.jpg", (err) => {
                  if (err) {
                    console.error(err.message);
                  } else {
                    console.log("เพิ่มเมนูเสร็จสิ้น");
                  }
                });

                stmt3.run('นักเกตไก่','Chicken nuggets', '10', "69", 'สั่งตรงมาจากอเมริกา', 'เนื้อไก่บด,เกล็ดขนมปัง,แป้งสาลี,ไข่ไก่,เกลือ,พริกไทย,น้ำมันพืช', 'ทอด', 'อาหารทานเล่น', "/uploads/2009นักเกตไก่.jpg", (err) => {
                  if (err) {
                    console.error(err.message);
                  } else {
                    console.log("เพิ่มเมนูเสร็จสิ้น");
                  }
                });
stmt3.run('สลัด','Salad', '10', "72", 'ปลูกด้วยสารเคมี y', 'ผักกาดหอม.มะเขือเทศเชอรี่,แตงกว่า,หัวหอมใหญ่,แครอท,น้ำสลีด', 'ผัด', 'อาหารทานเล่น', "/uploads/2010สลัด.jpg", (err) => {
                  if (err) {
                    console.error(err.message);
                  } else {
                    console.log("เพิ่มเมนูเสร็จสิ้น");
                  }
                });

                stmt3.run('ชาใต้','Chatai', '10', "35", 'สั่งตรงมาจากภาคใต้', 'น้ำแข็ง,ชาใต้,นม', 'ชง', 'เครื่องดื่ม', "/uploads/2011ชาใต้.jpg", (err) => {
                  if (err) {
                    console.error(err.message);
                  } else {
                    console.log("เพิ่มเมนูเสร็จสิ้น");
                  }
                });

                stmt3.run('โค้ก','Coke', '10', "20", 'สั่งตรงมาจากเตเนฮาปา', 'น้ำแข็ง,โค้ก', 'เทใส่แก้ว', 'เครื่องดื่ม', "/uploads/2012Coke.jpg", (err) => {
                  if (err) {
                    console.error(err.message);
                  } else {
                    console.log("เพิ่มเมนูเสร็จสิ้น");
                  }
                });

                stmt3.run('น้ำส้ม','Orenge juice', '10', "25", 'ปลูกด้วยสารเคมี z', 'น้ำแข็ง,น้ำส้มคั้น', 'เทใส่แก้ว', 'เครื่องดื่ม', "/uploads/2026น้ำส้ม.jpg", (err) => {
                  if (err) {
                    console.error(err.message);
                  } else {
                    console.log("เพิ่มเมนูเสร็จสิ้น");
                  }
                });
stmt3.run('น้ำเปล่า','Water', '10', "10", 'เป็นน้ำที่ส่งตรงมาจากเถือกเขาเอเวอเรส', 'น้ำ', 'เทใส่แก้ว', 'เครื่องดื่ม', "/uploads/2013Water.jpg", (err) => {
                  if (err) {
                    console.error(err.message);
                  } else {
                    console.log("เพิ่มเมนูเสร็จสิ้น");
                  }
                });

                stmt3.run('น้ำแข็ง','Ice', '100', "5", 'น้ำแข็งที่ทำมาจากก้อนน้ำแข็งที่ขั้วโลกใต้', 'น้ำแข็ง', 'ทุบ', 'เครื่องดื่ม', "/uploads/2014น้ำแข็ง.jpg", (err) => {
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

