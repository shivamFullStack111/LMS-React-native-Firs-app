const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    title: String,
    price: Number,
    estimateprice: Number,
    coursedetail: String,
    section: Array,
    demourl: String,
    coursesources: Object,
    thumbnail: String,
    totalpurchase: {
      type: Number,
      default: 0,
    },
    rating: Number,
    reviews: [
      {
        user: Object,
        reviewmessage: String,
        rating: Number,
      },
    ],
    question: [
      {
        user: Object,
        question: String,
        replys: [
          {
            reply: String,
            user: Object,
            createdAt: {
              type: Date,
              default: new Date(Date.now()),
            },
          },
        ],
        createdAt: {
          type: Date,
          default: Date.now(),
        },
      },
    ],
  },
  { timestamps: true }
);

const Courses = mongoose.model("courses", courseSchema);

module.exports = Courses;
