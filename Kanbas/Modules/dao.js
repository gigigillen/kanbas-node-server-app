import model from './model.js';

export const createModule = (module) => {
  //ensure it doesn't have a primary key
  delete module._id
  return model.create(module);
}

export const findAllModules = () => model.find();

export const findModlesById = (moduleId) => model.findById(moduleId);


// export const findModuleByName = (name) => {
//     model.findOne({ name: name });
// }

export const findModuleByPartialName = (partialName) => {
  const regex = new RegExp(partialName, "i"); // 'i' makes it case-insensitive
  return model.find({
    //first or last name can match
    $or: [{ name: { $regex: regex } }],
  });
};

export const updateModule = (moduleId, module) => {
  model.updateOne({ _id: moduleId }, { $set: module })
};

export const deleteModule = (moduleId) => model.deleteOne({ _id: moduleId })

export const findModulesByCourse = (course) => {
  model.find({ number: course })
};
