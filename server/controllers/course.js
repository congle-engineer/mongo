import mongoose from "mongoose";
import Course from "../models/course.js";

// create new course
export function createCourse(req, res) {
  const course = new Course({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    description: req.body.description,
  });

  return course
    .save()
    .then((newCourse) => {
      return res.status(201).json({
        success: true,
        message: "New course created successfully",
        Course: newCourse,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Server error. Please try again.",
        error: error.message,
      });
    });
}

// Get all course
export function getAllCourse(req, res) {
  Course.find()
    .select("_id title description")
    .then((allCourse) => {
      return res.status(200).json({
        success: true,
        message: "A list of all course",
        Course: allCourse,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error. Please try again.",
        error: err.message,
      });
    });
}

// get single course
export function getSingleCourse(req, res) {
  const id = req.params.courseId;
  Course.findById(id)
    .then((singleCourse) => {
      res.status(200).json({
        success: true,
        message: `More on ${singleCourse.title}`,
        Course: singleCourse,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "This course does not exist",
        error: err.message,
      });
    });
}

// update course
export function updateCourse(req, res) {
  const id = req.params.courseId;
  const updateObject = req.body;
  Course.findByIdAndUpdate({ _id: id }, { $set: updateObject })
    .exec()
    .then(() => {
      res.status(200).json({
        success: true,
        message: "Course is updated",
        updateCourse: updateObject,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error. Please try again.",
      });
    });
}

// delete a course
export function deleteCourse(req, res) {
  const id = req.params.courseId;
  Course.findByIdAndDelete(id)
    .exec()
    .then(() =>
      res.status(204).json({
        success: true,
      })
    )
    .catch((err) =>
      res.status(500).json({
        success: false,
      })
    );
}
