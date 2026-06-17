require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const { User, Otp, Cart, Order } = require('./models');
const dns = require('dns');
const { compileOrderEmailTemplate } = require('./utils/templates');

// Force reliable fallback DNS lookup addresses to stabilize connection
dns.setServers(['1.1.1.1', '8.8.8.8']);

const app = express();
app.use(express.json());
app.use(cors());

// --- Database Connectivity Layer ---
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('>>> MONGO_ATLAS // DATA MATRIX SYNCHRONIZED.'))
    .catch(err => console.error('CRITICAL DATABASE COUPLING FAULT:', err));

// --- Mail Transport Setup ---
const mailTransporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT || "587"),
    secure: process.env.EMAIL_PORT === "465", // Only true for 465
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const orderMailTransporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: process.env.SMTP_SECURE === 'true', // Will be false for 587
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    },
    tls: {
        // This stops local network issues/firewalls from dropping the connection
        rejectUnauthorized: false
    }
});

orderMailTransporter.verify((error, success) => {
    if (error) {
        console.error("❌ [SMTP MAILER] Connection Configuration Failed:", error.message);
    } else {
        console.log("⚡ [SMTP MAILER] System ready to dispatch order notification vectors.");
    }
});

// Automated Email Dispatcher Utility
async function dispatchOtpEmail(targetEmail, code) {
    const mailOptions = {
        from: `"Security Core" <${process.env.EMAIL_USER}>`,
        to: targetEmail,
        subject: "SECURITY ACCOUNT VERIFICATION TOKEN",
        text: `Your account registration security passcode is: ${code}. This authorization key expires in 5 minutes.`
    };
    await mailTransporter.sendMail(mailOptions);
}

// --- AUTHENTICATION SHIELD MIDDLEWARE ---
const requireAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: "Access Denied: Session token missing or invalid." });
    }

    const token = authHeader.split(' ')[1];
    try {
        const decodedPayload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decodedPayload; // Attaches userId and email to the request object
        next();
    } catch (err) {
        return res.status(403).json({ error: "Session expired or corrupted. Please log in again." });
    }
};


// Fire up server routing port listener
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`>>> SECURE LOGISTICS RUNNING ON PORTS // LOCK_TRACK , >>> SERVER INITIALIZED AND ACTIVE ON PORT CONTAINER: ${PORT}`);
});

module.exports = app;