const User = require("../models/users");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const {
  checkPassword,
  encryptPassword,
  generateString,
} = require("../helpers/main");
const moment = require("moment");
const { sendMail } = require("../helpers/sendMail");

const secretKey = process.env.TOKEN_secret_key;
const expiresIn = "24h";

const addUser = asyncHandler(async (req, res) => {
  try {
    const reqBody = req.body;

    const currentDate = moment().tz("Asia/Kolkata").format("YYYY-MM-DD, HH:mm");

    const findEmail = await User.findOne({ where: { email: reqBody.email } });

    const findPhoneNumber = await User.findOne({
      where: { phoneNumber: reqBody.phoneNumber },
    });

    if (findEmail) {
      return res
        .status(409)
        .json({ status: "email conflict", msg: "Email is already present!" });
    }

    if (findPhoneNumber) {
      return res.status(409).json({
        status: "phone conflict",
        msg: "Phone Number is already present!",
      });
    }

    reqBody.password = await encryptPassword(reqBody.password);

    const userDetails = await User.create({
      ...reqBody,
      createdTime: currentDate,
    });
    const response = await userDetails.save();

    const token = jwt.sign(
      { id: userDetails.id, userType: userDetails.role },
      secretKey,
      { expiresIn }
    );

    const mailData = {
      respMail: reqBody.email,
      subject: "Welcome",
      text: `Hi, ${reqBody.name}. Welcome to Olx Clone Website`,
    };
    await sendMail(mailData);

    if (response) {
      const { id, fullName, email, phoneNumber, role } = response;
      res.header("Authorization", `Bearer ${token}`);
      res.cookie("token", token, {
        path: "/",
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 86400),
      });
      return res.status(201).json({
        status: true,
        id,
        fullName,
        email,
        phoneNumber,
        role,
        token,
        message: "User successfully created!",
      });
    } else {
      return res
        .status(400)
        .json({ status: false, message: "User is not created!" });
    }
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ status: false, message: "Something went wrong" });
  }
});

const login = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(401).json({
        status: "error",
        message: "Send valid email and Password",
      });
    }

    const userDetails = await User.findOne({ where: { email: email } });

    if (!userDetails) {
      return res
        .status(401)
        .json({ status: "error", message: "email incorrect" });
    }

    const isPassMatch = await checkPassword(password, userDetails.password);

    if (!isPassMatch) {
      return res
        .status(401)
        .json({ status: "error", message: "Incorrect password, try again" });
    }

    const token = jwt.sign(
      { id: userDetails.id, userType: userDetails.userType },
      secretKey,
      { expiresIn }
    );
    const data = {
      userId: userDetails.id,
      fullName: userDetails.fullName,
      email: userDetails.email,
      role: userDetails.role,
      phoneNumber: userDetails.phoneNumber,
      token: userDetails.token,
    };

    res.header("Authorization", `Bearer ${token}`);
    res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 86400),
    });
    return res.status(200).json({
      status: "success",
      token,
      userdata: data,
      message: "Login successfull",
    });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ status: false, data: error.message, message: "Login fail" });
  }
});

const logOut = asyncHandler(async (req, res) => {
  try {
    res.cookie("token", "", {
      path: "/",
      httpOnly: true,
      expires: new Date(0),
    });
    return res.status(200).json({
      status: true,
      msg: "Successfully Logged Out!",
    });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ status: false, data: error.message, message: "LogOut Failed!" });
  }
});

const getLoginStatus = asyncHandler(async (req, res) => {
  try {
    let token = req.cookies.token;
    const secretKey = process.env.TOKEN_secret_key;
    if (!token) {
      return res.status(401).json(false);
    }
    const decodedToken = jwt.verify(token, secretKey);
    if (decodedToken) {
      return res.status(200).json(true);
    }
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ status: false, message: err.message });
  }
});

const forgetPass = asyncHandler(async (req, res) => {
  try {
    const { email } = req.body;

    const userDetails = await User.findOne({
      where: { email: email },
    });
    if (!userDetails) {
      return res.status(404).json({ status: false, message: "No user found" });
    }

    const token = generateString(20);
    await User.update(
      { fpToken: token },
      { where: { email: email } }
    );

    const mailData = {
      respMail: email,
      subject: "Forget Password",
      text: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <link rel="stylesheet" href="styles.css" />
    <title>Static Template</title>
  </head>
  <body>
    <h3>Click this link for changing Password</h3>
    <p>http://localhost:3000/resetpass/${token}</p>
  </body>
</html>
`,
    };
    await sendMail(mailData);

    return res.status(200).json({
      status: "success",
      token: token,
      message: "Check your email for reset link",
    });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ status: false, message: "Something went wrong" });
  }
});

const fpUpdatePass = asyncHandler(async (req, res) => {
  try {
    let reqBody = req.body;

    const { token } = req.body;

    const userInfo = await User.findOne({ where: { fpToken: token } });
    if (!userInfo)
      return res
        .status(400)
        .json({ status: 400, message: "Wrong link or link expired!" });

    if (reqBody.password) {
      reqBody.password = await encryptPassword(reqBody.password);
    }

    const response = await User.update(
      { password: reqBody.password },
      {
        where: { fpToken: token },
      }
    );

    return res.status(201).json({
      status: response[0] === 0 ? 404 : 200,
      data: response,
      message:
        response[0] === 0
          ? "Nothing updated"
          : "User Password changed successfully!",
    });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ status: 500, message: "Something went wrong" });
  }
});

const checkToken = asyncHandler(async (req, res) => {
  try {
    const { token } = req.params;

    const userInfo = await User.findOne({ where: { fpToken: token } });
    if (!userInfo) {
      return res.status(204).json({ status: 204 });
    } else {
      return res.status(200).json({ status: 200 });
    }
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ status: 500, message: "Something went wrong" });
  }
});

module.exports = {
  login,
  addUser,
  forgetPass,
  fpUpdatePass,
  checkToken,
  logOut,
  getLoginStatus,
};
