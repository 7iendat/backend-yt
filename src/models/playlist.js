"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Playlist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, { as: "user", foreignKey: "userId" });
      this.hasMany(models.playlist_music, {
        as: "playlist_musics",
        foreignKey: "playlistId",
      });
    }
  }
  Playlist.init(
    {
      title: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      isDelete: DataTypes.BOOLEAN,
      isPublic: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Playlist",
    }
  );
  return Playlist;
};
