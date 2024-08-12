const { Category, Product, User, Order } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    categories: async () => Category.find(),
    products: async (parent, { category, name }) => {
      const parmas = {};

      if (category) {
        parmas.category = category;
      }

      if (name) {
        parmas.name = {
          $regex: name,
        };
      }

      return Product.find(params).populate("category");
    },

    product: async (parent, { id }) =>
      Product.findById(id).populate("category"),

    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user.id).populate({
          path: "orders.products",
          populate: "category",
        });

        user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);

        return user;
      }
      throw AuthenticationError;
    },

    order: async (parent, { id }, context) => {
      if (context.user) {
        const user = await User.findById(context.user.id).populate({
          path: "orders.products",
          populate: "category",
        });

        return user.orders.id(id);
      }

      throw AuthenticationError;
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    addOrder: async (parent, { products }, context) => {
      if (context.user) {
        const order = new Order({ products });

        await User.findByIdAndUpdate(context.user.id, {
          $push: { orders: order },
        });

        return order;
      }
      throw AuthenticationError;
    },
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return User.findByIdAndUpdate(context.user.id, args, {
          new: true,
        });
      }
      throw AuthenticationError;
    },
    updateProduct: async (parent, { id, quantity }) => {
      const decrement = Math.abs(quantity) * -1;

      return Product.findByIdAndUpdate(
        id,
        { $inc: { quantity: decrement } },
        { new: true }
      );
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPassword = await user.isCorrectPassword(password);

      if (!correctPassword) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },
  },
};

module.exports = resolvers;
