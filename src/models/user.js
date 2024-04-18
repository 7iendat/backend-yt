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
        foreignKey: "roleId",
      });

      this.hasMany(models.Playlist, {
        as: "playlists",
        foreignKey: "playlistId",
      });
    }
  }
  User.init(
    {
      password: DataTypes.STRING,
      userName: DataTypes.STRING,
      isLoginGoogle: DataTypes.BOOLEAN,
      image: DataTypes.STRING,
      displayName: DataTypes.STRING,
      isDelete: DataTypes.BOOLEAN,
      roleId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
