const { forwardTo } = require('prisma-binding');

const Mutations = {
  createUser: forwardTo('db'),
  deleteUser: forwardTo('db'),
  async updateUser(parent, args, ctx, info) {
    const { where, data } = args;
    const { department, location } = data;
    /*
    Check to see if department or location came with data, delete
    if not. This is necessary because both fields reference other
    tables, so they come with a nested object that references the
    id, or just a nested object.
    */
    const depId = department.connect.id;
    const locId = location.connect.id;
    if (!depId) {
      delete data.department;
    }
    if (!locId) {
      delete data.location;
    }

    return ctx.db.mutation.updateUser(
      {
        data,
        where,
      },
      info,
    );
  },
};

module.exports = Mutations;
