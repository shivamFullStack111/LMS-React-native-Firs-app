const express = require("express");
const router = express.Router();
const cloudinary = require("cloudinary").v2;
const bcrypt = require("bcrypt");
const Users = require("../schemas/userSchema");
const jwt = require("jsonwebtoken");
const { transporter } = require("../middlewares/nodemailer");
require("dotenv").config();
const { generateOTP } = require("../utils");
const fs = require("fs");
const path = require("path");
const isauthenticated = require("../middlewares/isauthenticated");
const multer = require("multer");

cloudinary.config({
  cloud_name: "dyvoxcqpt",
  api_key: "531256787311845",
  api_secret: "PqWTxeO6qWUugg7380bVOAlIswg", // Click 'View Credentials' below to copy your API secret
});

const upload = multer({
  storage: multer.diskStorage({}),
  limits: { fileSize: 50000000 },
});

router.post("/register", upload.single("image"), async (req, res) => {
  try {
    console.log('register')
    const { name, email, password } = req.body;

    const isexist = await Users.findOne({ email: email, isvarified: true });
    if (isexist)
      return res.send({ success: false, message: "user already registered" });

    const hashPassword = await bcrypt.hash(password, 10);

    const otp = generateOTP();

    const dataToken = await jwt.sign(
      {
        user: {
          name: name,
          email: email,
          password: hashPassword,
          image: req.file.path,
        },
      },
      process.env.JWT_SECRET,
      { expiresIn: "10m" }
    );

    let htmlTemplate = fs.readFileSync(
      path.join(__dirname, "card.html"),
      "utf8"
    );

    let updatehtml = htmlTemplate.replace("{{otp}}", otp);
    const info = await transporter.sendMail({
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "OTP to register in lms",
      text: "Welcome to LMS enter the otp to continue our lms system", // plain text body
      html: updatehtml, // html body
    });

    const isUserHaveOldOtp = await Users.findOne({ email, isvarified: false });
    if (!isUserHaveOldOtp) {
      const newuser = await Users({
        otp: otp,
        email: email,
      }).save();
    } else {
      isUserHaveOldOtp.otp = otp;
      await isUserHaveOldOtp.save();
    }

    return res.send({
      success: true,
      message: "otp send to your email",
      dataToken,
    });
  } catch (error) {
    return res.send({ success: false, message: error.message });
  }
});

router.post("/verify-otp", upload.single("image"), async (req, res) => {
  try {
    const { dataToken, otp } = req.body;

    if (!dataToken || !otp)
      return res.send({
        success: false,
        message: "data token and otp is required",
      });

    const { user } = await jwt.verify(dataToken, process.env.JWT_SECRET);

    if (!user) return res.send({ success: false, message: "token is expired" });

    const isuser = await Users.findOne({ email: user.email });

    if (isuser.isvarified)
      return res.send({ success: false, message: "user already registered" });
    if (isuser.otp == otp) {
      const result = await cloudinary.uploader.upload(user.image);
      console.log(result);
      (isuser.image = result.secure_url),
        (isuser.password = user.password),
        (isuser.name = user.name),
        (isuser.email = user.email);
      isuser.isvarified = true;

      await isuser.save();
      return res.send({ success: true, message: "registration successful" });
    } else {
      return res.send({ success: false, message: "otp is invalid" });
    }
  } catch (error) {
    return res.send({ success: false, message: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.send({ success: false, message: "all fields are required" });

    const isuser = await Users.findOne({ email: email, isvarified: true });

    if (!isuser)
      return res.send({ success: false, message: "user not registered" });

    const ispassmatch = await bcrypt.compare(password, isuser.password);

    if (!ispassmatch)
      return res.send({ success: false, message: "password is incorrect" });

    const token = await jwt.sign({ user: isuser }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return res.send({
      success: true,
      message: "Login successful",
      token: token,
    });
  } catch (error) {
    return res.send({ success: false, message: error.message });
  }
});

router.get("/isauthenticated", isauthenticated, async (req, res) => {
  try {
    const isuser = await Users.findOne({
      email: req.user.email,
      isvarified: true,
    });

    if (!isuser)
      return res.send({
        success: false,
        message: "user not found please login to continue",
      });

    return res.send({
      success: true,
      message: "user is authenticated",
      user: isuser,
    });
  } catch (error) {
    return res.send({ success: false, message: error.message });
  }
});

router.get("/getAllUser", isauthenticated, async (req, res) => {
  try {
    const isuser = await Users.findOne({ _id: req.user._id });
    if (!isuser) return res.send({ success: false, message: "User not found" });

    if (!isuser.isadmin)
      return res.send({
        success: false,
        message: "only admin can access this",
      });

    const users = await Users.find().select("-password");

    return res.send({ success: true, message: "all users found", users });
  } catch (error) {
    return res.send({ success: false, message: error.message });
  }
});

module.exports = router;
