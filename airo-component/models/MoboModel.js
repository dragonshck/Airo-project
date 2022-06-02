module.exports = (sequelize, DataTypes) => {
    const MoboModel = sequelize.define('MoboModel', {
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
        form_factor: {
            type: DataTypes.STRING,
            allowNull: false
        },
        max_memory: {
            type: DataTypes.STRING,
            allowNull: false
        },
        socket_cpu: {
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
        tableName: 'mobodata'
    });

    return MoboModel;
};