import { Prisma } from "../generated/prisma/index.js";



export function ErrorMiddelware(err, req, res, next) {
    console.log(err)
    let statusCode = err.statusCode || 500;
    let message = err.message || "Internal Server Error";
    let errorType = "Server Error";

    // 1. Prisma Known Request Errors (Pxxxx codes)
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
        errorType = "Prisma Request Error";
        switch (err.code) {
            case 'P2002': // Unique constraint violation
                statusCode = 400;
                message = `Duplicate value for field: ${err.meta?.target}`;
                break;
            case 'P2025': // Record not found
                statusCode = 404;
                message = "The requested record was not found.";
                break;
            case 'P2003': // Foreign key constraint failed
                statusCode = 400;
                message = "Invalid reference: Related record does not exist.";
                break;
            default:
                statusCode = 400;
                message = `Database Error: ${err.code}`;
        }
    }

    // 2. Prisma Validation Errors (Invalid types passed to Prisma)
    else if (err instanceof Prisma.PrismaClientValidationError) {
        statusCode = 400;
        errorType = "Validation Error";
        message = "Invalid data format provided to the database.";
    }

    // 3. Prisma Connection/Initialization Errors
    else if (err instanceof Prisma.PrismaClientInitializationError) {
        statusCode = 503; // Service Unavailable
        errorType = "Database Connection Error";
        message = "Could not connect to the database.";
    }

    // Final Response Structure
    res.status(statusCode).json({
        success: false,
        message: message,
        ...(process.env.NODE_ENV === 'development' && {
            error: errorType,
            code: err.code || null, // Shows Pxxxx code if available
            stack: err.stack,
            details: err.meta // Shows extra Prisma info in dev mode
        })
    });
}