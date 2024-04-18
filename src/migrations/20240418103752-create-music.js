'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Music', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      videoId: {
        type: Sequelize.STRING
      },
      channelId: {
        type: Sequelize.STRING
      },
      title: {
        type: Sequelize.STRING
      },
      thumbnails: {
        type: Sequelize.STRING
      },
      channelTitle: {
        type: Sequelize.STRING
      },
      isDelete: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Music');
  }
};