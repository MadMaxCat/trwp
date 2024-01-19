import { Router } from "express";
import path from 'path';
import sqlite3 from 'sqlite3';

export const rootRouter = Router();
const __dirname = path.resolve();

rootRouter.get('/', (req, res) => {
    const db = new sqlite3.Database('./database.db', (err) => {
        if (err) {
            console.error("Error opening database " + err.message);
        } else {
            console.log('Connection established.')
        }
    });

    db.all(`SELECT procedures, date
        FROM shifts`, [], (err, data) => {
        if (err) {
            return console.error(err.message);
        }
        res.render(__dirname + "/static/html/root.ejs", { model: data });
    });

    db.close();
});