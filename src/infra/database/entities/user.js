const sequelize = require("./index").sequelize;
const { Sequelize, Model, DataTypes } = require("sequelize");

class User extends Model {}
User.init(
  {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: "User",
  }
);

module.exports = User;
