const { db } = require("../../utils/setting");
const bcrypt = require("bcrypt");
const { LoginData } = require("./LoginData");

const Login = async (req, res) => {
  const { email, password } = req.body;
  const sql = "SELECT * FROM auth WHERE email = ?";
  const value = [email];

  await db.query(sql, value, (error, result) => {
    if (error) {
      res.status(500).send({
        success: false,
        message: "Login failed",
        error: error.sqlMessage,
      });
    } else {
      if (
        result.length !== 1 ||
        email !== result[0].email ||
        !bcrypt.compareSync(password, result[0].password)
      ) {
        res.status(200).send({
          success: false,
          message: "Incorrect email or password",
        });
      } else if (
        result[0].validity &&
        result[0].validity.getFullYear() === 1993
      ) {
        LoginData(result[0], req, res, "Pending verification");
      } else {
        LoginData(result[0], req, res, "Login successful");
      }
    }
  });
};

module.exports = { Login };
