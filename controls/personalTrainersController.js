import {getAllPersonalTrainers,getPersonalTrainerById,getPersonalTrainersBySpecialization,getPersonalTrainersByExperience,addPersonalTrainer,deletePersonalTrainer,updatePersonalTrainer} from "../Models/personalTrainers_db.js";

const getAllPersonalTrainersCon = async (req,res) => {
    try {
        res.json(await getAllPersonalTrainers());
    } catch (err) {
        console.log(err);
    }
}

const getPersonalTrainerByIdCon = async (req,res) => {
    try {
        res.json(await getPersonalTrainerById(req.params.personal_trainer_id));
    } catch (err) {
        console.log(err);
    }
}

const getPersonalTrainersBySpecializationCon = async (req,res) => {
    try {
        res.json(await getPersonalTrainersBySpecialization(req.params.specialization));
    } catch (err) {
        console.log(err);
    }
}

const getPersonalTrainersByExperienceCon = async (req,res) => {
    try {
        res.json(await getPersonalTrainersByExperience(req.params.experience));
    } catch (err) {
        console.log(err);
    }
}

const addPersonalTrainerCon = async (req,res) => {
    try {
        await addPersonalTrainer(req.body);
        res.json({
            message:"Personal trainer added successfully"
        });
    } catch (err) {
        console.log(err);
    }
}

const deletePersonalTrainerCon = async (req,res) => {
    try {
        await deletePersonalTrainer(req.params.personal_trainer_id);
        res.json({
            message:"Personal trainer deleted successfully"
        });
    } catch (err) {
        console.log(err);
    }
}

const updatePersonalTrainerCon = async (req,res) => {
    try {
        await updatePersonalTrainer(req.params.personal_trainer_id,req.body);
        res.json({
            message:"Personal trainer updated successfully"
        });
    } catch (err) {
        console.log(err);
    }
}

export {getAllPersonalTrainersCon,getPersonalTrainerByIdCon,getPersonalTrainersBySpecializationCon,getPersonalTrainersByExperienceCon,addPersonalTrainerCon,deletePersonalTrainerCon,updatePersonalTrainerCon}