const { db } = require("../../utils/setting");
const { isInvalidData } = require("../../hooks/isInvalidData");

const ContentById = async (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM content WHERE id=?";
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
        // 500 Internal Server Error for database error is appropriate
        return res.status(500).send({
          success: false,
          message: "Unable to show data",
          error: error.sqlMessage,
        });
      } else if (!result || result.length === 0) {
        // 404 Not Found is appropriate if no content is found for given id
        return res.status(404).send({
          success: false,
          message: "Content not found",
        });
      } else {
        // 200 OK for a successful fetch
        return res.status(200).send({
          success: true,
          message: "Data fetched successfully",
          data: result[0],
        });
      }
    });
  }
};

module.exports = { ContentById };
