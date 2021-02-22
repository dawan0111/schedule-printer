'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Printer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Printer.init({
    name: DataTypes.STRING,
    standardDate: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'Printer',
  });
  return Printer;
};