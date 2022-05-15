import { createError } from "../utils/error.js";
import user from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
    try {
        let { username, email, password } = req.body;
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        // crear nuevo usuario 
        const User = new user({
            username,
            email,
            password: hash 
        });

        const newUser = await User.save();


        res.send(newUser);
    } catch (err) {
        next(createError(404, "An error happend!!"));
    }
}

export const login = async (req, res, next) => {
    try {
        let { username } = req.body;

        const User = await user.findOne({username});
        
        if (!User) return next(createError(404, "User not found"));

        // verificar el password
        const isPasswordCorrect = await bcrypt.compare(req.body.password, User.password);
        // validar
        if (!isPasswordCorrect) return next(createError(400, "Password or username incorrect!"));

        // crear token para validar si el usuario es admin
        const token = jwt.sign({id: User._id, isAdmin: User.isAdmin}, process.env.SECRET);

        const {password, isAdmin, ...details} = User._doc;
        // envia la respuesta y una cookie con el token generado
        res.cookie("access_token", token, {
            httpOnly: true
        }).status(200).json({
            message: "Login success",
            ...details
        });
    } catch (err) {
        next(createError(404, "An error happend!!"));
    }
}