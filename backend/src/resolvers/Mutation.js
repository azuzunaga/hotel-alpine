const Mutations = {
  async createUser(parent, args, ctx, info) {
    const user = await ctx.db.mutation.createUser(
      {
        data: {
          ...args,
        },
      },
      info,
    );
    return user;
  },
  async deleteUser(parent, args, ctx, info) {
    const where = { id: args.id };
    return ctx.db.mutation.deleteUser({ where }, info);
  },
};

module.exports = Mutations;
