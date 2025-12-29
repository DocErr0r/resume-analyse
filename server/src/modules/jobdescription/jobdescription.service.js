import { prisma } from "../../lib/prisma.js";
import AppError from "../../utils/ErrorClass.js";

export const createJobDescription = async (userId, title, company, description) => {
    if (!description) {
        throw new AppError("Description is required", 400);
    }
    return await prisma.jobDescription.create({
        data: {
            userId,
            title,
            company,
            description,
        },
    });
};

export const getJobDescriptionsByUser = async (userId) => {
    return await prisma.jobDescription.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
    });
};

export const getJobDescriptionById = async (req, id) => {
    const user = req.user;
    const jobDescription = await prisma.jobDescription.findUnique({
        where: { id },
    });
    if (!jobDescription) {
        throw new AppError("Job description not found", 404);
    }
    if (jobDescription.userId !== user.id) {
        throw new AppError("Unauthorized access to job description", 403);
    }
    return jobDescription;
};


export const deleteJobDescriptionById = async (userId, id) => {
    const jobDescription = await prisma.jobDescription.findFirst({
        where: { id },
    });

    if (!jobDescription) {
        throw new AppError("Job description not found", 404);
    }
    if (jobDescription.userId !== userId) {
        throw new AppError("Unauthorized access to job description", 403);
    }

    return await prisma.jobDescription.delete({
        where: { id },
    });
};
