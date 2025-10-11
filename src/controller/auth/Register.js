const { db, mailFrom, transport } = require("../../utils/setting");
const bcrypt = require("bcrypt");
const { verifyEmail } = require("../../emailBody/verifyEmail");
const { RegisterNew } = require("./RegisterNew");

const Register = async (req, res) => {
  const { username, email, password } = req.body;
  const hashPassword = bcrypt.hashSync(password, 10);
  const pin = bcrypt.genSaltSync(10).replace(/\//g, "-");
  const validity = new Date(`1993-11-23`);
  const sql =
    "INSERT INTO auth ( username, email, password, role, pin, validity) VALUES (?,?,?,?,?,?)";
  const value = [username, email, hashPassword, "USER", pin, validity];

  await db.query(sql, value, (error, result) => {
    if (error) {
      res.status(200).send({
        success: false,
        message: "Failed to registration user",
        error: error.sqlMessage,
      });
    } else {
      const mailOptions = {
        from: mailFrom,
        to: email,
        subject: `Verify your email`,
        html: verifyEmail
          .replace("{{username}}", username)
          .replace("{{username}}", username)
          .replace("{{pin}}", pin),
      };

      transport.sendMail(mailOptions, (error, info) => {
        if (error) {
          const sql = "DELETE FROM auth WHERE email=?";
          const value = [email];
          db.query(sql, value, (error) => {
            if (error) {
              res.status(200).send({
                success: false,
                message: "Something Wrong",
                error: error.sqlMessage,
              });
            }
          });
          res.status(200).send({
            success: false,
            message: "Invalid email",
            error: error.response,
          });
        } else {
          res.status(200).send({
            success: true,
            message: "User registration successfully, Please verify your email",
            result,
          });

          RegisterNew(result);
        }
      });
    }
  });
};

module.exports = { Register };
