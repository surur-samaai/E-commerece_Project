import {getAllWorkoutVideos, getWorkoutVideoById, getWorkoutVideosByCategory, addWorkoutVideo, deleteWorkoutVideo, updateWorkoutVideo} from "../Models/workoutVideos_db.js";

const getAllWorkoutVideosCon = async (req, res) => {
    try {
        res.json(await getAllWorkoutVideos());
    } catch (err) {
        console.log(err);
    }
}

const getWorkoutVideosByIdCon = async (req, res) => {
    try {
        res.json(await getWorkoutVideoById(req.params.video_id));
    } catch (err) {
        console.log(err);
    }
}


const getWorkoutVideosByCategoryCon = async (req, res) => {
    try {
        res.json(await getWorkoutVideosByCategory(req.params.category));
    } catch (err) {
        console.log(err);
    }
}


const addWorkoutVideoCon = async (req, res) => {
    try {
        await addWorkoutVideo(req.body);
        res.json({
            message:"Workout video added successfully"
        });
    } catch (err) {
        console.log(err);
    }
}


const deleteWorkoutVideoCon = async (req, res) => {
    try {
        await deleteWorkoutVideo(req.params.video_id);
        res.json({
            message:"Workout video deleted successfully"
        });
    } catch (err) {
        console.log(err);
    }
}


const updateWorkoutVideoCon = async (req, res) => {
    try {
        await updateWorkoutVideo(req.params.video_id, req.body);
        res.json({
            message:"Workout video updated successfully"
        });
    } catch (err) {
        console.log(err);
    }
}

export {getAllWorkoutVideosCon, getWorkoutVideosByIdCon, getWorkoutVideosByCategoryCon, addWorkoutVideoCon, deleteWorkoutVideoCon, updateWorkoutVideoCon};