// sch describes the data on this graph: objects, data types, connections, etc

const graphql = require("graphql");
const _ = require("lodash");
const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLSchema,
} = graphql;

// mockup db
const books = [
	{ name: "first book", genre: "first genre", id: "1" },
	{ name: "second book", genre: "second genre", id: "2" },
	{ name: "third book", genre: "third genre", id: "3" },
];

const BookType = new GraphQLObjectType({
	name: "Book",
	fields: () => ({
		id: { type: GraphQLString },
		name: { type: GraphQLString },
		genre: { type: GraphQLString },
	}),
});

const RootQuery = new GraphQLObjectType({
	name: "RootQueryType",
	fields: {
		book: {
			type: BookType,
			args: { id: { type: GraphQLString } },
			resolve(parent, args) {
				// code to get data from db / other source
				return _.find(books, { id: args.id });
			},
		},
	},
});

module.exports = new GraphQLSchema({
	query: RootQuery,
});
