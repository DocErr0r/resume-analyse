import { z } from 'zod';

const passwordSchema = z
  .string('Password is required')
  .min(6, 'Password must be at least 6 characters long')
  .max(100, 'Password must be less than 100 characters')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number')
  .regex(/[^a-zA-Z0-9]/, 'Password must contain at least one special character');

export const registerUserSchema = z.object({
  name: z
    .string('Name is required')
    .min(2, 'Name must be at least 2 characters long')
    .max(50, 'Name must be less than 50 characters')
    .trim(),
  email: z
    .string('Email is required')
    .toLowerCase()
    .email('Please provide a valid email address')
    .max(255, 'Email must be less than 255 characters'),
  password: passwordSchema,
});

export const loginUserSchema = z.object({
  email: z
    .string('Email is required')
    .toLowerCase()
    .email('Please provide a valid email address'),
  password: z
    .string('Password is required')
    .min(1, 'Password is required'),
});