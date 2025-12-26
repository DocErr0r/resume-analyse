import express from 'express';
import * as userController from './user.controller.js';
import { authMiddleware } from '../../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser)
router.post('/logout', authMiddleware, userController.logoutUser)
router.get('/me', authMiddleware, userController.getMe);

export const authRoutes = router;