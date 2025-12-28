import express from "express";
import * as resumeController from "./resume.controller.js";
import { authMiddleware } from "../../middleware/authMiddleware.js";
import { validateRequest } from "../../middleware/validateRequest.js";
import { uploadResumeSchema } from "./resume.validation.js";

export const resumeRoutes = express.Router();

resumeRoutes.route('/').post(authMiddleware, validateRequest(uploadResumeSchema), resumeController.uploadResume).get(authMiddleware, resumeController.getResumes);
resumeRoutes.route('/:id').get(authMiddleware, resumeController.getResumeById).delete(authMiddleware, resumeController.deleteResume);