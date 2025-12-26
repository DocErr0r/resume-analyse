import { prisma } from "../lib/prisma.js";

const connectDB = async () => {
    try {
        await prisma.$connect();
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Database connection failed:", error);
        process.exit(1);
    }
}

const disConnectDB = async () => {
    await prisma.$disconnect();
}

export { connectDB, disConnectDB }