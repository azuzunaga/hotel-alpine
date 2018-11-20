const { forwardTo } = require('prisma-binding');

const Query = {
  locations: forwardTo('db'),
  departments: forwardTo('db'),
  user: forwardTo('db'),
  async users(parent, args, ctx, info) {
    const { search } = args;
    return ctx.db.query.users({
      orderBy: 'name_ASC',
      where: {
        OR: [
          { name_contains: search },
          {
            department: {
              name_contains: search,
            },
          },
          {
            location: {
              city_contains: search,
            },
          },
        ],
      },
    }, info);
  },
};

module.exports = Query;

// const departments = await ctx.db.query.departments(
//   {
//     where: {
//       name_contains: data.name,
//     },
//   },
// );
