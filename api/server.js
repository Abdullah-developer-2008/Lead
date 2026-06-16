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

/// ===================================================
// ENDPOINT: SIGNUP PHASE 1 - STAGE PAYLOAD & SEND OTP
// ===================================================
app.post('/api/auth/signup', async (req, res) => { // Fixed parameter order: (req, res)
    try {
        const { fullName, email, password } = req.body;

        if (!fullName || !email || !password) {
            return res.status(400).json({ error: "All structural data parameters are required." });
        }

        // 1. Check if a permanently verified user already occupies this email node
        const existingVerifiedUser = await User.findOne({ email });
        if (existingVerifiedUser) {
            return res.status(400).json({ error: "Access Denied: A verified account already exists with this email address." });
        }

        // 2. Clear out any previous unverified pending validation tokens for this specific email address
        await Otp.deleteMany({ email, purpose: 'SIGNUP_VERIFY' });

        // 3. Cryptographically hash the security passkey BEFORE staging it ephemerally
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // 4. Generate a secure, 6-digit numeric verification token
        const generatedOtp = crypto.randomInt(100000, 1000000).toString();

        // 5. Stage the complete user record inside the expiring collection
        const ephemeralOtpSession = new Otp({
            email,
            otpCode: generatedOtp,
            purpose: 'SIGNUP_VERIFY',
            signupPayload: {
                fullName,
                hashedPassword
            }
        });

        await ephemeralOtpSession.save();

        // 6. Dispatch the security token to the target inbox
        await dispatchOtpEmail(email, generatedOtp);

        console.log(`>> EPHEMERAL STATE CREATED: Staged credentials for ${email}. OTP token: [ ${generatedOtp} ] dispatched.`);
        
        res.status(200).json({ 
            message: "Security handshake sequence initialized. Ephemeral payload cached for 5 minutes.",
            email 
        });

    } catch (err) {
        console.error("SIGNUP PIPELINE CRASH:", err);
        res.status(500).json({ error: "Internal core tracking matrix breakdown: " + err.message });
    }
});


// ===================================================
// ENDPOINT: SIGNUP PHASE 2 - VERIFY HANDSHAKE & COMMITTED WRITE
// ===================================================
app.post('/api/auth/verify-signup', async (req, res) => { // Fixed parameter order: (req, res)
    try {
        const { email, otpCode } = req.body;

        if (!email || !otpCode) {
            return res.status(400).json({ error: "Email reference pointer and verification token are required." });
        }

        // 1. Locate the pending sign-up configuration mapping
        const activeOtpSession = await Otp.findOne({ email, purpose: 'SIGNUP_VERIFY' });

        if (!activeOtpSession) {
            return res.status(400).json({ error: "Verification window expired or invalid session. Please request a new token." });
        }

        // 2. Cross-reference the security token strings
        if (activeOtpSession.otpCode !== otpCode) {
            return res.status(400).json({ error: "Cryptographic token verification mismatch. Access denied." });
        }

        // 3. Prevent race conditions: Check one last time that no verified account sneaked in
        const doubleCheckUser = await User.findOne({ email });
        if (doubleCheckUser) {
            return res.status(400).json({ error: "Conflict detected: This identity node was verified via a separate tracking vector." });
        }

        // 4. UNPACK COLD STAGED PAYLOAD & COMMIT PERMANENT WRITE TO USER ENGINE
        const finalUserProfile = new User({
            fullName: activeOtpSession.signupPayload.fullName,
            email: activeOtpSession.email,
            password: activeOtpSession.signupPayload.hashedPassword,
            isVerified: true
        });

        await finalUserProfile.save();

        // 5. Purge the matching OTP document since the handshake is successful
        await Otp.deleteMany({ email, purpose: 'SIGNUP_VERIFY' });

        // 6. Build an authorized JSON Web Token (JWT) session pass
        const sessionToken = jwt.sign(
            { userId: finalUserProfile._id, email: finalUserProfile.email },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        console.log(`>> PERMANENT USER CREATED: ${finalUserProfile.email} is committed to the database ledger.`);

        res.status(200).json({
            message: "Profile compilation complete. Node initialized.",
            token: sessionToken,
            user: {
                fullName: finalUserProfile.fullName,
                email: finalUserProfile.email
            }
        });

    } catch (err) {
        console.error("VERIFICATION LAYER DECOUPLED:", err);
        res.status(500).json({ error: "Internal validation infrastructure fault: " + err.message });
    }
});
// --- API ENDPOINT: ACCOUNT AUTHENTICATION (LOGIN) ---
app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Ensure all authentication layers are provided
        if (!email || !password) {
            return res.status(400).json({ error: "Email footprint and secure passkey are mandatory." });
        }

        const cleanEmail = email.toLowerCase().trim();

        // 2. Locate the user identity profile document in the database
        const userProfile = await User.findOne({ email: cleanEmail });
        if (!userProfile) {
            return res.status(400).json({ error: "Access Denied: Invalid credentials pattern." });
        }

        // 3. Check if the user completed their OTP security verification step
        if (!userProfile.isVerified) {
            return res.status(403).json({ error: "Profile verification incomplete. Please verify via OTP first." });
        }

        // 4. Verify password match integrity using bcrypt
        const isPasswordMatching = await bcrypt.compare(password, userProfile.password);
        if (!isPasswordMatching) {
            return res.status(400).json({ error: "Access Denied: Invalid credentials pattern." });
        }

        // 5. Build an active system access pass token (JWT)
        const sessionToken = jwt.sign(
            { userId: userProfile._id, email: userProfile.email },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        console.log(`>> SESSION INITIALIZED: Operator ${userProfile.fullName} successfully logged in.`);

        res.status(200).json({
            message: "Authentication handshake verified. Initializing session memory...",
            token: sessionToken,
            user: {
                fullName: userProfile.fullName,
                email: userProfile.email
            }
        });

    } catch (err) {
        console.error("CRITICAL AUTH CORE FAILURE:", err);
        res.status(500).json({ error: "INTERNAL SYSTEM CORE DECOUPLE: " + err.message });
    }
});

