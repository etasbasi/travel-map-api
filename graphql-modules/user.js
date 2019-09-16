const { gql } = require("apollo-server");
const AuthService = require("../services/auth.service");
const UserService = require("../services/users.service");

const typeDefs = gql`
  type Query {
    user(id: Int, username: String): User
    users: [User!]
    getLoggedInUser: User
    test: String!
  }

  type Mutation {
    registerUser(
      username: String!
      full_name: String!
      email: String!
      password: String!
    ): Token
    loginUser(username: String!, password: String!): Token
    deleteUser(id: Int): User
  }

  type User {
    id: Int!
    username: String!
    full_name: String!
    email: String!
    Places_visited: [Place_visited!]
    Place_living: Place_living
    Interests: [Interest!]
    Places_visiting: [Place_visiting!]
  }
`;

const resolvers = {
  Query: {
    test: () => {
      return "THIS IS WORKING";
    },
    user: (_, args) => {
      return UserService.searchUser(args);
    },
    users: (_, args) => {
      return UserService.loadAllUsers(args);
    },
    getLoggedInUser: (_, args, context) => {
      return UserService.getLoggedInUser(context.user_id);
    }
  },
  Mutation: {
    registerUser: (_, args) => {
      return AuthService.registerUser(args);
    },
    loginUser: (_, args) => {
      return AuthService.loginUser(args);
    },
    deleteUser: (_, args, context) => {
      return UserService.deleteUser(context.user_id || args.id);
    }
  }
};

module.exports = {
  typeDefs,
  resolvers
};
