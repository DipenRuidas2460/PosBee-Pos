const User = require("../models/Users");
const Category = require("../models/category");
const Packages = require("../models/package");
const moment = require("moment");
const { generateString, getUserbyToken } = require("../helpers/main");

const addCategory = async (req, res) => {
  try {
    let reqBody = req.body;
    // const currentDate = moment().tz("Asia/Kolkata").format("YYYY-MM-DD, HH:mm");

    const categoryDetails = await Category.create(reqBody);
    const response = await categoryDetails.save();
    return res.status(201).json({
      status: 200,
      data: response,
      message: "Category successfully created!",
    });
  } catch (error) {
    console.log("error==========>", error.message);
    return res
      .status(500)
      .json({ status: 500, message: "Something went wrong" });
  }
};

const updateCategory = async (req, res) => {
  try {
    let reqBody = req.body;

    const response = await Category.update(reqBody, {
      where: { id: reqBody.categoryId },
    });

    return res.status(201).json({
      status: response[0] === 0 ? 404 : 200,
      data: response,
      message:
        response[0] === 0
          ? "Nothing updated"
          : "Category successfully updated!",
    });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ status: 500, message: "Something went wrong" });
  }
};


module.exports = {
  addCategory,
  updateCategory,
};
