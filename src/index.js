const express = require("express");
const app = express();
const {ApolloServer, gql} = require("apollo-server-express");


let notes = [
    { id: '1', content: 'This is a note', author: 'Adam Scott' },
    { id: '2', content: 'This is another note', author: 'Harlow Everly' },
    { id: '3', content: 'Oh hey look, another note!', author: 'Riley Harrison' }
];

const typeDefs = gql`
    type Note {
        id: ID!
        content: String!
        author: String!
    }
    
    type Query {
        hello: String!
        notes: [Note!]!
    }
`;

const resolvers = {
    Query: {
        hello: () => "Hello World!",
        notes: () => notes
    }
}

const server = new ApolloServer({ typeDefs, resolvers });

server.applyMiddleware({app, path: '/api'})
const port = process.env.PORT || 4000;


app.listen(port, () => console.log(`Server running at http://localhost:${port}${server.graphqlPath}`));