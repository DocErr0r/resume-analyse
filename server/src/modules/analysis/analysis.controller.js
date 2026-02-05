import { prisma } from "../../lib/prisma.js";
import asyncHandler from "../../utils/asyncHandler.js";
import AppError from "../../utils/ErrorClass.js";
import * as analysisService from "./analysis.service.js";

export const createAnalysis = asyncHandler(async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { resumeId, jobId } = req.body;
        const resume = await prisma.resume.findFirst({
            where: { id: resumeId, userId },
        });
        if (!resume) {
            throw new AppError("Resume not found or does not belong to user", 404);
        }
        const job = await prisma.jobDescription.findFirst({
            where: { id: jobId, userId },
        });
        if (!job) {
            throw new AppError("Job description not found or does not belong to user", 404);
        }

        const exist= await analysisService.getExistAnalysis()
        if(exist){
            res.status(200).json({
                success: true,
                message:"Using this resume and Job description output already generated.",
                data: exist,
            });
        }
        const aiResult = await analysisService.generateAnalysis(resume, job);

        const analysis = await analysisService.createAnalysis(userId, resumeId, jobId, aiResult,)

        res.status(200).json({
            success: true,
            data: analysis,
        });
    } catch (error) {
        next(error);
    }


});

export const getAnalyses = asyncHandler(async (req, res, next) => {
    try {
        const userId = req.user.id;
        const analyses = await analysisService.getAnalysesByUser(userId);
        res.status(200).json({
            success: true,
            data: analyses,
        });
    } catch (error) {
        next(error);
    }
});

export const getAnalysesByUser = async (userId) => {
    return await prisma.analysis.findMany({
        where: { userId },
        include: {
            resume: true,
            job: true,
        },
        orderBy: { createdAt: 'desc' },
    });
};

export const getAnalysisById = async (userId, id) => {
    const analysis = await prisma.analysis.findUnique({
        where: { id },
        include: {
            resume: true,
            job: true,
        },
    });
    if (!analysis) {
        throw new AppError("Analysis not found", 404);
    }
    if (analysis.userId !== userId) {
        throw new AppError("Unauthorized access to analysis", 403);
    }
    return analysis;
};
