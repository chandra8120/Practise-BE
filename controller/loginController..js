import Login from "../model/loginModel.js";
import bcrypt from 'bcrypt';

const loginController = {
    signup: async (req, res) => {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({ message: "Email and password are required" });
            }
            const existingUser = await Login.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: "User already exists" });
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new Login({ email, password: hashedPassword });
            const savedUser = await newUser.save();
            res.status(201).json({ message: "Signup successful", user: savedUser });
        } catch (error) {
            console.error('Error in signup:', error);
            res.status(500).json({ error: "Internal server error" });
        }
    },
   
        
    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await Login.findOne({ email });
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(400).json({ message: "Invalid password" });
            }

            // Check if the user is already logged in from another device
            if (user.sessionToken) {
                // Optionally, you can invalidate the previous session token here
                // You can remove the session token from the user document or store it in a blacklist
                // This depends on your application's requirements
                // For simplicity, I'm assuming here that the previous token is being invalidated
                user.sessionToken = null;
                await user.save();
            }

            // Generate a new session token and save it to the user document
            const sessionToken = generateSessionToken();
            user.sessionToken = sessionToken;
            await user.save();

            res.status(200).json({ message: "Login successful", user });
        } catch (error) {
            console.error('Error in login:', error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
};



// Function to generate session token
function generateSessionToken() {
    // Generate a random token using any method you prefer
    // For simplicity, you can use libraries like 'uuid' to generate unique tokens
    // Example using 'uuid':
    // const { v4: uuidv4 } = require('uuid');
    // const sessionToken = uuidv4();
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

export default loginController;
