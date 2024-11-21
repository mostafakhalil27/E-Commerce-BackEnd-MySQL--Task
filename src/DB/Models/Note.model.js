import { DataTypes } from 'sequelize';
import { sequelize } from '../connection.js';

const NoteModel = sequelize.define('Note', {
  name:{
    type:DataTypes.STRING(100),
    allowNull:false
  },
  Description:{
    type:DataTypes.STRING(300),
    allowNull:false
  },
  price:{
    type:DataTypes.FLOAT,
    allowNull:false
  },
});

export default NoteModel;