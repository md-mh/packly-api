const { domain, company } = require("../utils/setting");

const verifyEmail = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Your Email</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .email-container {
            max-width: 600px;
            background: #ffffff;
            margin: 30px auto;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            text-align: center;
        }
        h1 {
            color: #333;
        }
        p {
            color: #555;
            font-size: 16px;
            line-height: 1.5;
        }
        .button {
            display: inline-block;
            background: #007bff;
            color: #ffffff;
            text-decoration: none;
            font-size: 18px;
            padding: 12px 24px;
            border-radius: 6px;
            font-weight: bold;
            margin-top: 20px;
        }
        .button:hover {
            background: #0056b3;
        }
        .footer {
            margin-top: 20px;
            font-size: 14px;
            color: #888;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <h1>Email Verification</h1>
        <p>Hi <strong>{{username}}</strong>,</p>
        <p>Thank you for signing up! Please verify your email by clicking the button below.</p>
        <a href="${domain}/verify?user={{username}}&pin={{pin}}" class="button">Verify Email</a>
        <p>If you did not create an account, please ignore this email.</p>
        <p class="footer">© ${new Date().getFullYear()} ${company}. All rights reserved.</p>
    </div>
</body>
</html>
`;

module.exports = { verifyEmail };
