const { forwardTo } = require('prisma-binding');

const Mutations = {
  createUser: forwardTo('db'),
  deleteUser: forwardTo('db'),
};

module.exports = Mutations;
