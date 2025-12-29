import express from "express";
import * as jobDescriptionController from "./jobdescription.controller.js";
import { authMiddleware } from "../../middleware/authMiddleware.js";
import { validateRequest } from "../../middleware/validateRequest.js";
import { createJobDescriptionSchema } from "./jobdescription.validation.js";

export const jobDescriptionRoutes = express.Router();

jobDescriptionRoutes.route('/')
    .post(authMiddleware, validateRequest(createJobDescriptionSchema), jobDescriptionController.createJobDescription)
    .get(authMiddleware, jobDescriptionController.getJobDescriptions);

jobDescriptionRoutes.route('/:id')
    .get(authMiddleware, jobDescriptionController.getJobDescriptionById)
    .delete(authMiddleware, jobDescriptionController.deleteJobDescription);
