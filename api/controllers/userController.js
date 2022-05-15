import User from "../models/User.js";
import { createError } from "../utils/error.js";

// created method
export const createUser = async (req, res, next) => {
    let data = req.body; // get data to transform 
    
    // validate data
    try {
        const user = new User(data); // create User instance with data
        const response = await user.save();

        res.status(200).json(response);
    } catch (err) {
        next(createError(500, "Cannot create user, verificated inputs"));
    }
}

// method for update hotel
export const updateUser = async (req, res) => {
    let data2 = req.params; // get id 
    let data = req.body; // get data to update
    const {id} = data2;
    
    try {
        const response = await User.findByIdAndUpdate({_id: id}, data, {new: true});

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json(error);
        console.log(error)
    }
}

// method for delete User
export const deleteUser = async (req, res) => {
    let data = req.params; // get id 
    const {id} = data;

    try {
        const response = await User.findByIdAndDelete({_id: id});

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json(error);
        console.log(error)
    }
}

// method for delete User
export const getUser = async (req, res, next) => {
    let data = req.params; // get id 
    const {id} = data;

    try {
        const response = await User.findOne({_id: id});

        res.status(200).json(response);
    } catch (err) {
        // se usa el next para enviar mediante createError los valores para manejar el error
        // para lo cual se usa un middleware y se lleva a un manejo adecuado de los errores
        next(createError(404, "An error happend!!"));
    }
}

// method for delete User
export const getUsers = async (req, res, next) => {

    try {
        const response = await User.find({});

        res.status(200).json(response);
    } catch (err) {
        res.status(500).json(error);
        console.log(error)
    }
}
