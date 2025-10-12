const mysql = require("mysql");
const nodemailer = require("nodemailer");

// Environment-based configuration
const isProduction = process.env.NODE_ENV === "production";

// API and domain configuration
const api = isProduction
  ? "https://packly.exhortdesign.com/"
  : "http://localhost:5000";
const domain = isProduction
  ? "https://packly.exhortdesign.com"
  : "http://localhost:3000";
const company = "Packly";

// Mail configuration
// const mailHost = process.env.MAIL_HOST;
// const mailFrom = process.env.MAIL_FROM;
// const mailPass = process.env.MAIL_PASS;
const mailHost = "mail.exhortdesign.com";
const mailFrom = "test@exhortdesign.com";
const mailPass = "R&-ZDr~M1Uig";

// Database configuration
const dbConfig = isProduction
  ? {
      host: "localhost",
      user: "exhortde_packly_user",
      password: "H5d2OP6nYi+aL6y8",
      database: "exhortde_packlydb",
      // host: process.env.DB_HOST,
      // user: process.env.DB_USER,
      // password: process.env.DB_PASS,
      // database: process.env.DB_DATABASE,
    }
  : {
      host: "localhost",
      user: "root",
      password: "",
      database: "packly",
    };

let db;

db = mysql.createConnection(dbConfig);

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    process.exit(1);
  } else {
    console.log("Connected to the MySQL database");
  }
});

let transport;
try {
  transport = nodemailer.createTransport({
    host: mailHost,
    port: 465,
    secure: true,
    auth: {
      user: mailFrom,
      pass: mailPass,
    },
  });
} catch (err) {
  console.error("Error creating nodemailer transport:", err);
  transport = null;
}

module.exports = { api, domain, company, db, mailFrom, transport };
