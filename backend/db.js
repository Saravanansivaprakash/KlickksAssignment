const path = require("path");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");

const dbPath = path.join(__dirname, "./users.db");

let db = null;

const openDB = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });

    //create users table
    let sql = `CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL
            )`;

    await db.run(sql);
    console.log("data base is connected");

    return db;
  } catch (error) {
    console.log(`DB Error: ${error.message}`);
  }
};

module.exports = openDB;
