const mysql = require("mysql");
const nodemailer = require("nodemailer");

// API and domain configuration
const api = "http://localhost:5000";
const domain = "http://localhost:3000";
const company = "Packly";

// Mail configuration
const mailHost = "mail.exhortdesign.com";
const mailFrom = "test@exhortdesign.com";
const mailPass = "R&-ZDr~M1Uig";

// Database configuration
const dbConfig = {
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
