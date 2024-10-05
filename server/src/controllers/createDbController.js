import { createEstadioNissaDb } from '../config/openDb.js';

export const createDb = async (req, res) => {
    try {
        const db = await createEstadioNissaDb();
        console.log(db);

        // Create tabla countries
        await db.exec(`
        CREATE TABLE IF NOT EXISTS countries (
          country_code CHAR(3) PRIMARY KEY,
          name VARCHAR(100) NOT NULL
        );
      `);

        // Create tabla employees
        await db.exec(`
        CREATE TABLE IF NOT EXISTS employees (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          document VARCHAR(25),
          name VARCHAR(100) NOT NULL,
          last_name VARCHAR(100) NOT NULL,
          email VARCHAR(100) NOT NULL UNIQUE,
          nacionality_code CHAR(3) NOT NULL,
          passport VARCHAR(25),
          social_security VARCHAR(15),
          w7 VARCHAR(15),
          photo BLOB,
          document_photo BLOB,
          expiration_date DATE,
          active BOOLEAN DEFAULT TRUE,
          FOREIGN KEY (nacionality_code) REFERENCES countries (country_code)
        );
      `);

        // Create tabla concerts
        await db.exec(`
        CREATE TABLE IF NOT EXISTS concerts (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          concert_name VARCHAR(100) NOT NULL,
          start_date DATETIME NOT NULL,
          end_date DATETIME NOT NULL,
          is_active BOOLEAN DEFAULT TRUE
        );
      `);

        // Create tabla payment_methods
        await db.exec(`
        CREATE TABLE IF NOT EXISTS payment_methods (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name_method VARCHAR(100) NOT NULL
        );
      `);

        // Create tabla work_hours
        await db.exec(`
        CREATE TABLE IF NOT EXISTS work_hours (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          employee_id INTEGER NOT NULL,
          concert_id INTEGER NOT NULL,
          work_date DATE NOT NULL,
          start_time TIME NOT NULL,
          end_time TIME NOT NULL,
          break_time FLOAT,
          hours_value FLOAT NOT NULL,
          additional_value FLOAT,
          payment_method_id INTEGER NOT NULL,
          FOREIGN KEY (employee_id) REFERENCES employees (id),
          FOREIGN KEY (concert_id) REFERENCES concerts (id),
          FOREIGN KEY (payment_method_id) REFERENCES payment_methods (id)
        );
      `);

        res.status(200).send('Database and tables created successfully');
    } catch (error) {
        console.error('Error creating database or tables:', error);
        res.status(500).send('Error creating database or tables');
    }
};