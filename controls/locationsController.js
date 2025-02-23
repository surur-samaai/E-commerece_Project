import {getAllLocations, getLocationById, getLocationByCity, getLocationByProvince, addLocation, deleteLocation, updateLocation} from "../Models/locations_db.js";

const getAllLocationsCon = async (req, res) => {
    try {
        res.json(await getAllLocations());
    } catch (err) {
        console.log(err);
    }
}

const getLocationbyIdCon = async (req, res) => {
    try {
        res.json(await getLocationById(req.params.location_id));
    } catch (err) {
        console.log(err);
    }
}

const getLocationByCityCon = async (req, res) => {
    try {
        res.json(await getLocationByCity(req.params.city));
    } catch (err) {
        console.log(err);
    }
}

const getLocationByProvinceCon = async (req, res) => {
    try {
        res.json(await getLocationByProvince(req.params.province));
    } catch (err) {
        console.log(err);
    }
}

const addLocationCon = async (req, res) => {
    try {
        await addLocation(req.body);
        res.json({
            message:"Location added successfully"
        });
    } catch (err) {
        console.log(err);
    }
}

const deleteLocationCon = async (req, res) => {
    try {
        await deleteLocation(req.params.location_id);
        res.json({
            message:"Location deleted successfully"
        });
    } catch (err) {
        console.log(err);
    }
}

const updateLocationCon = async (req, res) => {
    try {
        await updateLocation(req.params.location_id, req.body);
        res.json({
            message:"Location updated successfully"
        });
    } catch (err) {
        console.log(err);
    }
}

export {getAllLocationsCon, getLocationbyIdCon, getLocationByCityCon, getLocationByProvinceCon, addLocationCon, deleteLocationCon, updateLocationCon};
