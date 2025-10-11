const { db } = require("../../utils/setting");
const { isInvalidData } = require("../../hooks/isInvalidData");

const ContentUpdate = async (req, res) => {
  const { id, type, title, image, order, ability, extra_data } = req.body;

  // Early check for required fields
  if (isInvalidData(id)) {
    // 400 Bad Request for invalid data
    return res.status(400).send({
      success: false,
      message: "Invalid Id",
    });
  } else if (!type) {
    return res.status(400).send({
      success: false,
      message: "Missing required field: type",
    });
  } else if (type === "text" && !title) {
    return res.status(400).send({
      success: false,
      message: "Missing required field: title for type 'text'",
    });
  } else if (type === "banner" && !image) {
    return res.status(400).send({
      success: false,
      message: "Missing required field: image for type 'banner'",
    });
  } else if (type === "card" && (!title || !image)) {
    return res.status(400).send({
      success: false,
      message: "Missing required fields: title or image for type 'card'",
    });
  }

  const sql = `
    UPDATE content
    SET 
      type = ?, 
      title = ?, 
      image = ?, 
     \`order\` = ?, 
      ability = ?,
      extra_data = ?
    WHERE id = ?
  `;
  const value = [
    type,
    title,
    image,
    order,
    ability,
    JSON.stringify(extra_data),
    id,
  ];

  await db.query(sql, value, (error, result) => {
    if (error) {
      // 500 Internal Server Error for database errors
      return res.status(500).send({
        success: false,
        message: "Unable to update content entry",
        error: error.sqlMessage,
      });
    } else if (result.affectedRows === 0) {
      // 404 Not Found if no row was updated or no changes applied
      return res.status(404).send({
        success: false,
        message: "Content not found or no changes applied",
      });
    } else {
      // 200 OK for successful update
      return res.status(200).send({
        success: true,
        message: "Content updated successfully",
        result,
      });
    }
  });
};

module.exports = { ContentUpdate };
