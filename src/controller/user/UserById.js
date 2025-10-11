const { db } = require("../../utils/setting");

const UserById = async (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM users WHERE id=?";
  const value = [id];

  await db.query(sql, value, (error, result) => {
    if (error) {
      res.status(500).send({
        success: false,
        message: "Unable to show data",
        error: error.sqlMessage,
      });
    } else {
      res.status(200).send({
        success: true,
        message: "Data fetched successfully",
        data: result[0],
      });
    }
  });
};

module.exports = { UserById };
