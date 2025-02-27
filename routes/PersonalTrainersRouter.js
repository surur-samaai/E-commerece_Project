import express from "express";
import {getAllPersonalTrainersCon,getPersonalTrainerByIdCon,addPersonalTrainerCon,deletePersonalTrainerCon,updatePersonalTrainerCon} from "../controls/personalTrainersController.js";

const router = express.Router();

router.get("/", getAllPersonalTrainersCon);

router.get("/:trainer_id", getPersonalTrainerByIdCon);

// router.get("/specialization/:specialization", getPersonalTrainersBySpecializationCon);

// router.get("/experience/:experience", getPersonalTrainersByExperienceCon);

router.post("/", addPersonalTrainerCon);

router.delete("/:trainer_id", deletePersonalTrainerCon);

router.patch("/:trainer_id", updatePersonalTrainerCon);

// router.patch("/email-password/:personal_trainer_id", updatePersonalTrainerEmailPasswordCon);

export default router;