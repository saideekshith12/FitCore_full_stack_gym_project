import User from "../model/user.model.js";
import { pendingUsers } from "./signup.controller.js";

const Verify = async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ message: "OTP is required" });
  }

  // Search pendingUsers for a match
  let matchedEmail = null;
  let userData = null;

  for (const [email, data] of pendingUsers.entries()) {
    if (data.verification_token === token) {
      matchedEmail = email;
      userData = data;
      break;
    }
  }

  if (!userData) {
    return res.status(400).json({ message: "Invalid OTP" });
  }

  if (Date.now() > userData.expiresAt) {
    pendingUsers.delete(matchedEmail);
    return res.status(400).json({ message: "OTP expired. Please sign up again." });
  }

  try {
    const newUser = await User.create({
      name: userData.name,
      email: userData.email,
      password: userData.password,
      role: userData.role,
      isVerified: true,
    });

    pendingUsers.delete(matchedEmail);

    return res.status(200).json({ message: "User verified and registered successfully" });

  } catch (error) {
    console.error("Error in verification:", error);
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

export default Verify;

