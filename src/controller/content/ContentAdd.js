const { db } = require("../../utils/setting");
const { v4: uuidv4 } = require("uuid");

const ContentAdd = async (req, res) => {
  const auth_id = req?.user?.id || null;
  const { type, title, image, extra_data, ability = true } = req.body;

  // Early check for required fields
  if (!type) {
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

  const id = uuidv4();

  const sql = `
    INSERT INTO content (
      id,
      type,
      title,
      image,
      extra_data,
      ability,
      auth_id
    ) VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  const value = [
    id,
    type,
    title,
    image,
    JSON.stringify(extra_data),
    ability,
    auth_id,
  ];

  await db.query(sql, value, (error, result) => {
    if (error) {
      // 500 Internal Server Error for database error is appropriate
      return res.status(500).send({
        success: false,
        message: "Unable to create content entry",
        error: error.sqlMessage,
      });
    } else {
      // 201 Created for successful resource creation
      return res.status(201).send({
        success: true,
        message: "Content added successfully",
        content_id: id,
        result,
      });
    }
  });
};

module.exports = { ContentAdd };

// CREATE TABLE `content` (
//   `id` CHAR(36) NOT NULL,
//   `type` ENUM('text', 'banner', 'card') NOT NULL,
//   `title` VARCHAR(255) NOT NULL,
//   `image` TEXT NOT NULL,
//   `extra_data` JSON NULL,
//   `order` INT NOT NULL AUTO_INCREMENT,
//   `ability` BOOLEAN NOT NULL DEFAULT TRUE,
//   `auth_id` CHAR(36) NOT NULL,
//   `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//   `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
//   PRIMARY KEY (`id`),
//   UNIQUE KEY (`order`)
// ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
