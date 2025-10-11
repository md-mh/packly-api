const { db } = require("../../utils/setting");

const UserUpdate = async (req, res) => {
  const io = req.io;
  const {
    id,
    name,
    phone,
    location,
    bio,
    website,
    facebook,
    twitter,
    linkedin,
    profession,
    about,
    dob,
    gender,
    img_url,
    cover_url,
  } = req.body;
  const sql =
    "UPDATE users SET name = ?, phone = ?, location = ?, bio = ?, website = ?, facebook = ?, twitter = ?, linkedin = ?, profession = ?, about = ?, dob = ?, gender = ?, img_url = ?, cover_url = ? WHERE id = ?";
  const value = [
    name,
    phone,
    location,
    bio,
    website,
    facebook,
    twitter,
    linkedin,
    profession,
    about,
    dob,
    gender,
    img_url,
    cover_url,
    id,
  ];

  await db.query(sql, value, (error, result) => {
    if (error) {
      res.status(500).send({
        success: false,
        message: "Unable to update",
        error: error.sqlMessage,
      });
    } else {
      res.status(200).send({
        success: true,
        message: "Update successfully",
        result,
      });
      io.emit("user", req?.originalUrl);
    }
  });
};

module.exports = { UserUpdate };
