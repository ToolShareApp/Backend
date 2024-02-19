import express, { Application, Request, Response } from "express";
import Database from "./config/Database";
import exampletableRouter from "./routers/ExampletableRouter";
import fs from "fs/promises";
import ProfileRouter from "./routers/ProfileRouter";

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.app.use(express.json());
    this.databseSync();
    this.routes();
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
    this.app.use("/api/exampletable", exampletableRouter);
  }
}

export default App;
