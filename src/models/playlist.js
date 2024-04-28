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

      this.belongsTo(models.User, { as: "user", foreignKey: "id" });
      this.belongsToMany(models.Music, {
        through: models.Playlist_Music,
        uniqueKey: 'playlistId',
      });
      this.hasMany(models.Playlist_Music, {
        as: "playlist_musics",
        foreignKey: "id",
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
