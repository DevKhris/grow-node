const sequelize = require("./index").sequelize;
const { Sequelize, Model, DataTypes } = require("sequelize");

class User extends Model {}
User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: "User",
  }
);

module.exports = User;

