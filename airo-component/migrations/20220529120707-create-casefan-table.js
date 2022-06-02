'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.createTable('casefandata', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      price_idr: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      brand: {
        type: Sequelize.STRING,
        allowNull: false
      },
      airflow: {
        type: Sequelize.STRING,
        allowNull: false
      },
      color: {
        type: Sequelize.STRING,
      },
      noise_level: {
        type: Sequelize.STRING,
        allowNull: false
      },
      pwm: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      rpm: {
        type: Sequelize.STRING,
        allowNull: false
      },
      size: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('casefandata'); 
  }
};
