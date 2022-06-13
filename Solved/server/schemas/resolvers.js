const { AuthenticationError } = require('apollo-server-express');
const { User, Memory } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('memories');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('memories');
    },
    memories: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Memory.find(params).sort({ createdAt: -1 });
    },
    memory: async (parent, { memoryId }) => {
      return Memory.findOne({ _id: memoryId });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('memories');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    addMemory: async (parent, { memoryText }, context) => {
      if (context.user) {
        const memory = await Memory.create({
          memoryText,
          memoryAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { memories: memory._id } }
        );

        return memory;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    addComment: async (parent, { memoryId, commentText }, context) => {
      if (context.user) {
        return Memory.findOneAndUpdate(
          { _id: memoryId },
          {
            $addToSet: {
              comments: { commentText, commentAuthor: context.user.username },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removeMemory: async (parent, { memoryId }, context) => {
      if (context.user) {
        const memory = await Memory.findOneAndDelete({
          _id: memoryId,
          memoryAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { memories: memory._id } }
        );

        return memory;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removeComment: async (parent, { memoryId, commentId }, context) => {
      if (context.user) {
        return Memory.findOneAndUpdate(
          { _id: memoryId },
          {
            $pull: {
              comments: {
                _id: commentId,
                commentAuthor: context.user.username,
              },
            },
          },
          { new: true }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

module.exports = resolvers;
