module.exports = (sequelize, DataTypes) => {
    const CpuModel = sequelize.define('CpuModel', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
          },
          name: {
            type: DataTypes.STRING,
            allowNull: false
          },
          price_idr: {
            type: DataTypes.INTEGER,
            allowNull: false
          },
          brand: {
            type: DataTypes.STRING,
            allowNull: false
          },
          tdp: {
            type: DataTypes.STRING,
            allowNull: false
          },
          core_clock: {
            type: DataTypes.STRING,
            allowNull: false
          },
          core_count: {
            type: DataTypes.STRING,
            allowNull: false
          },
          is_gaming: {
            type: DataTypes.BOOLEAN,
            allowNull:false
          },
          description: {
            type: DataTypes.STRING,
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
        tableName: 'cpudata'
    });

    return CpuModel;
};