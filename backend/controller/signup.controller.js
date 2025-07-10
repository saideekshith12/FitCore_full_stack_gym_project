import mongoose from "mongoose";
import User from "../model/user.model.js";
import nodemailer from "nodemailer";

const generateVerificationToken = () => {
  return Math.floor(10000 + Math.random() * 90000).toString(); // Always 5-digit string
};
const pendingUsers = new Map();
export const signup = async (req, res) => {
  const { name, email, password, role } = req.body;

  // Input validation
  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (name.length <= 5) {
    return res.status(400).json({ message: "Name should be more than 5 letters" });
  }

  if (!email.endsWith("@gmail.com")) {
    return res.status(400).json({ message: "Email must end with @gmail.com" });
  }

  if (password.length <= 5) {
    return res.status(400).json({ message: "Password must have minimum of 5 letters" });
  }
  if(role === "admin"){
    return res.status(400).josn({
      message:"Admin can't be signup here , Please login has a User"
    })
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // ✅ Generate token BEFORE saving to DB
    const verificationToken = generateVerificationToken();
     const expiresAt = Date.now() + 1 * 60 * 1000; 

    // Save new user with verification token
     pendingUsers.set(email, {
      name,
      email,
      password,
      role,
      verification_token: verificationToken,
      expiresAt,
    });

    // ✅ Setup nodemailer with SendGrid
    const transporter = nodemailer.createTransport({
      host: "smtp.sendgrid.net",
      port: 587,
      auth: {
        user: "apikey",
        pass: process.env.SENDGRID_API_KEY, // Load from .env
      },
      tls: {
    rejectUnauthorized: false, // ⛔ Accept self-signed certificates (unsafe for prod)
  },
    });

    // ✅ Send email to the actual user
    const info = await transporter.sendMail({
      from: `"Fit Core" <${process.env.SENDER_EMAIL}>`, // Must be a verified sender
      to: email,
      subject: "Email Verification Code",
      html: `
        <h2>Hello ${name},</h2>
        <p>Thank you for registering. Your verification code is:</p>
        <h1 style="color:#2e6da4">${verificationToken}</h1>
        <p>Please enter this code in the app to verify your account.</p>
      `,
    });

    console.log("Email sent:", info.messageId);

    return res.status(200).json({
      message: "Signup successful. Please check your email for the verification code.",
    });

  } catch (error) {
    console.error("Signup Error:", error);
    return res.status(500).json({ message: "Something went wrong.",
      error: error.message,
     });
  }
};

export { pendingUsers};
