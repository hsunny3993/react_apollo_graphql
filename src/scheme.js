const { gql } = require('apollo-server-express');

module.exports = gql`
    scalar DateTime
    
    type Note {
        id: ID!
        content: String!
        author: User!
        favoriteCount: Int!
        favoritedBy: [User!]
        createdAt: DateTime!
        updatedAt: DateTime!
    }
    
    type User {
        id: ID!
        username: String!
        email: String!
        password: String!
        avatar: String!
        notes: [Note!]
        favorites: [Note!]!
        createdAt: DateTime!
        updatedAt: DateTime!
    }
    
    type Query {
        hello: String!
        notes: [Note!]!
        note(id: ID!): Note!
        users: [User!]
        user(username: String!): User!
        me: User!
    }
    
    type Mutation {
        newNote(content: String!, author: String!): Note!
        updateNote(id: ID!, content: String!): Note
        deleteNote(id: ID!): Boolean!
        signUp(username: String!, password: String!, email: String!): String!
        signIn(username: String!, password: String!, email: String!): String!
        toggleFavorite(id: ID!): Note!
    }
`;