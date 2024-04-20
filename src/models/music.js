"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Music extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Playlist_Music, {
        as: "playlist_musics",
        foreignKey: "musicId",
      });
    }
  }
  Music.init(
    {
      videoId: DataTypes.STRING,
      channelId: DataTypes.STRING,
      title: DataTypes.STRING,
      thumbnails: DataTypes.STRING,
      channelTitle: DataTypes.STRING,
      isDelete: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Music",
    }
  );
  return Music;
};
