import express from 'express';
import * as userController from './user.controller.js';
import { authMiddleware } from '../../middleware/authMiddleware.js';
import { registerUserSchema, loginUserSchema } from './user.validation.js';
import { validateRequest } from '../../middleware/validateRequest.js';

const router = express.Router();

router.post('/register', validateRequest(registerUserSchema), userController.registerUser);
router.post('/login', validateRequest(loginUserSchema), userController.loginUser);
router.post('/logout', authMiddleware, userController.logoutUser);
router.get('/me', authMiddleware, userController.getMe);

export const authRoutes = router;