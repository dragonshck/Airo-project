module.exports = (sequelize, DataTypes) => {
    const PowerSupplyModel = sequelize.define('PowerSupplyModel', {
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
        wattage: {
            type: DataTypes.STRING,
            allowNull: false
        },
        modular: {
            type: DataTypes.STRING,
        },
        form_factor: {
            type: DataTypes.STRING,
            allowNull: false
        },
        efficiency_rating: {
            type: DataTypes.STRING,
            allowNull: false
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
        tableName: 'powerSupplyData'
    });

    return PowerSupplyModel;
};