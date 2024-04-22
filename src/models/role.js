"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.User, {
        as: "users",
        foreignKey: "id",
      });
    }
  }
  Role.init(
    {
      roleName: DataTypes.STRING,
      isDelete: { type: DataTypes.BOOLEAN, default: false },
    },
    {
      sequelize,
      modelName: "Role",
    }
  );
  return Role;
};
