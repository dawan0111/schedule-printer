'use strict';

const createdAt = new Date()
const updatedAt = new Date()

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Printers', [{
      name: 'Sindo1',
      createdAt,
      updatedAt
    }, {
      name: 'Sindo2',
      createdAt,
      updatedAt
    }, {
      name: 'Sindo3',
      createdAt,
      updatedAt
    }, {
      name: 'CubIcon',
      createdAt,
      updatedAt
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Printers', null, {});
  }
};
