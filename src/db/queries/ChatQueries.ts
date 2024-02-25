import { Chat } from "../models/ChatModel";

interface IChatQuery {
    save(data:Chat):Promise<number>;
    retrieveAllForOwner(user_id:number):Promise<Chat[]>;
    retrieveAllForLendee(user_id:number):Promise<Chat[]>;
    retrieveByUserIds(listing_id:number, owner_id:number, lendee_id:number):Promise<Chat[]>;
    
}

export class ChatQuery implements IChatQuery {

   async save(data:Chat):Promise<number>{
        try {
            const record = await Chat.create(
                {
                    chat_id: data.chat_id,
                    listing_id: data.listing_id,
                    owner_id: data.owner_id,
                    lendee_id : data.lendee_id,
                    start_dt : data.start_dt,
                    end_dt : data.end_dt,
                    status: data.status,
                }
            )
            return record.dataValues.chat_id
        }
        catch(error){
            console.log(error)
            throw new Error("INSERT INTO statement did not work")
        }
    }


    async retrieveAllForOwner(user_id:number):Promise<Chat[]>{
        try {
            return await Chat.findAll(
                {
                    where: {
                        owner_id: user_id,
                    }
                }
            );
        }
        catch(error){
            console.log(error)
            throw new Error("SELECT ALL statement did not work")
        }
    }

    async retrieveByUserIds(listing_id:number, owner_id:number, lendee_id:number):Promise<Chat[]>{
        try {
            return await Chat.findAll(
                {
                    where: {
                        listing_id:listing_id,
                        owner_id: owner_id,
                        lendee_id:lendee_id,
                    }
                }
            );
        }
        catch(error){
            console.log(error)
            throw new Error("SELECT ALL statement did not work")
        }
    }

    async retrieveAllForLendee(user_id:number):Promise<Chat[]>{
        try {
            return await Chat.findAll(
                {
                    where: {
                        lendee_id: user_id,
                    }
                }
            );
        }
        catch(error){
            console.log(error)
            throw new Error("SELECT ALL statement did not work")
        }
    }

}