// =========================================================================
// PIPELINE SECURE ROUTE 1: RETRIEVE USER-SPECIFIC CART STORAGE LEDGER
// =========================================================================
app.get('/api/cart', requireAuth, async (req, res) => {
    try {
        const authenticatedUid = req.user.userId; // Securely injected from cryptographically checked JWT

        // Locate or automatically compile a private ledger for this account if none exists yet
        let userPrivateCart = await Cart.findOne({ userId: authenticatedUid });
        
        if (!userPrivateCart) {
            userPrivateCart = new Cart({ userId: authenticatedUid, items: [] });
            await userPrivateCart.save();
        }

        console.log(`>> CART FETCH VERIFIED: Extracted ${userPrivateCart.items.length} units for UID: ${authenticatedUid}`);
        res.status(200).json({ success: true, items: userPrivateCart.items });

    } catch (err) {
        console.error("SECURE CART RECOVERY EXCEPTION:", err);
        res.status(500).json({ error: "Matrix query decoupled: " + err.message });
    }
});

// =========================================================================
// PIPELINE SECURE ROUTE: MUTATE / APPEND NEW PRODUCT ITEM TO PRIVATE BIN
// =========================================================================
app.post('/api/cart/add', requireAuth, async (req, res) => {
    try {
        // Ensure requireAuth middleware correctly extracts the decoded JWT user ID parameter
        const authenticatedUid = req.user?.userId || req.user?._id;
        
        if (!authenticatedUid) {
            return res.status(401).json({ error: "Unauthorized access: Valid profile node ID not found in session token." });
        }

        const { productId, title, price, imageUrl, quantity } = req.body;

        if (!productId) {
            return res.status(400).json({ error: "Missing parameters: productId value is required." });
        }

        // 1. Locate or initialize an empty cart document map for this specific user
        let userPrivateCart = await Cart.findOne({ userId: authenticatedUid });
        
        if (!userPrivateCart) {
            userPrivateCart = new Cart({ 
                userId: authenticatedUid, 
                items: [] 
            });
        }

        // 2. Check if the product variant already exists in their tracking item array lines
        const targetItemIndex = userPrivateCart.items.findIndex(item => item.productId === String(productId));

        const operationalQuantity = parseInt(quantity) || 1;

        if (targetItemIndex > -1) {
            // Item exists: Mutate the tracking quantity data integer smoothly
            userPrivateCart.items[targetItemIndex].quantity += operationalQuantity;
            
            // Safety Drop Boundary: If quantity falls to or below zero, evict the item node entry cleanly
            if (userPrivateCart.items[targetItemIndex].quantity <= 0) {
                userPrivateCart.items.splice(targetItemIndex, 1);
            }
        } else {
            // New Item: Require baseline product parameters before permitting array mutation writes
            if (!title || price === undefined) {
                return res.status(400).json({ 
                    error: "Structural parameters missing: 'title' and 'price' properties are required to stage a new catalog listing entry." 
                });
            }
            
            // Push structured entry setup securely into your Mongoose Schema structure
            userPrivateCart.items.push({ 
                productId: String(productId), 
                title: String(title), 
                price: parseFloat(price), 
                imageUrl: imageUrl || "../images/placeholder.jpeg", 
                quantity: operationalQuantity 
            });
        }

        // 3. Commit mutations to your live MongoDB Atlas cluster tables
        await userPrivateCart.save();
        
        return res.status(200).json({ 
            success: true, 
            message: "Data stream committed to cloud vault cleanly.", 
            items: userPrivateCart.items 
        });

    } catch (err) {
        console.error("CRITICAL ERROR // PRIVATE CART MUTATION ROUTE CRASHED:", err);
        return res.status(500).json({ 
            error: "Internal server runtime execution halted.", 
            details: err.message 
        });
    }
});

