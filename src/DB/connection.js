import { Sequelize } from "sequelize";

export const sequelize = new Sequelize ('Assignment5', 'root', '', {
  host:'localhost',
  dialect:'mysql'
});

export const connection = async () => {
  return await sequelize.sync({ alter: true, force:false}).then(result => {
    console.log("Connected To DB");
  }).catch(error => {
    console.log("Fail TO Connect TO DB");
  });
};