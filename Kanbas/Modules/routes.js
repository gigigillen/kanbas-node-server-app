import * as dao from './dao.js';
// import db from "../Database/index.js";

export default function ModuleRoutes(app) {
    // //UPDATE
    // app.put("/api/modules/:mid", (req, res) => {
    //     const { mid } = req.params;
    //     const moduleIndex = db.modules.findIndex(
    //         (m) => m._id === mid);
    //     db.modules[moduleIndex] = {
    //         ...db.modules[moduleIndex],
    //         ...req.body
    //     };
    //     res.sendStatus(204);
    // });


    // //DELETE
    // app.delete("/api/modules/:mid", (req, res) => {
    //     const { mid } = req.params;
    //     db.modules = db.modules.filter((m) => m._id !== mid);
    //     res.sendStatus(200);
    // });


    // //creating a module for a course
    // app.post("/api/courses/:cid/modules", (req, res) => {
    //     //record the cid so we can use to later
    //     const { cid } = req.params;
    //     //create the new module
    //     const newModule = {
    //         ...req.body,
    //         course: cid,
    //         //unique id
    //         _id: new Date().getTime().toString(),
    //     };
    //     //add the new module to the database
    //     db.modules.push(newModule);
    //     //send new module as a response
    //     res.send(newModule);
    // });

    // //retrieve relevant modules for the course
    // app.get("/api/courses/:cid/modules", (req, res) => {
    //     const { cid } = req.params;
    //     const modules = db.modules.filter((m) => m.course === cid);
    //     res.json(modules);
    // });

    const createModule = async (req, res) => {
        const module = await dao.createModule(req.body);
        res.json(module)
    };

    const deleteModule = async (req, res) => {
        const status = await dao.deleteModule(req.params.moduleId);
        res.json(status);
    };
  
    

    const findAllModules = async (req, res) => {
        //if there's a query parameter, then we can filter
        const { number } = req.query;
        if (number) {
            const modules = await dao.findModulesByCourse(number);
            res.json(modules);
            return;
        }
        const modules = await dao.findAllModules();
        res.json(modules);
    };


    const findModuleById = async (req, res) => {
        const moduleId = req.params.moduleId;
        const modules = await dao.findModlesById(moduleId);
        res.json(modules);
    }

    const updateModule = async (req, res) => {
        const { moduleId } = req.params;
        const status = await dao.updateModule(moduleId, req.body);
        res.json(status);
    };

    app.post("/api/modules", createModule);

    app.get("/api/modules", findAllModules);
    app.get("/api/modules/:moduleId", findModuleById);

    app.put("/api/modules/:moduleId", updateModule);

    app.delete("/api/modules/:moduleId", deleteModule);
}
