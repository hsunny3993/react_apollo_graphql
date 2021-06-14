require('dotenv').config();

const express = require("express");
const jwt = require("jsonwebtoken");
const {ApolloServer} = require("apollo-server-express");
const typeDefs = require("./scheme");
const db = require('./db');
const models = require("./models");
const resolvers = require("./resolvers");


const app = express();
const port = process.env.PORT || 4000;
const db_host = process.env.DB_HOST;

const getUser = token => {
    if (token) {
        try {
            return jwt.verify(token,  process.env.JWT_SECRET);
        } catch (e) {
            throw new Error("Session invalid!");
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({req}) => {
        const token = req.headers.authorization;
        const user = getUser(token);

        console.log(user);
        return {models, user};
    }
});

server.applyMiddleware({app, path: '/api'})

db.connect(db_host);

app.listen(port, () => console.log(`Server running at http://localhost:${port}${server.graphqlPath}`));