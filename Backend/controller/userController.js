const { encryptPassword } = require("../helpers/main");
const User = require("../models/users");
const { checkPassword } = require("../helpers/main");
const asyncHandler = require("express-async-handler");

const updateUser = asyncHandler(async (req, res) => {
  try {
    let reqBody = req.body;

    if (reqBody.password) {
      reqBody.password = await encryptPassword(reqBody.password);
    }

    const response = await User.update(reqBody, {
      where: { id: req.user.id },
    });

    return res.status(201).json({
      status: response[0] === 0 ? 404 : 200,
      data: response,
      message:
        response[0] === 0 ? "Nothing updated" : "Successfully Updated!",
    });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ status: 500, message: "Something went wrong" });
  }
});

const getUserById = asyncHandler(async (req, res) => {
  try {
    const response = await User.findOne({
      where: { id: req.user.id },
      attributes: [
        "id",
        'fullName',
        "email",
        "role",
        "phoneNumber",
        "photo",
      ],
    });

    return res.status(200).json({
      status: "success",
      data: response,
      message: response.length
        ? "Successfully fetch data"
        : "User Not Present!",
    });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ status: 500, message: "Something went wrong" });
  }
});

const getAllUsers = async (req, res) => {
  try {
    const response = await User.findAll({ raw: true });

    return res.status(200).json({
      status: "success",
      data: response,
      message: response.length ? "Successfully fetch data" : "No data found",
    });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ status: 500, message: "Something went wrong" });
  }
};

const updatePassword = asyncHandler(async (req, res) => {
  try {
    const response = await User.findOne({ where: { id: req.user.id } });

    const { oldPassword, password } = req.body;

    if (!response) {
      return res.status(404).json({
        status: false,
        message: "User not Found, Please Register first!",
      });
    }

    if (!oldPassword || !password) {
      return res
        .status(400)
        .json({ status: false, message: "Please add Old and new password!" });
    }

    const isPassMatch = await checkPassword(
      oldPassword.trim(),
      response.password
    );

    if (response && isPassMatch) {
      response.password = password;
      await response.save();
      return res.status(200).send({
        status: true,
        data: response,
        message: "password changed successfully!",
      });
    } else {
      return res
        .status(400)
        .send({ status: false, message: "oldPassword is incorrect!!" });
    }
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ status: 500, message: "Something went wrong" });
  }
});

module.exports = {
  updateUser,
  getUserById,
  updatePassword,
  getAllUsers
};
