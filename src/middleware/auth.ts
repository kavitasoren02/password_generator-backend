import type { Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import type { AuthRequest, JWTPayload } from "../types"

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction): void => {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "")

        if (!token) {
            res.status(401).json({ error: "Authentication required" })
            return
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || "fallback-secret") as JWTPayload

        req.userId = decoded.userId
        next()
    } catch (error) {
        res.status(401).json({ error: "Invalid or expired token" })
    }
}
