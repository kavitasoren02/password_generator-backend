import type { Request } from "express"

export interface IUser {
    _id: string
    email: string
    password: string
    createdAt: Date
    updatedAt: Date
}

export interface IVaultItem {
    _id: string
    userId: string
    title: string
    username: string
    encryptedPassword: string
    url?: string
    notes?: string
    createdAt: Date
    updatedAt: Date
}

export interface AuthRequest extends Request {
    userId?: string
}

export interface JWTPayload {
    userId: string
}
