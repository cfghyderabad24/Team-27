// Example userController.js

const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");

const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(200).json({ success: true, users });
  } catch (error) {
    console.error("Error in getAllUsers:", error);
    res.status(500).json({ success: false, message: "Error fetching users" });
  }
};

const registerController = async (req, res) => {
  try {
    const { username, grade, rollno, password } = req.body;

    // Validation
    if (!username || !grade || !rollno || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the fields",
      });
    }

    // Check if user already exists
    const existingUser = await userModel.findOne({ rollno });
    if (existingUser) {
      return res.status(401).json({
        success: false,
        message: "User already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save new user
    const user = new userModel({
      username,
      grade,
      rollno,
      password: hashedPassword,
    });
    await user.save();

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        _id: user._id,
        username: user.username,
        grade: user.grade,
        rollno: user.rollno,
      },
    });
  } catch (error) {
    console.error("Error in registerController:", error);
    return res.status(500).json({
      success: false,
      message: "Error in registerController",
      error: error.message,
    });
  }
};

const loginController = async (req, res) => {
  try {
    const { rollno, password } = req.body;

    // Validation
    if (!rollno || !password) {
      return res.status(401).json({
        success: false,
        message: "Please provide roll number and password",
      });
    }

    // Check if user exists
    const user = await userModel.findOne({ rollno });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        _id: user._id,
        username: user.username,
        grade: user.grade,
        rollno: user.rollno,
      },
    });
  } catch (error) {
    console.error("Error in loginController:", error);
    return res.status(500).json({
      success: false,
      message: "Error in loginController",
      error: error.message,
    });
  }
};

module.exports = { getAllUsers, registerController, loginController };
