import { Sequelize } from "sequelize-typescript";
import * as dotenv from "dotenv";
import { Exampletable } from "../db/models/ExampletableModel";
import { Profile } from "../db/models/ProfileModel";
import { Listing } from "../db/models/ListingModel";
import { Chat } from "../db/models/ChatModel";
import { Message } from "../db/models/MessageModel";
import { Interest } from "../db/models/InterestModel";

dotenv.config()

class Database {
    public sequelize: Sequelize | undefined

    private POSTGRES_DB = process.env.POSTGRES_DB as string;
    private POSTGRES_HOST = process.env.POSTGRES_HOST as string;
    private POSTGRES_URI = process.env.POSTGRES_URI as string;
    private POSTGRES_PORT = process.env.POSTGRES_PORT as unknown as number;

    constructor() {
        this.connectToPostgreSQL()
    }

    private async connectToPostgreSQL(){
        this.sequelize = new Sequelize (
        // Uncomment line below before git commit, comment out when working locally
        this.POSTGRES_URI , 
        {
            database: this.POSTGRES_DB,
            // Comment out line below before git commit, uncomment when working locally
            //host: this.POSTGRES_HOST,
            port: this.POSTGRES_PORT,
            dialect: "postgres",
            models:[Exampletable, Profile, Listing, Chat, Message,Interest],
        })

        await this.sequelize.authenticate()
        .then(() => {
            console.log("Postgres alive")
        })
        .catch((err)=> {
            console.log("Postgres fell over, this is the error:")
            console.log(err)
        })
    }
}

export default Database