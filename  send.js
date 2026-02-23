import "dotenv/config";
import fetch from "node-fetch";
import nodemailer from "nodemailer";
import fs from "fs";

const content = fs.readFileSync("output.md", "utf8");

// EMAIL
async function sendEmail() {
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    });

    await transporter.sendMail({
        from: "OpenClaw Bot <bot@test.local>",
        to: process.env.EMAIL_TO,
        subject: "☀️ 今日早安简报",
        text: content
    });
}
// DISCORD
async function sendDiscord() {
    await fetch(process.env.DISCORD_WEBHOOK, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            content: content
        })
    });
}

await sendEmail();
await sendDiscord();