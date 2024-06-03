"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Role, {
        as: "role",
        foreignKey: "id",
      });

      this.hasMany(models.Playlist, {
        as: "playlists",
        foreignKey: "id",
      });
    }
  }
  User.init(
    {
      password: DataTypes.STRING,
      userName: DataTypes.STRING,
      isLoginGoogle: { type: DataTypes.BOOLEAN, defaultValue: false },
      image: { type: DataTypes.STRING, defaultValue: "" },
      displayName: DataTypes.STRING,
      isDelete: { type: DataTypes.BOOLEAN, defaultValue: false },
      roleId: { type: DataTypes.INTEGER, defaultValue: 2 },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
