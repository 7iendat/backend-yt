"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Playlist_Musics", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      playlistId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Playlists",
          key: "id",
        },
        allowNull: false,
      },
      musicId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Music",
          key: "id",
        },
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Playlist_Musics");
  },
};
