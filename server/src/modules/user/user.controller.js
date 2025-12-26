
import asyncHandler from "../../utils/asyncHandler.js";
import * as userService from "./user.service.js";


export const registerUser = asyncHandler(async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const existUser = await userService.getUserByEmail(email, false);
        if (existUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const user = await userService.createUser(name, email, password);
        res.status(201).json({
            success: true,
            data: { user },
            message: "User registered successfully",
        });
    } catch (error) {
        next(error);
    }
});

export const loginUser = asyncHandler(async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await userService.getUserByEmail(email, true);
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const isMatch = await userService.comparePassword(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        userService.genertateToken(res, user);
        delete user.password;
        res.status(200).json({
            success: true,
            message: "User logged in successfully",
        });
    } catch (error) {
        next(error);
    }
});

export const logoutUser = asyncHandler(async (req, res, next) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
        });
        res.status(200).json({
            success: true,
            message: "User logged out successfully",
        });
    } catch (error) {
        next(error);
    }
});

export const getMe = asyncHandler(async (req, res, next) => {
    try {
        const user = await userService.getUserById(req.user.id);
        res.status(200).json({
            success: true,
            data: { user },
            message: "User profile fetched successfully",
        });
    } catch (error) {
        next(error);
    }
});