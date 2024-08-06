import db from "../Database/index.js";

export default function AssignmentRoutes(app) {

    //UPDATING ASSIGNMENTS
    app.put("/api/assignments/:aid", (req, res) => {
        const { aid } = req.params;
        const assignmentIndex = db.assignments.findIndex(
            (assignment) => assignment._id === aid);
            db.assignments[assignmentIndex] = {
                ...db.assignments[assignmentIndex],
                ...req.body,
            };
            res.sendStatus(204);
    });
    
    
    //DELETE ASSIGNMENT
    app.delete("/api/assignments/:aid", (req, res) => {
        const { aid } = req.params;
        db.assignments = db.assignments.filter((assignment) => assignment._id !== aid);
        res.sendStatus(200);
    });

    //CREATE ASSIGNMENT
    app.post("/api/courses/:cid/assignments", (req, res) => {
        const { cid } = req.params;
        const newAssignment = {
            ...req.body,
            _id: new Date().getTime().toString(),
            course: cid,
        };
        db.assignments.push(newAssignment);
        res.send(newAssignment);
    });


    app.get("/api/courses/:cid/assignments", (req, res) => {
        const { cid } = req.params;
        //only show relevant assignments
        const assignments = db.assignments.filter((assignment) => assignment.course === cid);
        res.json(assignments);
    });
}