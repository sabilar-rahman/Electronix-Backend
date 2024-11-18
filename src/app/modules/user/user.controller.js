const User = require('./user.model')

exports. userRegistration = async (req, res) => {
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


