'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Historys', 'isDel', {
      type: Sequelize.INTEGER,
      defaultValue: 0
    });
  },
  down: async (queryInterface, Sequelize) => {
    queryInterface.removeColumn('Historys', 'isDel', {});
  }
};