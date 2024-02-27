import { Message } from "../models/MessageModel"

interface IMessageQuery {
    save(data:Message):Promise<number>;
    retrieveAllByChatId(chat_id:number):Promise<Message[]>;
    retrieveLastInChat(chat_id:number):Promise<Message>;
}

export class MessageQuery implements IMessageQuery {
   async save(data:Message):Promise<number>{
        try {
            const record = await Message.create(
                {
                    message_id: data.message_id,
                    chat_id: data.chat_id,
                    author_id : data.author_id,
                    text : data.text,
                }
            )
            return record.dataValues.message_id
        }
        catch(error){
            console.log(error)
            throw new Error("INSERT INTO statement did not work")
        }
    }

    async delete(record_id:number):Promise<void>{
        try {
           const Message_row =  await Message.findOne(
                {
                    where: {
                        message_id: record_id,
                    }
                })
                if(!Message_row){
                    throw new Error("Could not find the record to delete")
                }
                await Message_row.destroy();
        }
        catch(error){
            console.log(error)
            throw new Error("DELETE statement did not work ")
        }
    }
   
    async retrieveAllByChatId(chat_id:number):Promise<Message[]>{
        try {
            return await Message.findAll(
                {
                    where: {
                        chat_id: chat_id,
                    },
                    order:[['createdAt','ASC']]
                }
            );
        }
        catch(error){
            console.log(error)
            throw new Error("SELECT ALL statement did not work")
        }
    }
    async retrieveById(record_id:number):Promise<Message|null>{
        try {
            return await Message.findOne(
                {
                    where: {
                      message_id: record_id,
                    },
                }
            );
        }
        catch(error){
            console.log(error)
            throw new Error("SELECT FROM WHERE statement did not work ")
        }
    }

    async retrieveLastInChat(chat_id:number):Promise<Message>{
        try{
            const message_row =  await Message.findOne(
                {
                    where: {
                        chat_id: chat_id,
                    },
                    order:[['createdAt','DESC']]
                })
                if(!message_row){
                    const stub_message = new Message();
                    stub_message.message_id = 0;
                    stub_message.chat_id = chat_id;
                    stub_message.author_id = 0;
                    stub_message.text = ""
                    stub_message.createdAt = new Date();
                    return stub_message;
                }
            
            return message_row

        }
        catch(error){
            console.log(error)
            throw new Error("SELECT ALL statement did not work")
        }
    }
}