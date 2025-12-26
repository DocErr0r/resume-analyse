import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js";

export const authMiddleware = asyncHandler(async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "Please Login to access this resource" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ message: "Access token is invalid or expired, please login again" });
        }  
        req.user = decoded;
        next();
    } catch {
        return res.status(401).json({ message: "Invalid token" });
    }
});
