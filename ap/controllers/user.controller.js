import User from "../models/User.js";
import bcrypt from 'bcryptjs'
import { hashPassword } from '../utils/helperfunctions.js';
import * as dotenv from 'dotenv'
import jwt from 'jsonwebtoken';

dotenv.config();

export const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username});
        if (!user) return res.status(401).json({ message: 'User not found' });
        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h'});
        return res.json({ user, token });
    } catch (error) {
        res.status(500).json({ message: `Server error. Details: ${ error.message }` });
    }
}

export const createUser = async (req, res) => {
    const { username, email, password } = req.body;
    const newPassword =  await hashPassword(password)
    const newUser = new User({ username, email, password: newPassword });
    console.log('Inside');
    try {
        await newUser.save();
        res.status(201).json({ message: `User created successfully: ${newUser.username}` });
    } catch (error) {
        res.status(400).json({ message: error.message} );

    }
}

export const userProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
        if (user) return res.json({message: `User logged: ${ user.username }`})
        
        res.status(404).json({ message: 'User not found' });    

    } catch (error) {
        res.status(500).json({ message: `Server error. Details: ${ error.message }`})
    }
}

export const getUsers = async (req, res) => {
    try {
        if (req.user.isAdmin) {
            const users = await User.find();
            return res.json(users);
        }
        
        res.json({ message: 'Only admins can access this page.' });
        
    } catch (error) {
        res.status(500).json({ message: `Server error. Details: ${error.message}` });
    }
}

