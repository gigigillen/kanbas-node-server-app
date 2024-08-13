import mongoose from "mongoose";


const moduleSchema = new mongoose.Schema({
    name: { type: String, unqiue: true },
    description: String,
    course: String,
    lessons: Array
},
    { collection: "modules" }
);

export default moduleSchema;