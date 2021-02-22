'use strict';

const createdAt = new Date()
const updatedAt = new Date()

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Printers', [{
      name: 'Sindo1',
      standardDate: createdAt,
      createdAt,
      updatedAt
    }, {
      name: 'Sindo2',
      standardDate: createdAt,
      createdAt,
      updatedAt
    }, {
      name: 'Sindo3',
      standardDate: createdAt,
      createdAt,
      updatedAt
    }, {
      name: 'CubIcon',
      standardDate: createdAt,
      createdAt,
      updatedAt
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Printers', null, {});
  }
};
