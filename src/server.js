import express from "express";
import listEndpoints from "express-list-endpoints";
import mongoose from "mongoose";
import { Server } from "socket.io";
import { createServer } from "http"; // CORE MODULE
import { newConnectionHandler } from "./socket/index.js";

const expressServer = express();
const port = process.env.PORT || 3002;

//  SOCKET.IO
const httpServer = createServer(expressServer);
const io = new Server(httpServer);

io.on("connection", newConnectionHandler);

//  MIDDLEWARES

// ENDPOINTS

// ERROR HANDLERS

mongoose.connect(process.env.MONGO_URL);

mongoose.connection.on("connected", () => {
  httpServer.listen(port, () => {
    console.table(listEndpoints(expressServer));
    console.log(`Server is running on port ${port}`);
  });
});
