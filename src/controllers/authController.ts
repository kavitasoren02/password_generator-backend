import type { Request, Response } from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { validationResult } from "express-validator"
import User from "../models/User"

export const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() })
            return
        }

        const { email, password } = req.body

        const existingUser = await User.findOne({ email })
        if (existingUser) {
            res.status(400).json({ error: "User already exists" })
            return
        }

        const hashedPassword = await bcrypt.hash(password, 12)

        const user = new User({
            email,
            password: hashedPassword,
        })

        await user.save()

        const token = jwt.sign({ userId: user._id?.toString() }, process.env.JWT_SECRET || "fallback-secret", {
            expiresIn: "7d",
        })

        res.status(201).json({
            message: "User created successfully",
            token,
            user: {
                id: user._id,
                email: user.email,
            },
        })
    } catch (error) {
        console.error("Register error:", error)
        res.status(500).json({ error: "Server error during registration" })
    }
}

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() })
            return
        }

        const { email, password } = req.body

        const user = await User.findOne({ email })
        if (!user) {
            res.status(401).json({ error: "Invalid credentials" })
            return
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            res.status(401).json({ error: "Invalid credentials" })
            return
        }

        const token = jwt.sign({ userId: user._id?.toString() }, process.env.JWT_SECRET || "fallback-secret", {
            expiresIn: "7d",
        })

        res.json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                email: user.email,
            },
        })
    } catch (error) {
        console.error("Login error:", error)
        res.status(500).json({ error: "Server error during login" })
    }
}

export const verifyToken = async (req: Request, res: Response): Promise<void> => {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "")

        if (!token) {
            res.status(401).json({ error: "No token provided" })
            return
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || "fallback-secret") as { userId: string }

        const user = await User.findById(decoded.userId).select("-password")
        if (!user) {
            res.status(401).json({ error: "User not found" })
            return
        }

        res.json({
            user: {
                id: user._id,
                email: user.email,
            },
        })
    } catch (error) {
        res.status(401).json({ error: "Invalid token" })
    }
}
