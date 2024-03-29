import express, { Application, Request, Response } from "express";
import Database from "./config/Database";
import exampletableRouter from "./routers/ExampletableRouter";
import fs from "fs/promises";
import ProfileRouter from "./routers/ProfileRouter";
import ListingRouter from "./routers/ListingRouter";
import ChatRouter from "./routers/ChatRouter";
import MessageRouter from "./routers/MessageRouter";
import InterestRouter from "./routers/InterestRouter";
import { Server as SocketIO, Socket } from 'socket.io'
import { createServer, Server } from 'node:http';
import { ProfileQuery } from './db/queries/ProfileQueries'
import { MessageQuery } from './db/queries/MessageQueries'
import { Message } from './db/models/MessageModel'

interface MessageInterface {
  messageId: number;
  username: string;
  userId: number;
  userAvatar: string | null;
  text: string;
  date: string;
  status: number;
}

interface NewMessage {
  text: string;
}

class App {
  public server: Server;
  protected app: Application;
  protected io: SocketIO;
  protected chats: {[chatId:number]: {[userId:number]: Socket}} = {};

  constructor() {
    this.app = express();
    this.server = createServer(this.app);
    this.io = new SocketIO(this.server);

    this.app.use(express.json());
    this.databseSync();
    this.routes();

    this.io.on('connection', (socket:Socket) => this.wsConnection(socket));
  }

  protected plugins(): void {
    this.app.use(express.urlencoded({ extended: true }));
  }

  protected databseSync(): void {
    const db = new Database();
    db.sequelize?.sync();
  }

  protected async readEndpoints(req: Request, res: Response): Promise<void> {
    try {
      const endpointsDoc = `${__dirname}/../endpoints.json`;
      console.log(endpointsDoc);

      const docs = await fs
        .readFile(endpointsDoc, "utf-8")
        .then((fileContent) => {
          console.log(fileContent);
          return JSON.parse(fileContent);
        });
      res.status(201).json({
        status: "OK!",
        message: "These are the currently available endpoints :",
        data: docs,
      });
    } catch (err) {
      res.status(500).json({
        status: "Internal Server Error!",
        message: "Internal Server Error!",
      });
    }
  }

  protected routes(): void {
    this.app.route("/").get((req: Request, res: Response) => {
      res.send("welcome home");
    });
    this.app.use("/api/docs", this.readEndpoints);
    this.app.use("/api/profile", ProfileRouter);
    this.app.use("/api/listing", ListingRouter);
    this.app.use("/api/chat", ChatRouter);
    this.app.use("/api/message", MessageRouter);
    this.app.use("/api/interest", InterestRouter);
    this.app.use("/api/exampletable", exampletableRouter);
  }

  protected wsConnection(socket: Socket) {
    const token = socket.handshake.auth.token;
    // @TODO Get user by token
    const userId = socket.handshake.auth.userId;
    const chatId = parseInt(socket.handshake.query.chatId as string);
    console.log(`User ${userId} connected to chat ${chatId}`);
    this.chats[chatId] ??= {}; // init chat object
    this.chats[chatId][userId] = socket; // put socket connection to chat object, for external access.

    socket.on('disconnect', () => { // remove socket from chat if user left chat
      console.log(`User ${userId} disconnected from chat ${chatId}`);
      delete this.chats[chatId][userId];
    });

    socket.on('message', async (newMessage:NewMessage) => { // when user send new message
      try {
        console.log(`User ${userId} sent message to chat ${chatId}: ${newMessage.text}`);
        // Load actual user info from DB
        const profile_row = await new ProfileQuery().retrieveById(userId);

        const user = {
          id: profile_row[0].profile_id,
          name: profile_row[0].display_name,
          avatar: profile_row[0].picture_url,
        };
        // Save newMessage to DB and load result
        const new_Message_row = new Message();
        new_Message_row.chat_id = chatId;
        new_Message_row.author_id = userId;
        new_Message_row.text = newMessage.text;

        const recordId = await new MessageQuery().save(new_Message_row);

        const messageRecord = await new MessageQuery().retrieveById(recordId);

        const message: MessageInterface = {
          messageId: messageRecord!.message_id,
          userId: messageRecord!.author_id,
          username: user.name,
          userAvatar: user.avatar,
          text: messageRecord!.text,
          date: messageRecord!.createdAt,
          status: messageRecord!.status,
        };

        for (const participantId in this.chats[chatId]) {
          const participantSocket = this.chats[chatId][participantId];
          participantSocket.emit('message', message);
        }
      } catch (error) {
        console.error(error)
      }
    });
  }
}

export default App;
