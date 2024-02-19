import {Request, Response} from "express";
import { ProfileQuery } from "../db/queries/ProfileQueries";
import { Profile } from "../db/models/ProfileModel";


class ProfileController {
    async insert(req:Request, res:Response){
        try{
            const new_Profile_row  = new Profile();
            new_Profile_row.user_auth_id= 1;
            new_Profile_row.username = req.body.username;
            new_Profile_row.verified = 0;
            new_Profile_row.display_name = req.body.display_name;
            new_Profile_row.bio = "";
            new_Profile_row.longitude= req.body.longitude;
            new_Profile_row.latitude= req.body.latitude;
            new_Profile_row.search_radius= req.body.search_radius;
            new_Profile_row.picture_url= "";


            await new ProfileQuery().save(new_Profile_row);

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
            const id = parseInt(req.params["profile_id"]);

            await new ProfileQuery().delete(id);

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
            const id = parseInt(req.params["profile_id"]);
            const new_Profile_row  = await new ProfileQuery().retrieveById(id);

            res.status(201).json({
                status:"OK!",
                message: "Here is your data:",
                data:new_Profile_row
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
            const new_Profile_row  = await new ProfileQuery().retrieveAll();

            res.status(201).json({
                status:"OK!",
                message: "Here is your data:",
                data:new_Profile_row
            });
        } catch (err) {
            res.status(500).json({
                status:"Internal Server Error!",
                message: "Internal Server Error!"
            })
        }
    }
}

export default new ProfileController()