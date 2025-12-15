import { betterAuth } from "better-auth";
import { Pool } from "pg";
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

// Database connection for Better Auth
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    },
});

// Placeholder sendEmail function - replace with actual email service integration
const sendEmail = async ({ to, subject, text }: { to: string, subject: string, text: string }) => {
    console.log(`Sending email to: ${to}`);
    console.log(`Subject: ${subject}`);
    console.log(`Body: ${text}`);
    // In a real application, integrate with an email service like SendGrid, Nodemailer, etc.
};

export const auth = betterAuth({
    database: pool,
    secret: process.env.BETTER_AUTH_SECRET!,
    baseURL: process.env.BETTER_AUTH_URL!,
    trustedOrigins: [
        "http://localhost:3000",
        "http://localhost:3000/ai-book-new",
    ],
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: false, // Disable for now - enable when you have email service
        sendVerificationEmail: async ({ user, url }: any, request: any) => {
            void sendEmail({
                to: user.email,
                subject: "Verify your email address",
                text: `Click the link to verify your email: ${url}`,
            });
        },
        sendResetPassword: async ({ user, url, token }: any, request: any) => {
            void sendEmail({
                to: user.email,
                subject: "Reset your password",
                text: `Click the link to reset your password: ${url}`,
            });
        },
        onPasswordReset: async ({ user }: any, request: any) => {
            console.log(`Password for user ${user.email} has been reset.`);
        },
    },
    // Optional: Configure social providers if needed in the future
    // socialProviders: {
    //     github: {
    //         clientId: process.env.GITHUB_CLIENT_ID!,
    //         clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    //     },
    // },
    // Optional: Add plugins as needed
    // plugins: [],
});