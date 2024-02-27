import {Request, Response} from "express";
import { MessageQuery } from "../db/queries/MessageQueries";
import { ProfileQuery } from "../db/queries/ProfileQueries";
import { Message } from "../db/models/MessageModel";
import { ChatQuery } from "../db/queries/ChatQueries";

interface IChatMessages {
    messageId:number;
    username:string;
    userId: number;
    userAvatar:string|null;
    text:string;
    status:number;
    date:string;
}

class MessageController {
    async insertByChatId(req:Request, res:Response){
        try{
            const new_Message_row  = new Message();
            new_Message_row.chat_id= parseInt(req.params["chat_id"]);
            new_Message_row.author_id = req.body.userId;
            new_Message_row.text= req.body.text ? req.body.text : "";

            const recordId = await new MessageQuery().save(new_Message_row);

            res.status(201).json({
                status:"Created!",
                message: "Successfully created a record!",
                recordId: recordId
            });
        } catch (err) {
            console.log(err)
            res.status(500).json({
                status:"Internal Server Error!",
                message: "Internal Server Error!"
            })
        }
    }

    async update(req:Request, res:Response){
        try{
            const id = parseInt(req.params["message_id"]);

            const new_message_row  = new Message();
            new_message_row.id = id;
            if (req.body.text ) {new_message_row.text = req.body.text}
            if (req.body.status|| req.body.status === 0) {new_message_row.status = req.body.status}

            await new MessageQuery().update(new_message_row);

            res.status(201).json({
                status:"Updated!",
                message: "Successfully updated a record!"
            });
        } catch (err) {
            console.log(err)
            res.status(500).json({
                status:"Internal Server Error!",
                message: "Internal Server Error!"
            })
        }
    }


    async delete (req:Request, res:Response){
        try{
            const id = parseInt(req.params["message_id"]);

            await new MessageQuery().delete(id);

            res.status(201).json({
                status:"Deleted!",
                message: "Successfully deleted a record!"
            });
        } catch (err) {
            console.log(err)
            res.status(500).json({
                status:"Internal Server Error!",
                message: "Internal Server Error!"
            })
        }
    }
   

    async selectWhereChatId (req:Request, res:Response){
        try{
            const chatId = parseInt(req.params["chat_id"]);
            const messageRows  = await new MessageQuery().retrieveAllByChatId(chatId);
            const chatUsers = [...new Set(messageRows.map(item => item.author_id))];

            const userDetailsPromise = Promise.all(chatUsers.map(userId=>new ProfileQuery().retrieveById(userId)));

            const userDetails = (await userDetailsPromise).flat();

            const messageChain = messageRows.map((message) => {
                const chatMessage: IChatMessages = {
                messageId : message.message_id,
                //username: "k",
                username: userDetails.filter((user)=> {return user.profile_id ===message.author_id})[0].display_name,
                userId: message.author_id,
                userAvatar:userDetails.filter((user)=> {return user.profile_id ===message.author_id})[0].picture_url,
                text:message.text,
                status:message.status,
                date:message.createdAt
                }
                return chatMessage;
            })
            res.status(201).json({
                status:"OK!",
                message: "Here is your data:",
                data:messageChain
            });
        } catch (err) {
            res.status(500).json({
                status:"Internal Server Error!",
                message: "Internal Server Error!"
            })
        }
    }    
}

export default new MessageController()