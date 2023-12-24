const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize();

class UserModel extends Model {}

UserModel.init(
    {
        id : {
            type: sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        userName: {
            type: sequelize.STRING,
            allowNull: false
        },
        email: {
            type: sequelize.STRING,
            allowNull: false
        },
        hashPassword: {
            type: sequelize.STRING,
            allowNull: false
        },
        isStudent: {
            type: sequelize.BOOLEAN,
            allowNull: false
        }
    }
)