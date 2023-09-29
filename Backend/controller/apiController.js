const User = require("../models/Users");
const Category = require("../models/category");
const AppTxn = require("../models/apptxn");
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
    // const currentDate = moment().tz("Asia/Kolkata").format("YYYY-MM-DD, HH:mm");

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
    console.log("error==========>", error.message);
    return res
      .status(500)
      .json({ status: 500, message: "Something went wrong" });
  }
};

const saveTxn = async (req, res) => {
  try {
    let reqBody = req.body;
    const currentDate = moment()
      .tz("America/Chicago")
      .format("YYYY-MM-DD, HH:mm");

    const txnId = generateString(15);

    const txnDetails = await AppTxn.create({
      ...reqBody,
      txnId: txnId,
      timeStamp: currentDate,
    });
    const response = await txnDetails.save();
    return res.status(201).json({
      status: 200,
      data: response,
      message: "Txn successfully saved!",
    });
  } catch (error) {
    console.log("error==========>", error.message);
    return res
      .status(500)
      .json({ status: 500, message: "Something went wrong" });
  }
};

const getTxn = async (req, res) => {
  try {
    const response = await AppTxn.findAll({ raw: true });

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

const getPackages = async (req, res) => {
  try {
    const response = await Packages.findAll({ raw: true });

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

const getPackagesById = async (req, res) => {
  try {
    const { id } = req.params;

    const response = await Packages.findByPk(id);

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

const ping = async (req, res) => {
  try {
    const userdata = getUserbyToken(req);
    let response = await User.findOne({
      where: { id: userdata.id },
      attributes: [
        "id",
        "name",
        "email",
        "status",
        "isPremium",
        "subscriptionType",
      ],
    });
    if (response) {
      return res
        .status(200)
        .json({ status: 200, data: response, message: "Data Fetched" });
    } else {
      return res.status(404).json({ status: 204, message: "No Data" });
    }
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
  saveTxn,
  getTxn,
  getPackages,
  getPackagesById,
  ping,
};
