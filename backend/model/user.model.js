import mongoose from "mongoose";
import bcrypt from "bcrypt"; 

const UserSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
    minlength: 3,
    maxlength: 30,
  },
  email: {
    required: true,
    type: String,
    unique: true, // ✅ Corrected "unquie" to "unique"
    match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
  },
  password: {
    required: true,
    type: String, // ✅ Fixed typo from "typeString"
    minlength: 5,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  verification_token: {
    type: String,
  },
  expiresAt:{
    type:Date
  } ,   
  isverified: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});


// ✅ Password hashing middleware
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // Only hash on create/change

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (error) {
    return next(error);
  }
});

const User = mongoose.model("User", UserSchema);

export default User;
