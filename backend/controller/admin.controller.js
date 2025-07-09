import Admin from "../model/admin.model.js"

const AdminSignup = async (req, res)=>{
try {
        const {email , password} = req.body
        if(!email || !password){
            return res.status(400).json({
                message:"All fields are required"
            })
        }
        const user = await Admin.create({
            email,password
        })
        return res.status(200).json({
            message:"Admin is successfully created"
        })
} catch (error) {
    console.log(error)
    message:error.message
}
}

export default AdminSignup