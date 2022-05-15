import jwt from "jsonwebtoken";
import {createError} from '../utils/error.js';


export const verifyToken = (req, res, next) => {
    // obtener las cookies de seccion
    const token = req.cookies.access_token;

    //validar si existe un token valido
    if(!token) {
        return next(createError(401, "you are not authenticated!"));
    }


    // validar el token 
    jwt.verify(token, process.env.SECRET, (err, user) => {
        if (err) next(createError(403, "the token is not valid!"));
        req.user = user;
        next();
    });


}

export const verifyUser = (req, res, next) => {
     verifyToken(req, res, next,   () => {
        if(req.user.id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            next(createError(403, "you are not authorized!"));
        }
     });
}

export const verifyAdmin = (req, res, next) => {
     verifyToken(req, res, next, () => {
        if(req.user.isAdmin === true) {
            next();
        } else {
            next(createError(403, "you are not authorized!"));
        }
     });
}
