const express = require("express");
const cors = require("cors");
const session = require("express-session");
const SQLiteStore = require("connect-sqlite3")(session);
const path = require("path");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth");
dotenv.config();
const PORT = process.env.PORT || 4000;

const app = express();
app.set("trust proxy", 1);
app.use(
  cors({
    origin: "https://simpleauthen.netlify.app",
    credentials: true,
  })
);

app.use(
  session({
    store: new SQLiteStore({
      // Sessions will be stored in db/sessions.sqlite
      dir: path.join(__dirname, "db"),
      db: "sessions.db",
    }),
    secret: process.env.SECRET_KEY || "dedfo32AzlRMwEm4LaXbp1UjHat9F1",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: "none",
      secure: true, // set to true if using HTTPS
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 day
    },
  })
);

app.use(express.json());
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`server is running at ${PORT}`);
});