// =========================================================================
// PIPELINE SECURE ROUTE 3: PURGE AN ITEM VECTOR FROM SECURE MANIFEST
// =========================================================================
app.delete('/api/cart/remove/:productId', requireAuth, async (req, res) => {
    try {
        const authenticatedUid = req.user.userId;
        const { productId } = req.params;

        let userPrivateCart = await Cart.findOne({ userId: authenticatedUid });
        if (userPrivateCart) {
            userPrivateCart.items = userPrivateCart.items.filter(item => item.productId !== productId);
            await userPrivateCart.save();
        }

        res.status(200).json({ success: true, message: "Node discarded from private bin successfully.", items: userPrivateCart ? userPrivateCart.items : [] });
    } catch (err) {
        res.status(500).json({ error: "Item excision aborted: " + err.message });
    }
});

// =========================================================================
// PIPELINE SECURE ROUTE 4: VALIDATE PROTECTED SECURE CHECKOUT OUTBOUND
// =========================================================================
app.post('/api/cart/checkout', requireAuth, async (req, res) => {
    try {
        console.log(`>> PROCESSING PROTECTED CHECKOUT FUNNEL FOR USER NODE: ${req.user.userId}`);
        res.status(200).json({ success: true, message: "Checkout operational authorization clearance granted." });
    } catch (err) {
        res.status(500).json({ error: "Transaction verification thread dropped: " + err.message });
    }
});

// =========================================================================
// PIPELINE SECURE ROUTE: DISPATCH / COMMIT NEW INBOUND ORDER METRICS & MAILER
// =========================================================================
app.post('/api/orders/place', requireAuth, async (req, res) => {
    try {
        const authenticatedUid = req.user?.userId || req.user?._id;
        const username = req.user?.username || "Authenticated Node User"; 
        
        if (!authenticatedUid) {
            return res.status(401).json({ error: "Unauthorized access footprint: No valid session signature found." });
        }

        const { customerInfo, items, totalPrice, paymentMethod, transactionId } = req.body;

        // Form parameters verification checks
        if (!customerInfo || !items || items.length === 0 || !totalPrice || !paymentMethod) {
            return res.status(400).json({ error: "Missing required telemetry fields. Complete your data entry forms." });
        }

        if (paymentMethod === 'EasyPaisa' && !transactionId) {
            return res.status(400).json({ error: "Validation failure: A Transaction ID parameter is required for digital payments." });
        }

        // STEP 1: Commit and save the new transactional Document record safely to the Database
        const freshOrderDoc = new Order({
            userId: authenticatedUid,
            customerInfo,
            items,
            totalPrice,
            paymentMethod,
            transactionId: paymentMethod === 'EasyPaisa' ? transactionId : "",
            orderStatus: 'Pending'
        });

        await freshOrderDoc.save();

        // STEP 2: Clear user's active Cart ledger completely upon database validation success
        await Cart.findOneAndUpdate(
            { userId: authenticatedUid },
            { $set: { items: [] } }
        );

        // STEP 3: Compile and Dispatch Professional Notification Email Asynchronously
        const htmlMailPayload = compileOrderEmailTemplate({
            customerInfo,
            items,
            totalPrice,
            paymentMethod,
            transactionId,
            authenticatedUid,
            username
        });

        const mailOptions = {
            from: `"FutDrip Automated Engine" <${process.env.SMTP_USER}>`,
            to: 'abdullah7qow@gmail.com', 
            subject: 'New Order Received - FutDrip',
            html: htmlMailPayload
        };

        // Asynchronously dispatch email without blocking client HTTP response loop
        orderMailTransporter.sendMail(mailOptions, (mailErr, info) => {
            if (mailErr) {
                console.error("❌ [ADMIN TELEMETRY ERROR] SMTP Relay Failed to push notification vector:", mailErr);
            } else {
                console.log("⚡ [SMTP RELAY SUCCESS] Summary email tracking logs synced up:", info.messageId);
            }
        });

        // STEP 4: Immediately respond back to client successfully
        res.status(201).json({ 
            success: true, 
            message: "Order synchronized and archived down to live database ledger clusters.",
            orderId: freshOrderDoc._id 
        });

    } catch (err) {
        console.error("ORDER LIFECYCLE COMMIT EXCEPTION:", err);
        res.status(500).json({ error: "Internal processing crash inside order pipeline: " + err.message });
    }
});



// Fire up server routing port listener
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`>>> SECURE LOGISTICS RUNNING ON PORTS // LOCK_TRACK , >>> SERVER INITIALIZED AND ACTIVE ON PORT CONTAINER: ${PORT}`);
});
