import { DataTypes } from 'sequelize';
import { sequelize } from '../connection.js';
import NoteModel from '../Models/Note.model.js'

const userModel = sequelize.define('User', {
  name:{
    type:DataTypes.STRING(150),
    allowNull:false
  },
  email:{
    type:DataTypes.STRING(250),
    unique:true,
    allowNull:false
  },
  password:{
    type:DataTypes.STRING(100),
    allowNull:false
  },
  age:{
    type:DataTypes.INTEGER,
    allowNull:true
  }
});

userModel.hasMany(NoteModel , {
  onDelete:'CASCADE',
  onUpdate:'CASCADE'
});
NoteModel.belongsTo(userModel , {
  onDelete:'CASCADE',
  onUpdate:'CASCADE'
});

export default userModel;