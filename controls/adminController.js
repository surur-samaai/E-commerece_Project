import {getAllAdmins,getAdminById,addAdmin,deleteAdmin,updateAdmin} from "../models/admin_db.js";

const getAllAdminCon = async (req,res) => {
    try {
        res.status(200).json(await getAllAdmins());
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error:"There was an error while getting all admins"
        });
    }
}

const getAdminByIdCon = async (req,res) => {
    try {
        res.status(200).json(await getAdminById(req.params.admin_id));
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error:"There was an error while getting admin by id"
        });
    }
}

const addAdminCon = async (req,res) => {
    try {
        await addAdmin(req.body);
        res.status(200).json({
            message:"Admin added successfully"
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error:"There was an error while adding admin"
        });
    }
}

const deleteAdminCon = async (req,res) => {
    try {
        await deleteAdmin(req.params.admin_id);
        res.status(200).json({
            message:"Admin deleted successfully"
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error:"There was an error while deleting admin"
        });
    }
}

const updateAdminCon = async (req,res) => {
    try {
        await updateAdmin(req.params.admin_id,req.body);
        res.status(200).json({
            message:"Admin updated successfully"
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error:"There was an error while updating admin"
        });
    }
}

// const updateAdminPasswordCon = async (req,res) => {
//     try {
//         await updateAdminPassword(req.params.admin_id,req.body.password);
//         res.status(200).json({
//             message:"Admin password updated successfully"
//         });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({
//             error:"There was an error while updating admin password"
//         });
//     }
// }

// const updateAdminEmailCon = async (req,res) => {
//     try {
//         await updateAdminEmail(req.params.admin_id,req.body.email);
//         res.status(200).json({
//             message:"Admin email updated successfully"
//         });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({
//             error:"There was an error while updating admin email"
//         });
//     }
// }

export {getAllAdminCon, getAdminByIdCon, addAdminCon, deleteAdminCon, updateAdminCon};