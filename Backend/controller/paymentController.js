const Stripe = require("stripe");
const appTxn = require("../models/apptxn");
const User = require("../models/Users");
const { getUserbyToken, generateRandomString } = require("../helpers/main");
require("dotenv").config();
const moment = require("moment");

const payment = async (req, res) => {
  try {
    const stripe = Stripe(process.env.stripePrivateKey);
    stripe.paymentIntents.create(
      {
        amount: parseInt(req.body.amount),
        currency: "usd",
        payment_method_types: ["card"],
      },
      function (err, paymentIntent) {
        if (err) {
          return res.status(500).json(err.message);
        } else {
          return res.status(201).json(paymentIntent);
        }
      }
    );
  } catch (error) {
    console.log("error======>", error.message);
    return res
      .status(500)
      .json({ status: 500, message: "Something went wrong" });
  }
};

const savePayment = async (req, res) => {
  const { txnId, amount, package } = req.body;
  let expiryDate = new Date().setMonth(new Date().getMonth() + 1);
  expiryDate = moment(expiryDate)
    .tz("America/Chicago")
    .format("YYYY-MM-DD, HH:mm");
  const currentDate = moment()
    .tz("America/Chicago")
    .format("YYYY-MM-DD, HH:mm");

  try {
    userdata = getUserbyToken(req);
    const txn = appTxn.build({
      txnId: txnId,
      amount: amount,
      expiry: expiryDate,
      timeStamp: currentDate,
      status: 1,
      userId: userdata.id,
    });
    txn.save().then(async () => {
      User.update(
        {
          isPremium: 1,
          subscriptionType: package,
          streamKey: generateRandomString(10),
        },
        { where: { id: userdata.id } }
      );
    });
    return res.status(200).json({
      status: 200,
      message: "Payment Succesfull",
    });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ status: 500, message: "Something went wrong" });
  }
};

module.exports = { payment, savePayment };
