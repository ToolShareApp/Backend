import express, { Application, Request, Response } from "express";
import Database from "./config/Database";
import exampletableRouter from "./routers/ExampletableRouter";
import fs from "fs/promises";
import ProfileRouter from "./routers/ProfileRouter";
import jwt from 'express-jwt';
import jwksRsa from 'jwks-rsa';

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

  protected async authoriseUser (req: Request, res: Response): Promise<void>{
    try{
      const checkJwt = jwt({
        secret: jwksRsa.expressJwtSecret({
          cache: true,
          rateLimit: true,
          jwksRequestsPerMinute: 5,
          jwksUri: `https://dev-8yjp2nqwb37nrym0.us.auth0.com/.well-known/jwks.json`
        }),
        audience: 'QCFkfE3V296Dl-yN9Z2k_js21Fbtcmd_MR-uAfK1NQBll3xOyGE-1qex_dcyHpjs',
        issuer: `https://dev-8yjp2nqwb37nrym0.us.auth0.com/`,
        algorithms: ['RS256']
      });

      

    } catch(err) {
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
    this.app.use("/api/protected", this.authoriseUser);
    this.app.use("/api/exampletable", exampletableRouter);
  }
}

export default App;
