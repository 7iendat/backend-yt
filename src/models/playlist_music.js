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
      this.belongsTo(models.Music, { foreignKey: "id", as: "music" }); //
      this.belongsTo(models.Playlist, {
        foreignKey: "id",
        as: "playlists",
      }); //
    }
  }
  Playlist_Music.init(
    {
      playlistId: DataTypes.INTEGER,
      musicId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Playlist_Music",
    }
  );
  return Playlist_Music;
};
