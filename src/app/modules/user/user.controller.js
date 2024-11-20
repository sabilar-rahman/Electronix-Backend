const {
  successResponse,
  errorResponse,
} = require("../../../utils/responseHandler");
const generateToken = require("../../middleware/generateToken");
const User = require("./user.model");

const userRegistration = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ message: "Email already registered" });
    }

    // Create new user
    const user = new User({ name, email, password, ...req.body });
    await user.save();

    console.log("User registered:", user);

    res.status(201).send({ message: "User registered successfully", user });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).send({ message: "Registration failed", error });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    // Check password
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).send({ message: "Invalid password" });
    }

    // Generate JWT
    const token = await generateToken(user._id);

    // set token to cookies
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    res.status(200).send({
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        bio: user.bio,
        profileImage: user.profileImage,
      },
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send({ message: "Login failed", error });
  }
};

const userLogout = async (req, res) => {
  try {
    res.clearCookie("token");
    // res.status(200).send({ message: "Logout successful" });
    successResponse(res, 200, "Logout successful");
  } catch (error) {
    // console.error("Error during logout:", error);
    // res.status(500).send({ message: "Logout failed", error });

    errorResponse(res, 500, "Logout failed", error);
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, { password: 0}).sort({ createdAt: -1 });
    // res.status(200).send({ message: "Users fetched successfully", users });
    successResponse(res, 200, "Users fetched successfully", users );
  } catch (error) {
    // console.error("Error fetching users:", error);
    // res.status(500).send({ message: "Failed to fetch users", error });

    errorResponse(res, 500, "Failed to fetch users", error);
  }
};

module.exports = {
  userRegistration,
  userLogin,
  userLogout,
  getAllUsers,
};
