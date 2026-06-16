const mongoose = require('mongoose');

// =========================================================================
// 1. SCHEMA DEFINITIONS
// =========================================================================

// Schema for permanently registered and authorized users
const UserSchema = new mongoose.Schema({
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    isVerified: { type: Boolean, default: true }, // Defaults to true now because they can't exist without verification
    createdAt: { type: Date, default: Date.now }
});

// Schema for temporary security verification OTP codes & ephemeral sign-up payloads
const OtpSchema = new mongoose.Schema({
    email: { type: String, required: true, lowercase: true },
    otpCode: { type: String, required: true },
    purpose: { type: String, enum: ['SIGNUP_VERIFY', 'LOGIN_MFA', 'PASSWORD_RESET'], required: true },
    
    // EPHEMERAL DATA STAGING CORRIDOR (Used to hold pending signup metrics securely)
    signupPayload: {
        fullName: { type: String },
        hashedPassword: { type: String }
    },
    
    createdAt: { type: Date, default: Date.now, expires: 300 } // Hard-deletes completely after exactly 5 minutes (300s)
});

// --- PRIVATE USER CART MANIFEST SCHEMA ---
const CartSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true, 
        unique: true // Guarantees exactly one secure container ledger per authenticated account node
    },
    items: [
        {
            productId: { type: String, required: true },
            title: { type: String, required: true },
            price: { type: Number, required: true },
            quantity: { type: Number, default: 1 },
            imageUrl: { type: String, default: "../images/placeholder.jpeg" }
        }
    ],
    updatedAt: { type: Date, default: Date.now }
});

// Middleware hook to automatically update timestamp parameters on mutations
// Middleware hook to automatically update timestamp parameters on mutations
CartSchema.pre('save', function() {
    this.updatedAt = Date.now();
});

// =========================================================================
// 2. MODEL INITIALIZATION & COMPILATION
// =========================================================================

const User = mongoose.model('User', UserSchema);
const Otp = mongoose.model('Otp', OtpSchema);
const Cart = mongoose.model('Cart', CartSchema);

// =========================================================================
// 3. SECURE CLEAN MODULE EXPORTS
// =========================================================================

// --- SECURE SYSTEM PRODUCTION ORDER ARCHIVE SCHEMA ---
const OrderSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    customerInfo: {
        fullName: { type: String, required: true, trim: true },
        phoneNumber: { type: String, required: true, trim: true },
        email: { type: String, required: true, lowercase: true, trim: true },
        city: { type: String, required: true, trim: true },
        deliveryAddress: { type: String, required: true, trim: true }
    },
    items: [
        {
            productId: { type: String, required: true },
            title: { type: String, required: true },
            price: { type: Number, required: true },
            quantity: { type: Number, required: true }
        }
    ],
    totalPrice: { type: Number, required: true },
    paymentMethod: { type: String, enum: ['COD', 'EasyPaisa'], required: true },
    transactionId: { type: String, trim: true, default: "" },
    orderStatus: { 
        type: String, 
        enum: ['Pending', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled'], 
        default: 'Pending' 
    },
    createdAt: { type: Date, default: Date.now }
});

const Order = mongoose.model('Order', OrderSchema);

// SINGLE UNIFIED CLEAN EXPORT EXCLUSION MATRIX
module.exports = { 
    User, 
    Otp, 
    Cart, 
    Order 
};