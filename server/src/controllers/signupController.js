const signupModel = require('../models/signupModel');

const signUp = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Check if all fields are provided
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ error: 'Please fill in all the fields' });
    }

    // Check if the email is already registered
    const existingUser = await signupModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: 'Email already registered' });
    }

    // Create a new user
    const newUser = new signupModel({ firstName, lastName, email, password });

    // Save the user to the database
    const savedUser = await newUser.save();
    return res.status(201).json(savedUser);
  } catch (error) {
    return res.status(500).json({ error: 'An error occurred' });
  }
};



const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({ error: 'Please provide email and password' });
    }

    // Find the user by email
    const user = await signupModel.findOne({ email: email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Login successful
    return res.status(200).json({ message: 'Login successful' });

  } catch (error) {
    return res.status(500).json({ error: 'An error occurred' });
  }
};





module.exports = { signUp ,login};
