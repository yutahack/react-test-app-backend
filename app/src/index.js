const app = require("express")();
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const cors = require("cors");
const config = require("./config/consts");
const schema = require("./schema");
const resolver = require("./resolver");
const pg = require("./pg/pg");

// const port = config.GQL_API_BOOKS_PORT;
// const name = config.GQL_API_BOOKS_NAME;
const port = 4000;

const books = [
    {
        isbn: "978-111",
        title: "Web API Design Handbook",
        authors: ["George Reese", "Christian Reilly"],
        price: 4.99,
    },
    {
        isbn: "978-222",
        title: "React Programming Basics",
        authors: ["Eric Freeman", "Elisabeth Robson"],
        price: 38.97,
    },
    {
        isbn: "978-333",
        title: "GraphQL in Depth",
        authors: ["Matthias Biehl"],
        price: 9.99,
    },
];

// const BookQuery = (args) => {
//     const isbn = args.isbn;
//     return books.filter((Book) => Book.isbn === isbn)[0];
// };

// const BooksQuery = (args) => {
//     if (args.title) {
//         const title = args.title;
//         return books.filter((Book) => Book.title.match(new RegExp(title)));
//     }
//     return books;
// };

// const resolvers = {
//     events: async (_, context) => {
//         const { db } = await context();
//         return db.collection("events").find().toArray();
//     },
//     event: async ({ id }, context) => {
//         console.log("EVENT!!!!!!!!!!!!");
//         const { db } = await context();
//         return db.collection("events").findOne({ id });
//     },

//     Book: async () => {
//         console.log("bbbbbbok!");
//         return;
//     },
// };

app.use(cors());
app.use(
    "/gql",
    graphqlHTTP({
        schema: schema,
        rootValue: resolver,
        graphiql: true,
    })
);

app.listen(port, () => console.log("GraphQL Server is running on localhost:" + port));
