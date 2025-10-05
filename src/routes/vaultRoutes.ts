import express from "express"
import { body } from "express-validator"
import {
    createVaultItem,
    getVaultItems,
    getVaultItem,
    updateVaultItem,
    deleteVaultItem,
} from "../controllers/vaultController"
import { authMiddleware } from "../middleware/auth"

const router = express.Router()

router.use(authMiddleware)

router.post(
    "/",
    [
        body("title").notEmpty().trim().withMessage("Title is required"),
        body("username").notEmpty().trim().withMessage("Username is required"),
        body("encryptedPassword").notEmpty().withMessage("Password is required"),
    ],
    createVaultItem,
)

router.get("/", getVaultItems)

router.get("/:id", getVaultItem)

router.put(
    "/:id",
    [
        body("title").notEmpty().trim().withMessage("Title is required"),
        body("username").notEmpty().trim().withMessage("Username is required"),
        body("encryptedPassword").notEmpty().withMessage("Password is required"),
    ],
    updateVaultItem,
)

router.delete("/:id", deleteVaultItem)

export default router
