import { Op } from 'sequelize';
import bcrypt from 'bcrypt';
import userModel from "../../../DB/Models/User.model.js";

export const signUp = async (req, res, next) => {
  try {
    const { name, email, password, age } = req.body;
    const user = await userModel.create({name, email, password, age});
    return res.json({Message: "User Added", user});
  } catch (error) {
    if (error.original?.errno == 1062) {
      return res.json({Message: "Email Already Exist"});
    }
    return res.json({Message: "Error" , error, errorMessage:error.Message, stack:error.stack});
  }; 
};

export const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ where: { email } });
    if (!user) {
      return res.json({ message: "User not found" });
    }
    const passwordMatch = bcrypt.compare(password, user.password);
    if (passwordMatch) {
      return res.json({ message: "Sign-in successful", user });
    } else {
      return res.json({ message: "Incorrect password" });
    }
  } catch (error) {
    console.error('Error in sign-in API:', error);
    return res.json({ message: "Error", error, errorMessage: error.message, stack: error.stack });
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email, password, age } = req.body;
    const user = await userModel.update({ name, email, password, age }, {
      where:{
        id
      } 
  });
    return user[0]? res.json({Message:"Done", user}):res.json({Message:"Invalid Id"});  
  } catch (error) {
    return res.json({Message: "Error" , error, errorMessage:error.Message, stack:error.stack});
  };
};

export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await userModel.destroy({
      where:{
        id
      } 
  });
    return user[0]? res.json({Message:"Done", user}):res.json({Message:"Invalid Id"});  
  } catch (error) {
    return res.json({Message: "Error" , error, errorMessage:error.Message, stack:error.stack});
  };
};

export const searchWithName = async (req, res) => {
  try {
    const users = await userModel.findAll({
      where: {
        name: {
          [Op.startsWith]: 'A',
        },
        age: {
          [Op.lt]: 30,
        },
      },
    });
    res.json({ Message: "Done", users });
  } catch (error) {
    res.json({ message: 'Catch error', error });
  }
};

export const searchInAgeRange = async (req, res, next) => {
  try {
    const usersInAgeRange = await userModel.findAll({
      where: {
        age: {
          [Op.between]:[20 , 30]
        },
      },
    });
    res.json({ Message:"Done", usersInAgeRange });
  } catch (error) {
    res.json({ message: 'Catch error', error });
  }
};

export const oldestThreeUser = async (req, res, next) => {
  try {
    const oldestUsers = await userModel.findAll({
      order: [['age', 'DESC']],
      limit: 3,
    });
    res.json({ oldestUsers });
  } catch (error) {
    res.json({ message: 'Catch error', error });
  }
};

export const searchByIdUsingIn = async (req, res) => {
  try {
    const users = await userModel.findAll({
      where: {
        id: {
          [Op.in]: [1,4]
        },
      },
    });
    res.json({Message:"Done" , users});
  } catch (error) {
    res.json({ message: 'Catch error', error });
  }
};

export const getALlUsers = async (req, res, next) => {
  const users = await userModel.findAll({});
  res.json({Message:"Done", users});
};
