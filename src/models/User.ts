import mongoose, { Schema, type Document } from "mongoose"

export interface IUserDocument extends Document {
    email: string
    password: string
    createdAt: Date
    updatedAt: Date
}

const UserSchema: Schema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    },
)

export default mongoose.model<IUserDocument>("User", UserSchema)
