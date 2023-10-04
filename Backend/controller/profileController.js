const User = require("../models/Users");
const Category = require("../models/category");
// const Packages = require("../models/package");
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

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(401).json({
        status: "error",
        message: "Send valid email and Password",
      });
    }

    let userDetails = await User.findOne({ where: { email }, raw: true });

    if (!userDetails) {
      return res
        .status(401)
        .json({ status: "error", message: "email incorrect" });
    }

    const isPassMatch = await checkPassword(
      password.trim(),
      userDetails.password
    );

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
      id: userDetails.id,
      name: userDetails.name,
      email: userDetails.email,
      userType: userDetails.userType,
      parentId: userDetails.parentId,
      status: userDetails.status,
      accessLevel: userDetails.accessLevel,
      createdAt: userDetails.createdAt,
      isPremium: userDetails.isPremium,
      subscriptionType: userDetails.subscriptionType,
    };

    res.header("Authorization", `Bearer ${token}`);
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
      .json({ status: false, data: error, message: "Login fail" });
  }
};

const addUser = async (req, res) => {
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
      { id: userDetails.id, userType: userDetails.userType },
      secretKey,
      { expiresIn }
    );

    const mailData = {
      respMail: reqBody.email,
      subject: "Welcome",
      text: `Hi, ${reqBody.name}. Welcome to OBSM`,
    };
    const mailResp = await sendMail(mailData);

    return res.status(201).json({
      status: true,
      data: response,
      mailData: mailData,
      token: token,
      message: "User successfully created!",
    });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ status: false, message: "Something went wrong" });
  }
};

const getCategory = async (req, res) => {
  try {
    const response = await Category.findAll({ raw: true });

    return res.status(200).json({
      status: 200,
      data: response,
      message: response.length ? "Successfully fetch data" : "No data found",
    });
  } catch (error) {
    console.log("error====>", error.message);
    return res
      .status(500)
      .json({ status: 500, message: "Something went wrong" });
  }
};

const forgetPass = async (req, res) => {
  try {
    const { email } = req.body;

    const userDetails = await User.findOne({
      where: { email: email }
    });
    if (!userDetails) {
      return res.status(404).json({ status: false, message: "No user found" });
    }

    const token = generateString(20);
    const saveToken = await User.update(
      { fpToken: token },
      { where: { email: email } }
    );
    // if (saveToken[0] === 0) throw "Something went wrong";

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
    <p>http://localhost:${process.env.PORT}/reset-password/${token}</p>
  </body>
</html>
`,
    };
    const mailResp = await sendMail(mailData);

    return res.status(200).json({
      status: "success",
      token: token,
      message: "Check your email for reset link",
    });
  } catch (error) {
    console.log("error===>", error);
    return res
      .status(500)
      .json({ status: false, message: "Something went wrong" });
  }
};

const fpUpdatePass = async (req, res) => {
  try {
    let reqBody = req.body;

    const { token } = req.body;

    const userInfo = await User.findOne({ where: { fpToken: token } });
    if (!userInfo) throw "Something went wrong";

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
        response[0] === 0 ? "Nothing updated" : "User successfully created!",
    });
  } catch (error) {
    console.log("error==========>", error.message);
    return res
      .status(500)
      .json({ status: 500, message: "Something went wrong" });
  }
};

const checkToken = async (req, res) => {
  try {
    let reqBody = req.body;

    const { token } = req.params;

    const userInfo = await User.findOne({ where: { fpToken: token } });
    if (!userInfo) {
      return res.status(204).json({ status: 204 });
    } else {
      return res.status(200).json({ status: 200 });
    }
  } catch (error) {
    console.log("error==========>", error.message);
    return res
      .status(500)
      .json({ status: 500, message: "Something went wrong" });
  }
};

module.exports = {
  login,
  addUser,
  getCategory,
  forgetPass,
  fpUpdatePass,
  checkToken,
};
