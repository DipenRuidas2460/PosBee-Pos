const { encryptPassword } = require("../helpers/main");
const User = require("../models/Users");
const moment = require("moment");

const updateUser = async (req, res) => {
  try {
    let reqBody = req.body;
    // const currentDate = moment().tz("Asia/Kolkata").format("YYYY-MM-DD, HH:mm");

    if (reqBody.password) {
      reqBody.password = await encryptPassword(reqBody.password);
    }

    const response = await User.update(reqBody, {
      where: { id: reqBody.userId },
    });

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

const getUsers = async (req, res) => {
  try {
    const response = await User.findAll({ raw: true });

    return res.status(200).json({
      status: "success",
      data: response,
      message: response.length ? "Successfully fetch data" : "No data found",
    });
  } catch (error) {
    console.log("error=======>", error.message);
    return res
      .status(500)
      .json({ status: 500, message: "Something went wrong" });
  }
};

module.exports = {
  updateUser,
  getUsers,
};
