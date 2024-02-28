import {Request, Response} from "express";
import { ChatQuery } from "../db/queries/ChatQueries";
import { ProfileQuery } from "../db/queries/ProfileQueries";
import { MessageQuery } from "../db/queries/MessageQueries";
import { ListingQuery } from "../db/queries/ListingQueries";
import { Chat } from "../db/models/ChatModel";

interface IChat {
    chat_id:number,
    otherUserName:string,
    otherUserAvatar:string|null,
    lastMessage:string,
    lastMessageDate:string,
    chatCreatedByUserId:number
}

class ChatController {
    async insert(req:Request, res:Response){
        try{
            let status = "Created!"
            let message= "Successfully created a record!"
            let recordId = 0;
            
            const listingId = parseInt(req.body.listingId);
            const lendeeId = parseInt(req.body.userId);
            const listing = await new ListingQuery().retrieveById(req.body.listingId);
            const ownerId = listing[0].owner_id;

            const existingChat = await new ChatQuery().retrieveByUserIds(listingId,ownerId,lendeeId);

            if (existingChat.length > 0){
                status = "Retrieved!"
                message = "Chat record already exists."
                recordId = existingChat[0].chat_id;
            }
            else {
                const now = new Date()
                const new_Chat_row  = new Chat();
                new_Chat_row.listing_id = listingId;
                new_Chat_row.owner_id = ownerId;
                new_Chat_row.lendee_id = lendeeId;
                new_Chat_row.start_dt= now;
                new_Chat_row.start_dt= new Date(now.getDate()+30);
                new_Chat_row.status = 0;

                recordId = await new ChatQuery().save(new_Chat_row);
            }


            res.status(201).json({
                status: status,
                message: message,
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

     async selectWhereUserId (req:Request, res:Response){
        try{
            const userId = parseInt(req.params["user_id"]);
            const ownerChats  = await new ChatQuery().retrieveAllForOwner(userId);
            const lendeeChats  = await new ChatQuery().retrieveAllForLendee(userId);
            
            const lendeeUsers = [...new Set(ownerChats.map(item => item.lendee_id))];
            const ownerUsers = [...new Set(lendeeChats.map(item => item.owner_id))];
            const allUsers = [...new Set(lendeeUsers.concat(ownerUsers))];

            const userDetailsPromise = Promise.all(allUsers.map(userId=>new ProfileQuery().retrieveById(userId)));
            const userDetails = (await userDetailsPromise).flat();

            const allChats = ownerChats.concat(lendeeChats)
            const lastMessagePromise = Promise.all(allChats.map(chat =>new MessageQuery().retrieveLastInChat(chat.chat_id)));
            const lastMessages =(await lastMessagePromise);

            const ownerChatChain = ownerChats.map((chat) =>{
                const singleChat: IChat = {
                    chat_id:chat.chat_id,
                    otherUserName:userDetails.filter((user)=> {return user.profile_id ===chat.lendee_id})[0].display_name,
                    otherUserAvatar:userDetails.filter((user)=> {return user.profile_id ===chat.lendee_id})[0].picture_url,
                    lastMessage:lastMessages.filter((message)=> {return message.chat_id ===chat.chat_id})[0].text,
                    lastMessageDate:lastMessages.filter((message)=> {return message.chat_id ===chat.chat_id})[0].createdAt,
                    chatCreatedByUserId:userId
                }
                return singleChat;
            })

            const lendeeChatChain = lendeeChats.map((chat) =>{
                const singleChat: IChat = {
                    chat_id:chat.chat_id,
                    otherUserName:userDetails.filter((user)=> {return user.profile_id ===chat.owner_id})[0].display_name,
                    otherUserAvatar:userDetails.filter((user)=> {return user.profile_id ===chat.owner_id})[0].picture_url,
                    lastMessage:lastMessages.filter((message)=> {return message.chat_id ===chat.chat_id})[0].text,
                    lastMessageDate:lastMessages.filter((message)=> {return message.chat_id ===chat.chat_id})[0].createdAt,
                    chatCreatedByUserId:chat.owner_id
                }
                return singleChat;
            })

            res.status(201).json({
                status:"OK!",
                message: "Here is your data:",
                data: ownerChatChain.concat(lendeeChatChain),
            });
        } catch (err) {
            res.status(500).json({
                status:"Internal Server Error!",
                message: "Internal Server Error!"
            })
        }
    }
}

export default new ChatController()