import 'dotenv/config';
import { app } from './app.js';
import { disConnectDB } from './config/db.js';
const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
    console.log('Server running on port ' + PORT);
});

// unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.error('Unhandled Rejection:', err);
    server.close(async () => {
        await disConnectDB();
        process.exit(1);
    });
});

// uncaught exceptions
process.on('uncaughtException', async (err) => {
    console.error('Uncaught Exception:', err);
    await disConnectDB();
    process.exit(1);
});

// graceful shutdown on SIGINT (Ctrl+C)
process.on('SIGINT', async () => {
    console.log('SIGINT received. Shutting down gracefully...');
    server.close(async () => {
        await disConnectDB();
        process.exit(0);
    });
});