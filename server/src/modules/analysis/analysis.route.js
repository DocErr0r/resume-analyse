import express from 'express';
import { createAnalysis, getAnalyses, getAnalysisById } from './analysis.controller.js';
import { validateRequest } from '../../middleware/validateRequest.js';
import { createAnalysisSchema } from './analysis.validation.js';
import { authMiddleware } from '../../middleware/authMiddleware.js';

const router = express.Router();

router.use(authMiddleware);

router.route('/').get(getAnalyses).post(validateRequest(createAnalysisSchema), createAnalysis);
router.get('/:id', getAnalysisById);

export const analysisRoutes = router;