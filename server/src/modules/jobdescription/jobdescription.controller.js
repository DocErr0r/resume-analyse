import asyncHandler from "../../utils/asyncHandler.js";
import AppError from "../../utils/ErrorClass.js";
import * as jobDescriptionService from "./jobdescription.service.js";

export const createJobDescription = asyncHandler(async (req, res, next) => {
    try {
        const { title, company, description } = req.body;
        const userId = req.user.id;

        const jobDescription = await jobDescriptionService.createJobDescription(userId, title, company, description);
        res.status(201).json({
            success: true,
            message: "Job description created successfully",
            data: jobDescription
        });
    } catch (err) {
        next(err);
    }
});

export const getJobDescriptions = asyncHandler(async (req, res, next) => {
    try {
        const userId = req.user.id;
        const jobDescriptions = await jobDescriptionService.getJobDescriptionsByUser(userId);
        res.status(200).json({
            success: true,
            data: jobDescriptions,
        });
    } catch (error) {
        next(error);
    }
});

export const getJobDescriptionById = asyncHandler(async (req, res, next) => {
    try {
        const { id } = req.params;
        const jobDescription = await jobDescriptionService.getJobDescriptionById(req, id);
        res.status(200).json({
            success: true,
            data: jobDescription,
        });
    } catch (error) {
        next(error);
    }
});


export const deleteJobDescription = asyncHandler(async (req, res, next) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const jobDescription = await jobDescriptionService.deleteJobDescriptionById(userId, id);
        res.status(200).json({
            success: true,
            message: "Job description deleted successfully",
        });
    } catch (error) {
        next(error);
    }
});
