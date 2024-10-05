import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';
import fs from 'fs';

const openDb = async () => {
    const __dirname = path.resolve();
    const dbPath = path.join(__dirname, 'src', 'database', 'estadio_nissan.db');
    const dbDir = path.dirname(dbPath); 

    if (!fs.existsSync(dbDir)) {
        fs.mkdirSync(dbDir, { recursive: true });
    }
    
    return open({
        filename: dbPath,
        driver: sqlite3.Database,
    });
};

export const createEstadioNissaDb = async (req, res) => {
    try {
        const db = await openDb(); 
        return db;
    } catch (error) {
        console.error("Error opening the database:", error);
        res.status(500).send("Error opening the database");
    }
};
