import express from "express";
import dotenv from "dotenv";
import db from "./api/config/db.js";
import auth from "./api/routes/auth.js";
import hotels from "./api/routes/hotels.js";
import rooms from "./api/routes/rooms.js";
import users from "./api/routes/users.js";
import cookieParser from "cookie-parser";

// for no using this way, put in package.json a tag => "type": "module"
// const express = require('express');
const port = process.env.PORT || 4000;
db();

dotenv.config();


const app = express();

app.use(express.json({limit: "60mb"}));

// middlewares

// using cookie parser
app.use(cookieParser());

// routes
app.use("/auth", auth);
app.use("/hotels", hotels);
app.use("/rooms", rooms);
app.use("/users", users);

// error handling
app.use( (err,req,res,next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!!!";

    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack
    });

});

// end middlewares

app.listen(port || 4000, () => {
    console.log(`connect to server in port ${port}`);
});
