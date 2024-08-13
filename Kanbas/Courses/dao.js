import model from './model.js'; 

export const createCourse = (course) => {
    delete course._id;
    return model.create(course);
}

//finding all courses
export const findAllCourses = () => model.find();

export const findCourseById = (id) => model.findById(id);

// export const findCourseByName = (number) => model.findOne({ number: number });

//for search bar
export const findCourseByPartialName = (partialName) => {
    const regex = new RegExp(partialName, "i"); // 'i' makes it case-insensitive
    return model.find({
        //first or last name can match
        $or: [{ name: { $regex: regex } }],
    });
};


export const updateCourse = (courseId, course) => model.updateOne({ _id: courseId }, { $set: course });

export const deleteCourse = (courseId) => model.deleteOne({ _id: courseId});