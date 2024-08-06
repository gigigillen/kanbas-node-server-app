// const express = require('express'); // load express
import express from "express";
import Hello from "./hello.js";
import Lab5 from "./Lab5/index.js";
import CourseRoutes from "./Kanbas/Courses/routes.js";
import ModuleRoutes from "./Kanbas/Modules/routes.js";
import cors from "cors";
import AssignmentRoutes from "./Kanbas/Assignments/routes.js";

const app = express();      // create instance
//make open to anybody
app.use(cors());     
app.use(express.json());
// ALL ADDITIONAL WORK COMES AFTER THIS LINE
CourseRoutes(app);
ModuleRoutes(app);
AssignmentRoutes(app);

Hello(app);
Lab5(app);

app.listen(4000);       // listen at port 4000