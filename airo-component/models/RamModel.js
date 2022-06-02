module.exports = (sequelize, DataTypes) => {
    const RamModel = sequelize.define('RamModel', {
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
        color: {
            type: DataTypes.STRING,
        },
        modules: {
            type: DataTypes.STRING,
            allowNull: false
        },
        speed: {
            type: DataTypes.STRING,
            allowNull: false
        },
        is_gaming: {
            type: DataTypes.BOOLEAN,
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
        tableName: 'ramData'
    });

    return RamModel;
};