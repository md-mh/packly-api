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
const company = "packly";

// Mail configuration
const mailHost = process.env.NODE_MAIL_HOST;
const mailFrom = process.env.NODE_MAIL_FROM;
const mailPass = process.env.NODE_MAIL_PASS;

// Database configuration
const dbConfig = {
  host: process.env.NODE_DB_HOST,
  user: process.env.NODE_DB_USER,
  password: process.env.NODE_DB_PASS,
  database: process.env.NODE_DB_DATABASE,
};

const db = mysql.createConnection(dbConfig);

const transport = nodemailer.createTransport({
  host: mailHost,
  port: 465,
  secure: true,
  auth: {
    user: mailFrom,
    pass: mailPass,
  },
});

module.exports = { api, domain, company, db, mailFrom, transport };
