'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.createTable('article', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      judul: {
        type: Sequelize.STRING,
        allowNull: false
      },
      image_url: {
        type: Sequelize.STRING,
      },
      isi_artikel: {
        type: Sequelize.STRING,
        allowNull: false
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

    await queryInterface.dropTable('article');
  }
};
