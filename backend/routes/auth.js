const express = require("express");
const bcrypt = require("bcrypt");
const openDB = require("../db.js");

const routes = express.Router();

let db = null;

// initialise db instance
async function initialiseDB() {
  db = await openDB();
}
initialiseDB();

//Middleware
function isAuthenticated(req, res, next) {
  if (!req.session.userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
}

//validate user
routes.get("/me", isAuthenticated, async (req, res) => {
  const id = req.session.userId;

  let sqlQuery = `SELECT * FROM users WHERE id = '${id}'`;
  const user = await db.get(sqlQuery);

  res.status(200).json({ name: user.name, email: user.email });
});

// register
routes.post("/register", async (req, res) => {
  const { email, name, password } = req.body;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return res.status(404).json({ error: "Invalid email Format" });
  }

  let sqlQuery = `SELECT * FROM users WHERE email = '${email}'`;

  const user = await db.get(sqlQuery);
  if (user) {
    res.status(400).json({ error: "user already exist" });
    return;
  }

  // validate password
  if (password.length < 6) {
    res.status(400).json({ error: "password too short" });
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  let sqlUserQuery =
    "INSERT INTO users (name, email, password) VALUES (?, ?,?)";

  await db.run(sqlUserQuery, [name, email, hashedPassword]);
  res.json({ message: "user created successfully" });
});

//login
routes.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const sqlQuery = `SELECT * FROM users WHERE email = ?`;

  const userData = await db.get(sqlQuery, [email]);

  if (userData === undefined) {
    res.status(404).json({ error: "User not found" });
    return;
  }

  const isPasswordMatch = await bcrypt.compare(password, userData.password);

  if (isPasswordMatch) {
    req.session.userId = userData.id;
    res.status(200).json({ message: "'Logged in successfully'" });
  } else {
    res.status(400).json({ error: "Invalid password" });
  }
});

//logout
routes.post("/logout", isAuthenticated, (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ error: "Logout failed" });
    res.clearCookie("connect.sid");
    res.json({ message: "Logged out successfully" });
  });
});

//delete Account
routes.delete("/delete", isAuthenticated, async (req, res) => {
  const id = req.session.userId;

  let sqlQuery = `DELETE FROM users WHERE id = ?`;
  await db.run(sqlQuery, [id]);

  req.session.destroy((err) => {
    if (err) return res.status(500).json({ error: "Logout failed" });
    res.clearCookie("connect.sid");
    res.status(200).json({ message: "deleted successfully" });
  });
});

module.exports = routes;
