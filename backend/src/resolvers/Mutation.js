const { forwardTo } = require('prisma-binding');

const Mutations = {
  createUser: forwardTo('db'),
  deleteUser: forwardTo('db'),
  updateUser: forwardTo('db'),
};

module.exports = Mutations;
