"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Playlist_Music extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Music, { foreignKey: "musicId", as: "music" }); //
      this.belongsTo(models.Playlist, {
        foreignKey: "playlistId",
        as: "playlists",
      }); //
    }
  }
  Playlist_Music.init(
    {
      playlistId: DataTypes.INTEGER,
      musicId: DataTypes.INTEGER,
      isDelete: DataTypes.BOOLEAN
    },
    {
      sequelize,
      modelName: "Playlist_Music",
    }
  );
  return Playlist_Music;
};
