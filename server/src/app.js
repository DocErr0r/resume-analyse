import express from 'express';
import { prisma } from './lib/prisma.js';
import 'dotenv/config';
import { connectDB } from './config/db.js';
import { ErrorMiddelware } from './middleware/ErrorMiddleware.js';
import { authRoutes } from './modules/user/user.route.js';
import cookieparser from 'cookie-parser';
import { resumeRoutes } from './modules/resumes/resume.route.js';

export const app = express();
connectDB()

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser());

app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/resume', resumeRoutes)

app.get('/test', async (req, res) => {
    const users = await prisma.user.findMany();
    res.json(users);
});

app.use((req, res, next) => {
    const err = new Error(`Route not found - ${req.originalUrl}`);
    err.statusCode = 404;
    next(err);
});

app.use(ErrorMiddelware);