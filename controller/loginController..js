import bcrypt from 'bcrypt';
import User from '../model/loginModel.js';

// Object to store active sessions
const activeSessions = {};

const userController = {
  signup: async function (req, res) {
    try {
      const { email, password } = req.body;

      // Check if the email is already registered
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'User with this email already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        email,
        password: hashedPassword,
      });

      await newUser.save();

      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error('Error during signup:', error);
      res.status(500).json({ error: 'Failed to signup' });
    }
  },

  
  logout: function (req, res) {
    try {
      const userId = req.user._id; // Assuming you have middleware to attach user information to the request object
      if (!userId || !activeSessions[userId]) {
        return res.status(404).json({ error: 'User not found or not logged in' });
      }

      // Remove the session token associated with the user
      delete activeSessions[userId];

      res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  login: async function (req, res) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid password' });
      }

      // Check if the user already has an active session
      if (activeSessions[user._id]) {
        return res.status(409).json({ error: 'User already logged in on another device' });
      }

      // Generate a session token (You can use JWT or any other session token mechanism)
      const sessionToken = generateSessionToken();

      // Store the session token for the user
      activeSessions[user._id] = sessionToken;

      const userDataToSend = {
        _id: user._id,
        email: user.email,
        sessionToken: sessionToken
      };

      res.status(200).json({
        message: 'Login successful',
        user: userDataToSend,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};

function generateSessionToken() {
  // Generate a random session token
  return Math.random().toString(36).substr(2);
}


export default userController;
