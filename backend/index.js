const express = require("express");
const app = express();
const cors = require("cors");
const { default: axios } = require("axios");
const mongoose = require("mongoose");
const router = require("./Routes/userRouter");
const { generateOTP } = require("./utils");
const orderRouter = require("./Routes/OrderRoute");
const courseRouter = require("./Routes/courseRoute");
const bodyParser = require("body-parser");
const path = require("path");

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(router);
app.use(orderRouter);
app.use(courseRouter);

mongoose.connect("mongodb://localhost:27017/MobileLms").then(() => {
  console.log("db connected");
});

console.log(generateOTP());

app.post("/getotp", async (req, res) => {
  try {
    const response = await axios.post(
      `https://dev.vdocipher.com/api/videos/${req.body.videoid}/otp `,
      { ttl: 300 },
      {
        headers: {
          Authorization: `Apisecret ee9hNed3zH1KwseLiaTKyW6O9M0qN4amD0xRjiEtwPU3WlHsimVx6roPr85ZkmpW`,
        },
      }
    );

    return res.send({
      success: true,
      message: "video url refresh",
      videoData: response.data,
    });
  } catch (error) {
    return res.send({ success: false, message: error.message });
  }
});

app.listen(8000, () => {
  console.log("port running on 8000");
});
