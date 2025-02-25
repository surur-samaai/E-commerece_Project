import {getAllPersonalTrainers,getPersonalTrainerById,getPersonalTrainersBySpecialization,getPersonalTrainersByExperience,addPersonalTrainer,deletePersonalTrainer,updatePersonalTrainer,updatePersonalTrainerEmailPassword} from "../Models/personalTrainers_db.js";

const getAllPersonalTrainersCon = async (req,res) => {
    try {
        res.status(200).json(await getAllPersonalTrainers());
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error:"There was an error while getting all personal trainers"
        });
    }
}

const getPersonalTrainerByIdCon = async (req,res) => {
    try {
        res.status(200).json(await getPersonalTrainerById(req.params.trainer_id));
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error:"There was an error while getting personal trainer by id"
        });
    }
}

const getPersonalTrainersBySpecializationCon = async (req,res) => {
    try {
        res.status(200).json(await getPersonalTrainersBySpecialization(req.params.specialization));
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error:"There was an error while getting personal trainers by specialization"
        });
    }
}

const getPersonalTrainersByExperienceCon = async (req,res) => {
    try {
        res.status(200).json(await getPersonalTrainersByExperience(req.params.experience));
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error:"There was an error while getting personal trainers by experience"
        });
    }
}

const addPersonalTrainerCon = async (req,res) => {
    try {
        await addPersonalTrainer(req.body);
        res.json({
            message:"Personal trainer added successfully"
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error:"There was an error while adding personal trainer"
        });
    }
}

const deletePersonalTrainerCon = async (req,res) => {
    try {
        await deletePersonalTrainer(req.params.trainer_id);
        res.status(200).json({
            message:"Personal trainer deleted successfully"
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error:"There was an error while deleting personal trainer"
        });
    }
}

const updatePersonalTrainerCon = async (req,res) => {
    try {
        await updatePersonalTrainer(req.params.trainer_id,req.body);
        res.status(200).json({
            message:"Personal trainer updated successfully"
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error:"There was an error while updating personal trainer"
        });  
    }
}
const updatePersonalTrainerEmailPasswordCon = async (req,res) => {
    try {
        await updatePersonalTrainerEmailPassword(req.params.trainer_id,req.body);
        res.status(200).json({
            message:"Your Email/Password has been updated successfully"
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error:"There was an error while updating your Email/Password"
        });  
    }
}

export {getAllPersonalTrainersCon,getPersonalTrainerByIdCon,getPersonalTrainersBySpecializationCon,getPersonalTrainersByExperienceCon,addPersonalTrainerCon,deletePersonalTrainerCon,updatePersonalTrainerCon,updatePersonalTrainerEmailPasswordCon};