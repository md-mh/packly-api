const { pagination } = require("../../hooks/pagination");
const { db } = require("../../utils/setting");

const UserAll = async (req, res) => {
  let { search = "", page = 1, limit = 12 } = req.query;

  const paginationData = await pagination({
    table: "users",
    filters: {
      name: search,
    },
    page,
    limit,
  });

  let offset = (page - 1) * limit;
  const sql = `SELECT * FROM users WHERE name LIKE ? LIMIT ? OFFSET ?`;
  const values = [`%${search}%`, limit, offset];

  await db.query(sql, values, (error, result) => {
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
        data: result,
        pagination: paginationData,
      });
    }
  });
};

module.exports = { UserAll };
