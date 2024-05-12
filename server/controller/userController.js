import userModel from "../model/userModel.js";
import user from "../model/userModel.js";
 

export const create =async (req,res)=>{
    try{

        const userData = new user(req.body);
        if(!userData){
            return res.status(404).json({msg: "user data not found"});
        }

        const savedData = await userData.save();
        res.status(200).json(savedData);
    }catch (error){
        res.status(500).json({error: error});
    }
}

export const getAll = async(req,res) => {
    try{
        const userData = await user.find();
        if(!userData){
            return res.status(404).json({msg:"user data not found"});
        }
        res.status(200).json(userData);

    }catch(error){
        res.status(500).json({error:error});
    }
}

export const getone =async(req,res)=>{
    try {
        const id= req.params.id;
        const userExist = await user.findById(id);
        if(!userExist){
            return res.status(404).json({msg: "user not found"});
        }
        res.status(200).json(userExist);

    } catch (error) {
        res.status(500).json({error: error});
    }
}

export const update = async(req,res)=>{
    try {
        const id = req.params.id;
        const userExist= await user.findById({_id:id});
        const {fname, lname, email, password} = req.body;
        if(!userExist){
            return res.status(401).json({msg: "user not found"});
        }
        const updatedData = await user.findByIdAndUpdate({_id:id},{
            fname:fname,
            lname:lname,
            email:email,
            password:password
        });
        await updatedData.save();
        res.status(200).json({message:"User Update Successfuly!"});
    } catch (error) {
        res.status(500).json({error: error});
        
    }
}

export const deleteUser = async(req,res)=>{
  try {
    const id= req.params.id;
    const userExist = await user.findById(id);
    if(!userExist){
        return res.status(404).json({msg: "user not  exist"});
    }
    await user.findByIdAndDelete(id);
    res.status(200).json({msg: "user deleted sucessfully"});
  } catch (error) {
    res.status(404).json({error: error});
  }
}