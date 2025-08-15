import User from "../models/User.js"
import jwt from "jsonwebtoken"

const generateToken = (user) => {
  return jwt.sign({ id: user, role: 'super_admin' }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

// Login admin
export const login = async (req, res) => {
  try {
    console.log(req.email);
    
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    res.json({ token: generateToken(user._id) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};