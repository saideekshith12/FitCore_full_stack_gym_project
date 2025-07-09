import mongoose from "mongoose";


const AdminSchema = new mongoose.Schema({
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
  }

},{
    timestamps:true
});


const Admin = mongoose.model("Admin", AdminSchema);

export default Admin;