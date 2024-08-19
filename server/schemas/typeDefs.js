const typeDefs = `
type Order {
_id: ID
purchaseDate: String
productList: [Product]
}

type Product {
_id: ID
name: String
price: Float
quantity: Int
description: String
image: String
category: Category
}

type Category {
_id: ID
name: String
}

type User {
 _id: ID
 email: String
 password: String
 role: String
 orders: [Order]
}

type Auth {
 token: ID!
 user: User
 }

type Query {
 categories: [Category]
 products(category: ID, name: String): [Product]
 product(_id: ID!): Product
 user: User
 order(_id: ID!): Order
 }

 type Mutation {
 addUser(
 email: String!
 password: String!
 ): Auth
 addOrder(prodcuts: [ID]!): Order
 updateUser(
   email: String!
   password: String
   role: String
 ): User
 updateProduct(_id: ID!, quantity: Int!): Product
 login(email: String!, password: String!): Auth
 }
`;

module.exports = typeDefs;
