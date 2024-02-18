import express, { Application, Request, Response } from "express";
import Database from "./config/Database";
import exampletableRouter from "./routers/ExampletableRouter";

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

  protected routes(): void {
    this.app.route("/").get((req: Request, res: Response) => {
      res.send("welcome home");
    });
    this.app.use("/api/exampletable", exampletableRouter);
  }
}

export default App


