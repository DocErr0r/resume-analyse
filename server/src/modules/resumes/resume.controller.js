import asyncHandler from "../../utils/asyncHandler.js";
import * as resumeService from "./resume.service.js";

export const uploadResume = asyncHandler(async (req, res, next) => {
    try {
        const { fileUrl, text } = req.body;
        const userId = req.user.id;


        const resume = await resumeService.createResume(userId, fileUrl, text);
        res.status(200).json({
            success: true,
            message: "Resume uploaded successfully",
            data: resume
        })
    } catch (err) {
        next(err);
    }
})

export const getResumes = asyncHandler(async (req, res, next) => {
    try {
        const userId = req.user.id;
        const resumes = await resumeService.getResumesByUser(userId);
        res.status(200).json({
            success: true,
            data: resumes,
        });
    } catch (error) {
        next(error);
    }
})

export const getResumeById = asyncHandler(async (req, res, next) => {
    try {
        const { id } = req.params;
        const resume = await resumeService.getresumeById(req, id);
        res.status(200).json({
            success: true,
            data: resume,
        });
    } catch (error) {
        next(error);
    }
})

export const deleteResume = asyncHandler(async (req, res, next) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const resume = await resumeService.deleteResumeById(userId, id);
        res.status(200).json({
            success: true,
            message: "Resume deleted successfully",
        });
    } catch (error) {
        next(error);
    }
});