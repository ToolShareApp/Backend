import {Request, Response} from "express";
import { ListingQuery } from "../db/queries/ListingQueries";
import { Listing } from "../db/models/ListingModel";


class ListingController {
    async insert(req:Request, res:Response){
        try{
            const new_Listing_row  = new Listing();
            new_Listing_row.owner_id= req.body.owner_id;
            new_Listing_row.tool = req.body.tool;
            new_Listing_row.category = req.body.category;
            new_Listing_row.subcategory = req.body.subcategory;
            if (req.body.deposit_required) {new_Listing_row.deposit_required = req.body.deposit_required};
            if (req.body.deposit_amount) {new_Listing_row.deposit_amount = req.body.deposit_amount};
            new_Listing_row.description= req.body.description ? req.body.description : "";
            new_Listing_row.photo_url = req.body.photo_url ? req.body.photo_url : "";


            await new ListingQuery().save(new_Listing_row);

            res.status(201).json({
                status:"Created!",
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

   
    async delete (req:Request, res:Response){
        try{
            const id = parseInt(req.params["listing_id"]);

            await new ListingQuery().delete(id);

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

    async selectWhereId (req:Request, res:Response){
        try{
            const id = parseInt(req.params["listing_id"]);
            const new_Listing_row  = await new ListingQuery().retrieveById(id);

            res.status(201).json({
                status:"OK!",
                message: "Here is your data:",
                data:new_Listing_row
            });
        } catch (err) {
            res.status(500).json({
                status:"Internal Server Error!",
                message: "Internal Server Error!"
            })
        }
    }

    async selectWhereOwnerId (req:Request, res:Response){
        try{
            const id = parseInt(req.params["owner_id"]);
            const new_Listing_row  = await new ListingQuery().retrieveByOwnerId(id);

            res.status(201).json({
                status:"OK!",
                message: "Here is your data:",
                data:new_Listing_row
            });
        } catch (err) {
            res.status(500).json({
                status:"Internal Server Error!",
                message: "Internal Server Error!"
            })
        }
    }

    async selectAll (req:Request, res:Response){
        try{
            const {category} = req.query;
            const {subcategory} = req.query;
            const new_Listing_row  = await new ListingQuery().retrieveAll(category, subcategory);

            res.status(201).json({
                status:"OK!",
                message: "Here is your data:",
                data:new_Listing_row
            });
        } catch (err) {
            res.status(500).json({
                status:"Internal Server Error!",
                message: "Internal Server Error!"
            })
        }
    }
}

export default new ListingController()