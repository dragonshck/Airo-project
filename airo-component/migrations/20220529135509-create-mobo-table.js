'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

     await queryInterface.createTable('mobodata', { 
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
      color: {
        type: Sequelize.STRING,
      },
      form_factor: {
        type: Sequelize.STRING,
        allowNull: false
      },
      max_memory: {
        type: Sequelize.STRING,
        allowNull: false
      },
      socket_cpu: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.STRING,
      }
,      createdAt: {
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

     await queryInterface.dropTable('mobodata');

  }
};
