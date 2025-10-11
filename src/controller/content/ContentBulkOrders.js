const { db } = require("../../utils/setting");

/**
 * Bulk update the `order` field for multiple content entries.
 * Expects req.body to be an array of objects: [{id, order}, ...]
 */
const ContentBulkOrders = async (req, res) => {
  const updateContents = req.body;

  if (!Array.isArray(updateContents) || updateContents.length === 0) {
    return res.status(400).send({
      success: false,
      message: "Request body must be a non-empty array of updates.",
    });
  }

  // Validate input - each object must have 'id' and 'order'
  for (const item of updateContents) {
    if (!item.id || typeof item.order !== "number") {
      return res.status(400).send({
        success: false,
        message: "Each update must have 'id' (string) and 'order' (number).",
        invalidItem: item,
      });
    }
  }

  // Build the bulk update query using CASE WHEN for orders
  const ids = updateContents.map((u) => u.id);
  const orderCases = updateContents.map((u) => `WHEN id = ? THEN ?`).join(" ");
  const sql = `
    UPDATE content
    SET \`order\` = CASE ${orderCases} END
    WHERE id IN (${ids.map(() => "?").join(",")})
  `;
  const values = [];
  // For CASE WHEN, we alternate id, order, id, order...
  updateContents.forEach((u) => {
    values.push(u.id, u.order);
  });
  // For WHERE IN (...)
  values.push(...ids);

  await db.query(sql, values, (error, result) => {
    if (error) {
      return res.status(500).send({
        success: false,
        message: "Unable to bulk update content orders.",
        error: error.sqlMessage,
      });
    } else if (result.affectedRows === 0) {
      return res.status(404).send({
        success: false,
        message: "No content found for the given IDs, or no changes applied.",
      });
    } else {
      return res.status(200).send({
        success: true,
        message: "Content orders updated successfully.",
        affectedRows: result.affectedRows,
        result,
      });
    }
  });
};

module.exports = { ContentBulkOrders };
