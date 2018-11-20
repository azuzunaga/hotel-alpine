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
    const { id: depId } = department.connect;
    const { id: locId } = location.connect;
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
  async createDepartment(parent, args, ctx, info) {
    const { data } = args;
    const departments = await ctx.db.query.departments(
      {
        where: {
          name_contains: data.name,
        },
      },
    );
    if (departments.length !== 0) {
      throw new Error('A department with that name already exists');
    }
    return ctx.db.mutation.createDepartment(
      {
        data,
      },
      info,
    );
  },
};

module.exports = Mutations;
