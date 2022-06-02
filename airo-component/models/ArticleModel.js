module.exports = (sequelize, DataTypes) => {
    const ArticleModel = sequelize.define('ArticleModel', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
          },
          judul: {
            type: DataTypes.STRING,
            allowNull: false
          },
          image_url: {
            type: DataTypes.INTEGER,
          },
          isi_artikel: {
            type: DataTypes.STRING,
            allowNull: false
          },
          createdAt: {
            type: DataTypes.DATE,
            allowNull: false
          },
          updatedAt: {
            type: DataTypes.DATE,
            allowNull: false
          }
    }, {
      tableName: 'article'
    });
  
    return ArticleModel;
  };