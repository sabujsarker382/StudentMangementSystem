const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const router = express.Router();

//  adding student
router.post("/add", async (req, res) => {
  const { name, email, password, role = "student" } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const student = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });
    await student.save();
    res.status(201).json({ message: "Student added successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error adding student" });
  }
});

// Get All Students
router.get("/", async (req, res) => {
  try {
    const students = await User.find({ role: "student" });
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: "Error fetching students" });
  }
});

// Delete a Student
router.delete("/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "Student deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting student" });
  }
});

module.exports = router;
