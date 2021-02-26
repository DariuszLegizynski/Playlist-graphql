// sch describes the data on this graph: objects, data types, connections, etc

const graphql = require("graphql");
const _ = require("lodash");
const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLID,
	GraphQLInt,
	GraphQLSchema,
} = graphql;

// mockup db
const books = [
	{
		name: "first book",
		genre: "first genre",
		id: "1",
		authorId: "3",
	},
	{
		name: "second book",
		genre: "second genre",
		id: "2",
		authorId: "1",
	},
	{
		name: "third book",
		genre: "third genre",
		id: "3",
		authorId: "2",
	},
];

const authors = [
	{ name: "first name", age: 34, id: "1" },
	{ name: "second eman", age: 43, id: "2" },
	{ name: "third time", age: 54, id: "3" },
];

const BookType = new GraphQLObjectType({
	name: "Book",
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		genre: { type: GraphQLString },
		author: {
			type: AuthorType,
			resolve(parent, args) {
				console.log(parent);
				return _.find(authors, { id: parent.authorId });
			},
		},
	}),
});

const AuthorType = new GraphQLObjectType({
	name: "Author",
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		age: { type: GraphQLInt },
	}),
});

const RootQuery = new GraphQLObjectType({
	name: "RootQueryType",
	fields: {
		book: {
			type: BookType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				// code to get data from db / other source
				return _.find(books, { id: args.id });
			},
		},
		author: {
			type: AuthorType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				return _.find(authors, { id: args.id });
			},
		},
	},
});

module.exports = new GraphQLSchema({
	query: RootQuery,
});
