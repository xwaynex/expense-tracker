const transactionTypeDef = `#graphql
type Transaction {
  _id: ID!
  userId: ID!
  description: String!
  paymentTYpe: String!
  category: String!
  amoount: Float!
  location: String!
  data: String!
}

type Query {
  transactions: [Transaction!]
  transaction(transactionId:ID!): Transaction
  # TODO => ADD categorystatistics query
}

type Mutation {
  createTransaction(input: CreateTransactionInput!): Transaction!
  updateTransaction(input: UpdateTransactionInput!): Transaction!
  deleteTransaction(transactionId:ID!): Transaction!
}

input CreateTransactionInput {
  description: String!
  paymentTYpe: String!
  category: String!
  amount: Float!
  date: String!
  location: String
}

input UpdateTransactionInput {
  transactionId: ID!
  description: String
  paymentTYpe: String
  category: String
  amount: Float
  date: String 
  location: String
}
`;


export default transactionTypeDef;