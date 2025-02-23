import {getAllUsers,getUsersBySubscription,getUserById,addUser,deleteUser,updateUserDetails,updateUserPassword,updateUserEmail} from "../Models/users_db.jss";

const getAllUsersCon = async (req,res) => {
    try {
        res.json(await getAllUsers());
    } catch (err) {
        console.log(err);
    }
}

const getUsersBySubscriptionCon = async (req,res) => {
    try {
        res.json(await getUsersBySubscription(req.params.subscription_type));
    } catch (err) {
        console.log(err);
    }
}

const getUserByIdCon = async (req,res) => {
    try {
        res.json(await getUserById(req.params.user_id));
    } catch (err) {
        console.log(err);
    }
}


const addUserCon = async (req,res) => {
    let {user_id,first_name,last_name,email,password,subscription_type} = req.body
    try {
       await addUser(user_id,first_name,last_name,email,password,subscription_type)
       res.json({
        message:"User added successfully"
    });
    } catch (err) {
        console.log(err);
    }
}


const deleteUserCon = async (req,res) => {
    try {
        await deleteUser(req.params.user_id);
        res.json({
            message:"User deleted successfully"
        });
    } catch (err) {
        console.log(err);
    }
}


const updateUserDetailsCon = async (req,res) => {
    let {user_id,name,address,location_id,subscription_type} = req.body;
    console.log(req.body);
    await updateUserDetails(user_id,name,address,location_id,subscription_type);
    res.json({
        message:"User details updated successfully"
    })
}


const updateUserPasswordCon = async (req,res) => {
    let {user_id,password} = req.body;
    await updateUserPassword(user_id,password);
    res.json({
        message:"User password updated successfully"
    })
}


const updateUserEmailCon = async (req,res) => {
    let {user_id,email} = req.body;
    await updateUserEmail(user_id,email);
    res.json({
        message:"User email updated successfully"
    })
}

export {getAllUsersCon,getUsersBySubscriptionCon,getUserByIdCon,addUserCon,deleteUserCon,updateUserDetailsCon,updateUserPasswordCon,updateUserEmailCon}

