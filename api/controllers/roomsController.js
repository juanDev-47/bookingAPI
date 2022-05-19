import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";
import { createError } from "../utils/error.js";



// created method for room
const createRoom = async (req, res, next) => {
    const hotelId = req.params.hotelId;
    const newRoom = new Room(req.body);

    try {
        const saveRoom = await newRoom.save();
        try {
            await Hotel.findByIdAndUpdate(hotelId,{$push: {rooms: saveRoom._id}}) 
        } catch (err) {
            next(err);
        }
        res.status(200).json(saveRoom);
    } catch (err) {
        next(err)
    }
    
}

// method for update room
const updateRoom = async (req, res) => {
    let data2 = req.params; // get id 
    let data = req.body; // get data to update
    const {id} = data2;
    
    try {
        const response = await Room.findByIdAndUpdate({_id: id}, data, {new: true});

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json(error);
        console.log(error)
    }
}

// method for delete Room
const deleteRoom = async (req, res) => {
    const hotelId = req.params.hotelId;
    let data = req.params; // get id 
    const {id} = data;

    try {
        const response = await Room.findByIdAndDelete({_id: id});

        try {
            await Hotel.findByIdAndUpdate(hotelId,{$pull: {rooms: req.params.id}}) 
        } catch (err) {
            next(err);
        }

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json(error);
        console.log(error)
    }
}

// method for get Room
const getRoom = async (req, res, next) => {
    let data = req.params; // get id 
    const {id} = data;

    try {
        const response = await Room.findOne({_id: id});

        res.status(200).json(response);
    } catch (err) {
        // se usa el next para enviar mediante createError los valores para manejar el error
        // para lo cual se usa un middleware y se lleva a un manejo adecuado de los errores
        next(createError(404, "An error happend!!"));
    }
}

// method for get Rooms
const getRooms = async (req, res, next) => {

    try {
        const response = await Room.find({});

        res.status(200).json(response);
    } catch (err) {
        res.status(500).json(error);
        console.log(error)
    }
}


export default { createRoom, updateRoom, deleteRoom, getRoom, getRooms };


