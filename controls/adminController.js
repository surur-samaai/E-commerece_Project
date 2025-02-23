import {getAllAdmins,getAdminById,addAdmin,deleteAdmin,updateAdminPassword,updateAdminEmail} from "../Models/admin_db.js";

const getAllAdminCon = async (req,res) => {
    try {
        res.json(await getAllAdmins());
    } catch (err) {
        console.log(err);
    }
}

const getAdminByIdCon = async (req,res) => {
    try {
        res.json(await getAdminById(req.params.admin_id));
    } catch (err) {
        console.log(err);
    }
}

const addAdminCon = async (req,res) => {
    try {
        await addAdmin(req.body);
        res.json({
            message:"Admin added successfully"
        });
    } catch (err) {
        console.log(err);
    }
}

const deleteAdminCon = async (req,res) => {
    try {
        await deleteAdmin(req.params.admin_id);
        res.json({
            message:"Admin deleted successfully"
        });
    } catch (err) {
        console.log(err);
    }
}

const updateAdminPasswordCon = async (req,res) => {
    try {
        await updateAdminPassword(req.params.admin_id,req.body.password);
        res.json({
            message:"Admin password updated successfully"
        });
    } catch (err) {
        console.log(err);
    }
}

const updateAdminEmailCon = async (req,res) => {
    try {
        await updateAdminEmail(req.params.admin_id,req.body.email);
        res.json({
            message:"Admin email updated successfully"
        });
    } catch (err) {
        console.log(err);
    }
}

export {getAllAdminCon, getAdminByIdCon, addAdminCon, deleteAdminCon, updateAdminPasswordCon, updateAdminEmailCon};