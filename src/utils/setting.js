const mysql = require("mysql");
const nodemailer = require("nodemailer");

// Environment-based configuration
const isProduction = process.env.NODE_ENV === "production";

// API and domain configuration
const api = isProduction
  ? "https://t.exhortdesign.com/"
  : "http://localhost:5000";
const domain = isProduction
  ? "https://t.exhortdesign.com"
  : "http://localhost:3000";
const company = "packly";

// Mail configuration
const mailHost = "mail.exhortdesign.com";
const mailFrom = "test@exhortdesign.com";
const mailPass = "R&-ZDr~M1Uig";

// Database configuration
const dbConfig = isProduction
  ? {
      host: "localhost",
      user: "exhortde_packly_user",
      password: "cAaY?adQ)B;XV,t!",
      database: "exhortde_packlydb",
    }
  : {
      host: "localhost",
      user: "root",
      password: "",
      database: "packly",
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
