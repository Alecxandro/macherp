import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import { hashPassword } from '../utils/helperfunctions.js'
import * as dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import { authorizationAction } from '../utils/helperfunctions.js'

dotenv.config()

export const loginUser = async (req, res) => {
    const { username, password } = req.body

    try {
        const user = await User.findOne({ username })
        if (!user) return res.status(401).json({ message: 'User not found' })

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' })

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        })
        return res.json({ user, token })
    } catch (error) {
        res.status(500).json({
            message: `Server error. Details: ${error.message}`,
        })
    }
}

export const createUser = async (req, res) => {
    const { username, email, password } = req.body
    const newPassword = await hashPassword(password)
    const newUser = new User({ username, email, password: newPassword })
    console.log('Inside')
    try {
        await newUser.save()
        res.status(201).json({
            message: `User created successfully: ${newUser.username}`,
        })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

export const getUser = async (req, res) => {
    const user = await authorizationAction(req, res, User)
    if (!user) return res.status(403).json({ Error: 'User not found' })

    try {
        const userJson = await User.find(user._id)
        return res.status(200).json(userJson)
    } catch (error) {
        return res.status(403).json({ Error: `${error.message}` })
    }
}

export const getUsers = async (req, res) => {
    try {
        if (req.user.isAdmin) {
            const users = await User.find()
            return res.status(200).json(users)
        }

        res.status(401).json({ message: 'Only admins can fetch other users data.' })
    } catch (error) {
        res.status(500).json({
            message: `Server error. Details: ${error.message}`,
        })
    }
}

export const updateUser = async (req, res) => {
    const user = await authorizationAction(req, res, User)
    if (!user)
        return res
            .status(403)
            .json({ Error: 'User not found or you not allowed to change other users data' })

    try {
        const updatedUser = await User.findByIdAndUpdate(user._id, req.body, {
            new: true,
        })

        return res.status(200).json(updatedUser)
    } catch (error) {
        return res.status(500).json({ ErrorDetails: error.message })
    }
}

export const deleteUser = async (req, res) => {
    if (req.user.isAdmin) {
        try {
            const user = await User.findById(req.params.id)
            await User.findByIdAndDelete(user._id)
            return res.status(200).json({ message: `User deleted successfully: ${user}` })
        } catch (error) {
            return res.status(500).json({ ErrorDetails: error.message })
        }
    }

    return res.status(401).json({Error: 'You cannot delete other user profile. Only admin can perform this action.'})
}
