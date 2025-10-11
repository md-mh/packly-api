const { db } = require("../../utils/setting");
const { isInvalidData } = require("../../hooks/isInvalidData");

const ContentDelete = async (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM content WHERE id=?";
  const value = [id];

  if (isInvalidData(id)) {
    // 400 Bad Request for invalid data
    return res.status(400).send({
      success: false,
      message: "Invalid Id",
    });
  } else {
    await db.query(sql, value, (error, result) => {
      if (error) {
        // 500 Internal Server Error for database errors
        return res.status(500).send({
          success: false,
          message: "Unable to DELETE",
          error: error.sqlMessage,
        });
      } else if (result.affectedRows === 0) {
        // 404 Not Found if no row was deleted
        return res.status(404).send({
          success: false,
          message: "Content not found",
        });
      } else {
        // 200 OK for successful deletion
        return res.status(200).send({
          success: true,
          message: "Delete successfully",
          result,
        });
      }
    });
  }
};

module.exports = { ContentDelete };
