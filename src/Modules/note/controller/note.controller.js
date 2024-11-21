import noteModel from '../../../DB/Models/Note.model.js';
import userModel from '../../../DB/Models/User.model.js';

export const addNote = async (req, res, next) => {
  try {
    const { name, Description, price, UserId } = req.body;
    const note = await noteModel.create({name, Description, price, UserId});
    return res.json({Message: "Note Added", note});
  } catch (error) {
    if (error.original?.errno == 1452) {
      return res.json({Message: "Note Already Exist"});
    }
    return res.json({Message: "Error" , error, errorMessage:error.Message, stack:error.stack});
  }; 
};

export const deleteNote = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await noteModel.destroy({
      where:{
        id
      } 
  });
    return user[0]? res.json({Message:"Done", user}):res.json({Message:"Invalid Id"});  
  } catch (error) {
    return res.json({Message: "Error" , error, errorMessage:error.Message, stack:error.stack});
  };
};

export const updateNote = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, Description, price, UserId } = req.body;
    const note = await noteModel.update({ name, Description, price, UserId }, {
      where:{
        id
      } 
  });
    return note[0]? res.json({Message:"Done", note}):res.json({Message:"Invalid Id"});  
  } catch (error) {
    return res.json({Message: "Error" , error, errorMessage:error.Message, stack:error.stack});
  };
};

export const getAllNotes = async (req, res, next) => {
  const notes = await noteModel.findAll({});
  res.json({Message:"Done", notes});
};

export const getNotes = async (req, res, next) => {
  const notes = await noteModel.findAll({
    attributes:['name'],
    include: {
      model: userModel,
      attributes:[ 'name', 'email']
    }
  });
  res.json({Message:"Done", notes});
};