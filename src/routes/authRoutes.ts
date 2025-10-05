import express from "express"
import { body } from "express-validator"
import { register, login, verifyToken } from "../controllers/authController"

const router = express.Router()

router.post(
    "/register",
    [
        body("email").isEmail().normalizeEmail().withMessage("Valid email is required"),
        body("password").isLength({ min: 8 }).withMessage("Password must be at least 8 characters long"),
    ],
    register,
)

router.post(
    "/login",
    [
        body("email").isEmail().normalizeEmail().withMessage("Valid email is required"),
        body("password").notEmpty().withMessage("Password is required"),
    ],
    login,
)

router.get("/verify", verifyToken)

export default router
