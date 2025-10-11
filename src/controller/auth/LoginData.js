const { db } = require("../../utils/setting");
const { generateAccessToken } = require("../../hooks/JWThelper");
const { generateRefreshToken } = require("../../hooks/JWThelper");

const LoginData = (result, req, res, message, previousRefreshToken = null) => {
  db.query(
    "SELECT id, name, phone, img_url FROM users WHERE auth_id = ?",
    [result.id],
    (userError, userResult) => {
      if (userError) {
        res.status(500).send({
          success: false,
          message: "Failed to fetch user details",
          error: userError.sqlMessage,
        });
      } else {
        const user = {
          id: result.id,
          username: result.username,
          email: result.email,
          role: result.role,
        };

        const accessToken = generateAccessToken(user, "jwtSecret");
        const refreshToken = generateRefreshToken(user, "jwtSecret");

        res.status(200).send({
          success: true,
          message: message,
          id: userResult[0].id,
          name: userResult[0].name,
          phone: userResult[0].phone,
          img_url: userResult[0].img_url,
          username: result.username,
          email: result.email,
          role: result.role,
          token: accessToken,
          refreshToken,
        });

        if (previousRefreshToken) {
          db.query(
            `UPDATE login_activity SET access_token = ?, refresh_token = ? WHERE refresh_token = ?`,
            [accessToken, refreshToken, previousRefreshToken]
          );
        } else {
          const location = req.body.location || null;
          const userAgent = JSON.stringify(req.headers["user-agent"]) || null;
          db.query(
            `INSERT INTO login_activity (auth_id, location, user_agent, access_token, refresh_token) VALUES (?, ?, ?, ?, ?)`,
            [result.id, location, userAgent, accessToken, refreshToken]
          );
        }
      }
    }
  );
};

module.exports = { LoginData };
