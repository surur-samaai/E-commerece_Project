import {getAllUsers,getUsersBySubscription,getUserById,addUser,deleteUser,updateUserDetails,updateUserPassword,updateUserEmail} from "../Models/users_db.jss";

const getAllUsersCon = async (req,res) => {
    try {
        res.status(200).json(await getAllUsers());
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error:"There was an error while getting all users"
        })
    }
}

const getUsersBySubscriptionCon = async (req,res) => {
    try {
        res.status(200).json(await getUsersBySubscription(req.params.subscription_type));
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error:"There was an error while getting users by subscription"
        })
    }
}

const getUserByIdCon = async (req,res) => {
    try {
        res.status(200).json(await getUserById(req.params.user_id));
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error:"There was an error while getting user"
        })
    }
}


const addUserCon = async (req,res) => {
    let {user_id,name,email,password,address,subscription_type} = req.body
    try {
       await addUser(user_id,name,email,password,address,subscription_type)
       res.status(200).json({
        message:"User added successfully"
    });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error:"There was an error while adding user"
        })
    }
}


const deleteUserCon = async (req,res) => {
    try {
        await deleteUser(req.params.user_id);
        res.status(200).json({
            message:"User deleted successfully"
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error:"There was an error while deleting user"
        })
    }
}


const updateUserDetailsCon = async (req,res) => {
    let {user_id,name,address,location_id,subscription_type} = req.body;
    console.log(req.body);
    try {
        await updateUserDetails(user_id,name,address,location_id,subscription_type);
    res.status(200).json({
        message:"User details updated successfully"
    });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error:"There was an error while updating user details"
        })
    }
}


const updateUserPasswordCon = async (req,res) => {
    let {user_id,password} = req.body;
    try {
        await updateUserPassword(user_id,password);
    res.satus(200).json({
        message:"User password updated successfully"
        });
    } catch (err) {
    console.error(err);
    res.status(500).json({
        error:"There was an error while updating user password"
        })
    }
}


const updateUserEmailCon = async (req,res) => {
    let {user_id,email} = req.body;
    try {
        await updateUserEmail(user_id,email);
    res.status(200).json({
        message:"User email updated successfully"
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error:"There was an error while updating user email"
        })
    }
}

export {getAllUsersCon,getUsersBySubscriptionCon,getUserByIdCon,addUserCon,deleteUserCon,updateUserDetailsCon,updateUserPasswordCon,updateUserEmailCon}

