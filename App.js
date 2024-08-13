// const express = require('express'); // load express
import "dotenv/config";
import session from "express-session";
import express from "express";
import Hello from "./hello.js";
import Lab5 from "./Lab5/index.js";
import cors from "cors";

import AssignmentRoutes from "./Kanbas/Assignments/routes.js";
import UserRoutes from "./User/routes.js";
import ModuleRoutes from "./Kanbas/Modules/routes.js";

//may have to change where this lives...
import CourseRoutes from "./Kanbas/Courses/routes.js";

//import library
import mongoose from "mongoose";

//same connection string as compass /kanbas for database addition
const CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING || "mongodb://localhost:27017/kanbas";
mongoose.connect(CONNECTION_STRING);


const app = express();      // create instance

//checks to make sure domain is correct
app.use(
    cors({
        //keeping track of credentials
        credentials: true,
        origin: process.env.NETLIFY_URL || "http://localhost:3000",
    })
);

const sessionOptions = {
    secret: process.env.SESSION_SECRET || "kanbas",
    resave: false,
    saveUninitialized: false,
};

if (process.env.NODE_ENV !== "development") {
    //telling server to trust middle man
    sessionOptions.proxy = true;
    //turn on: this can be encrypted
    sessionOptions.cookie = {
        sameSite: "none",
        secure: true,
        //domain we're running on
        domain: process.env.NODE_SERVER_DOMAIN,
    };
}
app.use(session(sessionOptions));

app.use(express.json());
// ALL ADDITIONAL WORK COMES AFTER THIS LINE
Hello(app);
Lab5(app);
UserRoutes(app);
CourseRoutes(app);
ModuleRoutes(app);
AssignmentRoutes(app);

app.listen(4000);       // listen at port 4000