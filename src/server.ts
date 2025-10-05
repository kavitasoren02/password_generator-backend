import express, { type Application, type Request, type Response } from "express"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./config/database"
import authRoutes from "./routes/authRoutes"
import vaultRoutes from "./routes/vaultRoutes"

dotenv.config()

const app: Application = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

connectDB()

app.get("/api/helth", (req: Request, res: Response) => {
    res.json({ message: "Password Vault API is running" })
})

app.use("/api/auth", authRoutes)
app.use("/api/vault", vaultRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
