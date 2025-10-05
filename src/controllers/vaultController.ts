import type { Response } from "express"
import { validationResult } from "express-validator"
import VaultItem from "../models/VaultItem"
import type { AuthRequest } from "../types"

export const createVaultItem = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() })
            return
        }

        const { title, username, encryptedPassword, url, notes } = req.body

        const vaultItem = new VaultItem({
            userId: req.userId,
            title,
            username,
            encryptedPassword,
            url,
            notes,
        })

        await vaultItem.save()

        res.status(201).json({
            message: "Vault item created successfully",
            item: vaultItem,
        })
    } catch (error) {
        console.error("Create vault item error:", error)
        res.status(500).json({ error: "Server error creating vault item" })
    }
}

export const getVaultItems = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const page = Number.parseInt(req.query.page as string) || 1
        const limit = Number.parseInt(req.query.limit as string) || 10
        const search = (req.query.search as string) || ""

        const skip = (page - 1) * limit

        const query: any = { userId: req.userId }

        if (search) {
            query.$or = [
                { title: { $regex: search, $options: "i" } },
                { username: { $regex: search, $options: "i" } },
                { url: { $regex: search, $options: "i" } },
            ]
        }

        const total = await VaultItem.countDocuments(query)
        const items = await VaultItem.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit)

        res.json({
            items,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        })
    } catch (error) {
        console.error("Get vault items error:", error)
        res.status(500).json({ error: "Server error fetching vault items" })
    }
}

export const getVaultItem = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { id } = req.params

        const item = await VaultItem.findOne({ _id: id, userId: req.userId })

        if (!item) {
            res.status(404).json({ error: "Vault item not found" })
            return
        }

        res.json({ item })
    } catch (error) {
        console.error("Get vault item error:", error)
        res.status(500).json({ error: "Server error fetching vault item" })
    }
}

export const updateVaultItem = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() })
            return
        }

        const { id } = req.params
        const { title, username, encryptedPassword, url, notes } = req.body

        const item = await VaultItem.findOne({ _id: id, userId: req.userId })

        if (!item) {
            res.status(404).json({ error: "Vault item not found" })
            return
        }

        item.title = title
        item.username = username
        item.encryptedPassword = encryptedPassword
        item.url = url
        item.notes = notes

        await item.save()

        res.json({
            message: "Vault item updated successfully",
            item,
        })
    } catch (error) {
        console.error("Update vault item error:", error)
        res.status(500).json({ error: "Server error updating vault item" })
    }
}

export const deleteVaultItem = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { id } = req.params

        const item = await VaultItem.findOneAndDelete({
            _id: id,
            userId: req.userId,
        })

        if (!item) {
            res.status(404).json({ error: "Vault item not found" })
            return
        }

        res.json({ message: "Vault item deleted successfully" })
    } catch (error) {
        console.error("Delete vault item error:", error)
        res.status(500).json({ error: "Server error deleting vault item" })
    }
}
