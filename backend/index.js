import express from 'express';
import http from 'http';
import cors from 'cors';
import dotenv from 'dotenv';

import passport from 'passport';
import session from 'express-session';
import ConnectMongoDBSession from 'connect-mongodb-session';

import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { connectDB } from './db/connectDB.js';
import { buildContext  } from 'graphql-passport';
import { configurePassport } from './passport/passport.config.js';

import mergedResolvers from './resolvers/index.js';
import mergedTypeDefs from './typeDef/index.js';

dotenv.config()
configurePassport()
const app = express();

const httpServer = http.createServer(app);

const MongoDBtore = ConnectMongoDBSession(session);
const store = new MongoDBtore({
  uri: process.env.MONGO_URI,
  collection: "sessions",
})

store.on("error", (err) => console.log(err))

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false, // this option specifies whether to save session on to the store on every request
    saveUninitialized: false, // option specifies wheather to save uninitialized sessions
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true, // this option prevrents Cross-Site Scripting (XSS) attacks  
    },
    store:store
  })
)

app.use(passport.initialize());
app.use(passport.session());

const server = new ApolloServer({
  typeDefs: mergedTypeDefs,
  resolvers: mergedResolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
})

await server.start();

app.use(
  '/',
  cors({
    origin: "http://localhost:5173",
    credentails: true
  }),
  express.json(),
  // expressMiddleware accepts the same arguments:
  // an Apollo Server instance and optional configuration options
  expressMiddleware(server, {
    context: async ({ req, res }) => buildContext({req, res}),
  }),
);

// Modified server startup
await new Promise ((resolve) =>
  httpServer.listen({ port: 4000 }, resolve),
);
await connectDB();

console.log(`🚀 Server ready at http://localhost:4000/`);