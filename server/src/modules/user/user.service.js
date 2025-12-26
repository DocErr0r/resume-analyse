import { prisma } from "../../lib/prisma.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const getUserByEmail = async (email, password) => {
    return await prisma.user.findUnique({
        where: { email },
        omit: { password: !password }
    })
}

export const getUserById = async (id) => {
    return await prisma.user.findUnique({
        where: { id },
    })
}

export const createUser = async (name, username, email, password) => {
    const salt = await bcrypt.genSalt(10);
    const newPassword = await bcrypt.hash(password, salt);
    return await prisma.user.create({
        data: {
            name,
            username,
            email,
            password: newPassword
        }
    })
}
export const comparePassword = async (enteredPassword, hashedPassword) => {
    return await bcrypt.compare(enteredPassword, hashedPassword);
}

export const genertateToken = (res,user) => {
    const AccessToken = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRE }
    );
    // refresh token no need for small apps
    res.cookie('token', AccessToken, {
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 24 * 60 * 60 * 1000, // 1 day
    });
    return { AccessToken };
}