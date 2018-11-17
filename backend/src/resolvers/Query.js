const { forwardTo } = require('prisma-binding');

const Query = {
  locations: forwardTo('db'),
  department: forwardTo('db'),
};

module.exports = Query;
