const { ApolloServer } = require('apollo-server-express')
const express = require('express')
const AuthService = require('./services/auth.service');


const server = new ApolloServer({
    modules: [
        require('./graphql-modules/user'),
        require('./graphql-modules/token'),
        require('./graphql-modules/places_visited'),
        require('./graphql-modules/place_living'),
        require('./graphql-modules/interests'),
        require('./graphql-modules/place_visiting')

    ],
    context: ({ req }) => {
        let token = req.headers.authorization;
        if (token) {
            return AuthService.verifyToken(token)
        }
    },
    introspection: true,
    playground: true

})

const app = express();

server.applyMiddleware({ app, path: '/graphql' });

app.listen(8080, () => {
    var env = process.env.NODE_ENV || 'dev';
    if (env == 'dev') {
        console.log("Running on development evironment")
        console.log("Playground is up at localhost:8080/graphql")
    } else if (env.toLowerCase() == 'production') {
        console.log("Running on production evironment")
        console.log("Go to /graphql to see the playground")
    } else if (env.toLowerCase() == 'test') {
        console.log("Running on test environment")
        console.log("Playground is up at localhost:8080/graphql")
    }
}) 