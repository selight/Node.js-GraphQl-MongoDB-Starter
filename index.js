const dotEnv = require("dotenv");
const mongoose = require("mongoose");
const {ApolloServer} = require('apollo-server-express');
const express = require('express');
const resolvers = require('./graphql/resolvers/user');
const typeDefs = require('./graphql/typeDefs/user');
const bodyParser = require('body-parser');
const {error, success,} = require('consola');


const app = express();
app.use(bodyParser.json());
app.disable("x-powered-by");
dotEnv.config({
    path: "./config.env",
});
//Initialize Apollo server
const server = new ApolloServer({typeDefs, resolvers, playground: true});

const database = process.env.DATABASE.replace(
    "<password>",
    process.env.DATABASE_PASSWORD
);

//Connect to the database
mongoose.connect(database, {useUnifiedTopology: false})
    .then((client) => {
        console.log("Connected to Database");
    })
    .catch((error) => console.error(error));


const port = process.env.PORT;
//redirect express path to graphQL
server.applyMiddleware({
    app,
    path: "/graphql",
});

app.listen(port,
    () =>
        success({
            badge: true,
            message: `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`,
        }));

process.on("uncaughtException", (err) => {
    error({
        badge: true,
        message: `Uncaught exception : ${err}`
    })
    console.log(err.name, err.message);
    process.exit(1);
});

process.on("unhandledRejection", (err) => {
    console.log("UNHANDLED REJECTION!!!  shutting down ...");
    console.log(err);
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});


module.export = app
