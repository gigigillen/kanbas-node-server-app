import model from './model.js'; 

export const createUser = (user) => {
    //ensure it doesn't have a primary key
    delete user._id
    return model.create(user);
  }
  

export const findAllUsers = () => model.find();
export const findUserById = (id) => model.findById(id);
export const findUserByUsername = (username) => model.findOne({ username: username });

//loggin
export const findUserByCredentials = (username, password) =>
    model.findOne({ username, password });

export const findUsersByRole = (role) => model.find( {role: role} );

export const findUsersByPartialName = (partialName) => {
    const regex = new RegExp(partialName, "i"); // 'i' makes it case-insensitive
    return model.find({
        //first or last name can match
      $or: [{ firstName: { $regex: regex } }, { lastName: { $regex: regex } }],
    });
  };
  

//uses id to id user you want to update
//what you pass in is the updated user, what you've altered
//$set updates only fields you've provided
export const updateUser = (userId, user) => model.updateOne({ _id: userId }, { $set: user });

export const deleteUser = (id) => model.deleteOne( {_id: id} );



