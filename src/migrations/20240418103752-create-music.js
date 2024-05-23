'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('Music', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      videoId: {
        type: DataTypes.STRING,
        allowNull: true
      },
      channelId: {
        type: DataTypes.STRING,
        allowNull: true
      },
      title: {
        type: DataTypes.STRING,
        allowNull: true
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      thumbnails: {
        type: DataTypes.STRING,
        allowNull: true
      },
      channelTitle: {
        type: DataTypes.STRING,
        allowNull: true
      },
      isDelete: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('Music');
  }
};