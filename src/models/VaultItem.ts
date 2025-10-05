import mongoose, { Schema, type Document } from "mongoose"

export interface IVaultItemDocument extends Document {
    userId: mongoose.Types.ObjectId
    title: string
    username: string
    encryptedPassword: string
    url?: string
    notes?: string
    createdAt: Date
    updatedAt: Date
}

const VaultItemSchema: Schema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },
        title: {
            type: String,
            required: true,
            trim: true,
        },
        username: {
            type: String,
            required: true,
            trim: true,
        },
        encryptedPassword: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            trim: true,
        },
        notes: {
            type: String,
            trim: true,
        },
    },
    {
        timestamps: true,
    },
)

VaultItemSchema.index({ userId: 1, title: 1 })
VaultItemSchema.index({ userId: 1, username: 1 })

export default mongoose.model<IVaultItemDocument>("VaultItem", VaultItemSchema)
