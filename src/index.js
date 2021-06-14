require('dotenv').config();

const express = require("express");
const app = express();
const {ApolloServer} = require("apollo-server-express");
const typeDefs = require("./scheme");
const db = require('./db');
const models = require("./models");
const resolvers = require("./resolvers");


const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => {
        return {models};
    }
});

server.applyMiddleware({app, path: '/api'})
const port = process.env.PORT || 4000;
const db_host = process.env.DB_HOST;

db.connect(db_host);


app.listen(port, () => console.log(`Server running at http://localhost:${port}${server.graphqlPath}`));