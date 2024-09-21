const express = require("express");
const isauthenticated = require("../middlewares/isauthenticated");
const Users = require("../schemas/userSchema");
const Courses = require("../schemas/courseSchema");

const router = express.Router();

router.post("/create-course", isauthenticated, async (req, res) => {
  try {
    console.log(req.body);
    const isuser = await Users.findOne({
      email: req.user.email,
      isvarified: true,
    });

    if (!isuser) return res.send({ success: false, message: "user not found" });

    if (!isuser.isadmin)
      return res.send({
        success: false,
        message: "only admin can create course",
      });

    const newCourse = await Courses(req.body).save();

    return res.send({
      success: true,
      message: "course created successfully",
      course: newCourse,
    });
  } catch (error) {
    console.log(error.message);
    return res.send({ success: false, message: error.message });
  }
});

router.get("/get-all-courses", async (req, res) => {
  try {
    const courses = await Courses.find().select("-section.videoData");

    return res.send({ success: true, message: "courses found", courses });
  } catch (error) {
    return res.send({ success: false, message: error.message });
  }
});
router.post("/getCourse-for-purchased", async (req, res) => {
  try {
    const course = await Courses.findOne({ _id: req.body.courseid });

    return res.send({ success: true, message: "courses found", course });
  } catch (error) {
    return res.send({ success: false, message: error.message });
  }
});

router.post("/send-question", async (req, res) => {
  try {
    const { question, courseid, user } = req.body;
    console.log(req.body);

    const course = await Courses.findOne({ _id: courseid });

    course.question = [...course.question, { question, replies: [], user }];

    await course.save();

    return res.send({ success: true, message: "question send " });
  } catch (error) {
    console.log(error.message);
    return res.send({ success: false, message: error.message });
  }
});

router.post("/send-reply", async (req, res) => {
  try {
    const { courseid, questionid, user, reply } = req.body;

    const course = await Courses.findOne({ _id: courseid });

    const question = course.question.find((qus) => qus._id == questionid);

    question.replys = [...question.replys, { reply, user }];

    course.question = course.question.map((qus) => {
      if (qus._id === question._id) return question;
      else return qus;
    });

    await course.save();

    return res.send({ success: true, message: "reply send" });
  } catch (error) {
    return res.send({ success: false, message: error.message });
  }
});
module.exports = router;
