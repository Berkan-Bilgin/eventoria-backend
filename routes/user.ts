import express from "express";
import { loginUser, signupUser } from "../controllers/userController";

// controller functions

const router = express.Router();

// login route
router.post("/login", loginUser);

// signup route
router.post("/signup", signupUser);

export default router;
