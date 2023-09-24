require('dotenv').config();
import express, { Request, Response } from 'express';
import { ApolloServer } from 'apollo-server-express';
import mongoose from 'mongoose';
import cors from 'cors';
import schema from './graphql/schemaMap';
import { connect } from './utilities/redis';
import http from 'http';
import { Server as SocketServer } from 'socket.io'; // Import the Socket.IO server
import path from 'path'
// Connect to Redis
connect();

// Set up Express application
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.resolve("./public")));

app.get("/", (req, res) => {
    return res.sendFile("/public/index.html");
});


// Create an HTTP server and integrate it with Express
const httpServer = http.createServer(app);

// Create a Socket.IO server
const io = new SocketServer(httpServer, {
    cors: {
        origin: ['https://studio.apollographql.com', 'http://localhost:8080'],
    },
});

// Function to start Apollo Server
async function startApolloServer() {
    const server = new ApolloServer({
        schema,
        context: ({ req, res }: { req: Request, res: Response }) => ({ req, res }),
    });

    await server.start();

    // Apply Apollo Server middleware to Express application
    server.applyMiddleware({
        cors: {
            origin: ['https://studio.apollographql.com', 'http://localhost:8080'],
            credentials: true,
        },
        app,
    });

    io.on('connection', (socket) => {
        console.log('A user connected');
        socket.on('message', (message) => {
            // Broadcast the message to all connected clients
            console.log(message)
            io.emit('message', message);
        });

        // Handle disconnect event
        socket.on('disconnect', () => {
            console.log('A user disconnected');
        });

        // Join a room when a client connects
        socket.on('joinRoom', (roomName) => {
            socket.join(roomName);
            console.log(`User joined room: ${roomName}`);
        });

        // Leave a room when a client disconnects
        socket.on('leaveRoom', (roomName) => {
            socket.leave(roomName);
            console.log(`User left room: ${roomName}`);
        });

    });

    // Start Express server
    httpServer.listen(8080, () => {
        console.log(`🚀 Server ready at http://localhost:8080${server.graphqlPath}`);
    });

    // Socket.IO handling

}

// Connect to MongoDB and start Apollo Server when the connection is established
mongoose.connect(process.env.DB || '').then(startApolloServer);

export { io }
