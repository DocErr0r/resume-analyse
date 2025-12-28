import { prisma } from "../../lib/prisma.js";
import asyncHandler from "../../utils/asyncHandler.js";
import AppError from "../../utils/ErrorClass.js";

export const createResume = async (userId, fileUrl, text) => {
    if (!fileUrl) {
        throw new AppError("File URL is required", 403);
    }
    return await prisma.resume.create({
        data: {
            userId,
            fileUrl,
            text,
        },
    });
};

export const getResumesByUser = async (userId) => {
    return await prisma.resume.findMany({
        where: { userId },
        orderBy: { uploadedAt: 'desc' },
    });
};
export const getresumeById = async (req, id) => {
    const user = req.user;
    const resume = await prisma.resume.findUnique({
        where: { id },
    });
    if (!resume) {
        throw new AppError("Resume not found",404);
    }
    if (resume.userId !== user.id) {
        throw new AppError("Unauthorized access to resume", 403);
    }
    return resume;
};

export const deleteResumeById = async (userId, id) => {
    const resume = await prisma.resume.findFirst({
        where: { id },
    });

    if (!resume) {
        throw new AppError("Resume not found", 404);
    }
    if (resume.userId !== userId) {
        throw new AppError("Unauthorized access to resume", 403);
    }

    return await prisma.resume.delete({
        where: { id },
    })
};

