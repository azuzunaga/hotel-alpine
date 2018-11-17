const { forwardTo } = require('prisma-binding');

const Query = {
  locations: forwardTo('db'),
  departments: forwardTo('db'),
};

module.exports = Query;
