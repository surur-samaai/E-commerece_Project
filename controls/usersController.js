import {getAllUsers,getUserById,addUser,deleteUser,updateUserDetails} from "../models/users_db.js";

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

// const getUsersBySubscriptionCon = async (req,res) => {
//     try {
//         await getUsersBySubscription(req.params.subscription_type);
//         res.status(200).json({
//             message:"Users found successfully"
//         });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({
//             error:"There was an error while getting users by subscription"
//         })
//     }
// }

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
    try {
       await addUser(req.body);
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
    try {
        await updateUserDetails(req.params.user_id,req.body);
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


// const updateUserPasswordCon = async (req,res) => {
//     let {user_id,password} = req.body;
//     try {
//         await updateUserPassword(user_id,password);
//     res.satus(200).json({
//         message:"User password updated successfully"
//         });
//     } catch (err) {
//     console.error(err);
//     res.status(500).json({
//         error:"There was an error while updating user password"
//         })
//     }
// }


// const updateUserEmailCon = async (req,res) => {
//     let {user_id,email} = req.body;
//     try {
//         await updateUserEmail(user_id,email);
//     res.status(200).json({
//         message:"User email updated successfully"
//         });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({
//             error:"There was an error while updating user email"
//         })
//     }
// }

export {getAllUsersCon,getUserByIdCon,addUserCon,deleteUserCon,updateUserDetailsCon}

