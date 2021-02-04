'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Historys extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models["Users"], {
        foreignKey: 'userId',
        targetKey: 'userId'
      })
      // define association here
    }
  };
  Historys.init({
    userId: DataTypes.STRING,
    printerId: DataTypes.INTEGER,
    userName: DataTypes.STRING,
    userPhone: DataTypes.STRING,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Historys',
  });
  return Historys;
};