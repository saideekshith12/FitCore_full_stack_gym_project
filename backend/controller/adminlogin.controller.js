import Admin from "../model/admin.model.js"

const Adminlogin = async (req, res)=>{
    const{email, password}= req.body
    if(!email || !password){
        return res.status(400).json({
            message:"All fields are required"
        })
    }
   try {
     const user= await Admin.findOne({email})
     return res.status(200).json({
         message:"Admin is successfully logged in"
     })
   } catch (error) {
     console.log(error)
     res.status(500).josn({
        message:"something went wrong"
     })
   }
}
export default Adminlogin