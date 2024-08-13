// import Database from "../Database/index.js";
import * as dao from './dao.js';

export default function CourseRoutes(app) {
    // //updating a course
    // app.put("/api/courses/:id", (req, res) => {
    //     const { id } = req.params;
    //     const course = req.body;
    //     Database.courses = Database.courses.map((c) =>
    //         c._id === id ? { ...c, ...course } : c
    //     );
    //     res.sendStatus(204);
    // });
    // //deleting a course
    // app.delete("/api/courses/:id", (req, res) => {
    //     const { id } = req.params;
    //     Database.courses = Database.courses.filter((c) => c._id !== id);
    //     res.sendStatus(204);
    // });
    // //create a course
    // app.post("/api/courses", (req, res) => {
    //     const course = {
    //         ...req.body,
    //         _id: new Date().getTime().toString()
    //     };
    //     Database.courses.push(course);
    //     res.send(course);
    // });
    // //retrieve courses from the server
    // app.get("/api/courses", (req, res) => {
    //     const courses = Database.courses;
    //     res.send(courses);
    // });

    const createCourse = async (req, res) => {
        const course = await dao.createCourse(req.body);
        res.json(course);
    }

    const deleteCourse = async (req, res) => {
        const status = await dao.deleteCourse(req.params.courseId)
        res.json(status);
    };
  

    const findAllCourses = async (req, res) => {
        const courses = await dao.findAllCourses();
        res.json(courses);
    };

    const findCourseById = async (req, res) => {
        const courseId = req.params.courseId;
        const course = await dao.findCourseById(courseId);
        res.json(course);
    };

    // const findCourseByName = async (req, res) => {
    //     const number = req.params.number;
    //     const course = await dao.findCourseByName(number);
    //     res.json(course);
    // }

    const updateCourse = async (req, res) => {
        const { courseId } = req.params;
        const status = await dao.updateCourse(courseId, req.body);
        res.json(status);
    };

    app.post("/api/courses", createCourse);

    app.get("/api/courses", findAllCourses);
    app.get("/api/courses/:courseId", findCourseById);
    // app.get("/api/courses/:number", findCourseByName);

    app.put("/api/courses/:courseId", updateCourse);
    
    app.delete("/api/courses/:courseId", deleteCourse);
}
