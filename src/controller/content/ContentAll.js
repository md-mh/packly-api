const { db } = require("../../utils/setting");
const { pagination } = require("../../hooks/pagination");

const ContentAll = async (req, res) => {
  let { type = "", search = "", page = 1, limit = 12 } = req.query;

  // Calculate offset for pagination
  const paginationData = await pagination({
    table: "content",
    filters: {
      type: type,
      title: search,
    },
    page,
    limit,
  });

  const offset = (page - 1) * limit;
  const sql = `SELECT * FROM content WHERE type LIKE ? AND title LIKE ? ORDER BY \`order\` ASC LIMIT ? OFFSET ?`;
  const value = [`%${type}%`, `%${search}%`, limit, offset];

  await db.query(sql, value, (error, result) => {
    if (error) {
      // 500 Internal Server Error for database error is appropriate
      return res.status(500).send({
        success: false,
        message: "Unable to show data",
        error: error.sqlMessage,
      });
    } else {
      // 200 OK for a successful fetch
      return res.status(200).send({
        success: true,
        message: "Data fetched successfully",
        data: result,
        pagination: paginationData,
      });
    }
  });
};

module.exports = { ContentAll };
