import Hotel from "../models/Hotel.js";
import { createError } from "../utils/error.js";

// created method
const createHotel = async (req, res) => {
    let data = req.body; // get data to transform 
    
    // validate data
    try {
        const hotel = new Hotel(data); // create hotel instance with data
        const response = await hotel.save();

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json(error);
        console.log(error)
    }
}

// method for update hotel
const updateHotel = async (req, res) => {
    let data2 = req.params; // get id 
    let data = req.body; // get data to update
    const {id} = data2;
    
    try {
        const response = await Hotel.findByIdAndUpdate({_id: id}, data, {new: true});

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json(error);
        console.log(error)
    }
}

// method for delete Hotel
const deleteHotel = async (req, res) => {
    let data = req.params; // get id 
    const {id} = data;

    try {
        const response = await Hotel.findByIdAndDelete({_id: id});

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json(error);
        console.log(error)
    }
}

// method for delete Hotel
const getHotel = async (req, res, next) => {
    let data = req.params; // get id 
    const {id} = data;

    try {
        const response = await Hotel.findOne({_id: id});

        res.status(200).json(response);
    } catch (err) {
        // se usa el next para enviar mediante createError los valores para manejar el error
        // para lo cual se usa un middleware y se lleva a un manejo adecuado de los errores
        next(createError(404, "An error happend!!"));
    }
}

// method for delete Hotel
const getHotels = async (req, res, next) => {

    try {
        const response = await Hotel.find({});

        res.status(200).json(response);
    } catch (err) {
        res.status(500).json(error);
        console.log(error)
    }
}


export default { createHotel, updateHotel, deleteHotel, getHotel, getHotels };