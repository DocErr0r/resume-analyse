// error handler middleware
export function ErrorMiddelware(err, req, res) {
    let statusCode = err.statusCode || 500;
    let message = err.message || 'Internal Server Error';

    // Handle specific Prisma errors
    if (err.code) {
        switch (err.code) {
            case 'P2002':
                statusCode = 400;
                message = `Unique constraint failed on the field: ${err.meta.target}`;
                break;
            case 'P2025':
                statusCode = 404;
                message = 'Record not found';
                break;
            // Add more Prisma error codes as needed
            default:
                statusCode = 500;
                message = 'Database error occurred';
        }
    }
    res.status(statusCode).json({
        success: false,
        message: err.message || 'Internal Server Error',
    });
}