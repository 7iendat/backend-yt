"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable("Playlist_Musics", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      playlistId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Playlists",
          key: "id",
        },
        allowNull: true
      },
      musicId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Music",
          key: "id",
        },
        allowNull: true
      },
      isDelete: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable("Playlist_Musics");
  },
};
