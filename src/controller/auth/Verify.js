const { db } = require("../../utils/setting");

const Verify = async (req, res) => {
  const { username, pin } = req.body;
  const date = new Date();
  const sql = "SELECT * FROM auth WHERE username=?";
  const value = [username];

  await db.query(sql, value, (error, result) => {
    if (error) {
      res.status(500).send({
        success: false,
        message: "Unable to verify",
        error: error.sqlMessage,
      });
    } else {
      if (
        result.length === 1 &&
        result[0].pin === pin &&
        result[0].validity > date
      ) {
        // This condition use for reset check by email
        res.status(200).json({
          success: true,
          message: "Verification successfully",
          reset: true,
          email: result[0].email,
        });
        // const sql = "UPDATE auth SET pin = ?, validity = ? WHERE username = ?";
        // const value = [null, null, username];

        // db.query(sql, value, (error) => {
        //   if (error) {
        //     res.status(500).send({
        //       success: false,
        //       message: "Verification failed",
        //       error: error.sqlMessage,
        //     });
        //   } else {
        //     res.status(200).json({
        //       success: true,
        //       message: "Verification successfully",
        //       reset: true,
        //       email: result[0].email,
        //     });
        //   }
        // });
      } else if (
        result.length === 1 &&
        result[0].pin === pin &&
        result[0].validity.getFullYear() === 1993
      ) {
        // This condition use for verify email after registration
        const sql = "UPDATE auth SET pin = ?, validity = ? WHERE username = ?";
        const value = [null, null, username];

        db.query(sql, value, (error) => {
          if (error) {
            res.status(500).send({
              success: false,
              message: "Verification failed",
              error: error.sqlMessage,
            });
          } else {
            res.status(200).json({
              success: true,
              message: "Verification successfully",
              login: true,
            });
          }
        });
      } else {
        res.status(200).json({
          success: false,
          message: "Verification Expired",
        });
      }
    }
  });
};

module.exports = { Verify };
