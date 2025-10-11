const { db } = require("../../utils/setting");

const RegisterNew = async (result) => {
  const sqluseradd =
    "INSERT INTO users (auth_id, name, phone, location, bio, website, facebook, twitter, linkedin, profession, about, dob, gender, img_url, cover_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  const uservalue = [
    result?.insertId,
    "", // name
    "", // phone
    "", // location
    "", // bio
    "", // website
    "", // facebook
    "", // twitter
    "", // linkedin
    "", // profession
    "", // about
    "", // dob
    "", // gender
    null, // img_url
    null, // cover_url
  ];

  await db.query(sqluseradd, uservalue);
};

module.exports = { RegisterNew };
