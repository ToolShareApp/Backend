import {Request, Response} from "express";
import { InterestQuery } from "../db/queries/InterestQueries";
import { ProfileQuery } from "../db/queries/ProfileQueries";
import { MessageQuery } from "../db/queries/MessageQueries";
import { ListingQuery } from "../db/queries/ListingQueries";
import { Interest } from "../db/models/InterestModel";

interface IInterest {
    interest_id:number,
    otherUserName:string,
    otherUserAvatar:string|null,
    lastMessage:string,
    lastMessageDate:string,
    interestCreatedByUserId:number
}

class InterestController {
    async insert(req:Request, res:Response){
        try{

            const new_Interest_row  = new Interest();
            new_Interest_row.listing_id = req.body.listingId;
            new_Interest_row.lendee_id = req.body.userId;

            await new InterestQuery().save(new_Interest_row);

            res.status(201).json({
                status: "Created!",
                message: "Successfully created a record!"

            });
        } catch (err) {
            console.log(err)
            res.status(500).json({
                status:"Internal Server Error!",
                message: "Internal Server Error!"
            })
        }
    }

    async delete(req:Request, res:Response){
        try{

            await new InterestQuery().delete(req.body.listingId,req.body.userId)

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

     async selectWhereUserId (req:Request, res:Response){
        try{
            const userId = parseInt(req.params["user_id"]);
            const interestingListings  = await new InterestQuery().retrieveByLendeeId(userId);
            const listingIds = [...new Set(interestingListings.map(interest => interest.listing_id))];

            const listingsPromise = Promise.all(listingIds.map(id =>new ListingQuery().retrieveById(id)));
            const listingDetails = (await listingsPromise).flat();
            
            res.status(201).json({
                status:"OK!",
                message: "Here is your data:",
                data: listingDetails,
            });
        } catch (err) {
            res.status(500).json({
                status:"Internal Server Error!",
                message: "Internal Server Error!"
            })
        }
    }
}

export default new InterestController()