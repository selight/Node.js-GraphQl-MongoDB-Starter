const {gql} =require("apollo-server-express");

module.exports = gql `
    type User {
        id: ID!
        email:String!
        password:String!
        username:String!
    }
    type Query {
        authUser: User!
        hello:String
    }
`