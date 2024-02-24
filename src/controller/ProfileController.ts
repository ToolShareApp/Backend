import {Request, Response} from "express";
import { ProfileQuery } from "../db/queries/ProfileQueries";
import { Profile } from "../db/models/ProfileModel";


class ProfileController {
    async insert(req:Request, res:Response){
        try{
            const new_Profile_row  = new Profile();
            new_Profile_row.password= req.body.password ? req.body.password : "password";
            new_Profile_row.email = req.body.email;
            if (req.body.verified) {new_Profile_row.verified = req.body.verified};
            new_Profile_row.display_name= req.body.display_name ? req.body.display_name : "";
            new_Profile_row.bio = req.body.bio ? req.body.bio : "";
            new_Profile_row.longitude= req.body.longitude ? req.body.longitude : 0.11;
            new_Profile_row.latitude= req.body.latitude ? req.body.latitude : 52;
            if (req.body.search_radius) {new_Profile_row.search_radius = req.body.search_radius};
            new_Profile_row.picture_url = req.body.picture_url ? req.body.picture_url : "";


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

    async update(req:Request, res:Response){
        try{
            const id = parseInt(req.params["profile_id"]);
            console.log("id in the controller:", id)
            const new_profile_row  = new Profile();
            new_profile_row.id = id;
            if (req.body.verified) {new_profile_row.verified = req.body.verified}
            if (req.body.display_name) {new_profile_row.display_name = req.body.display_name}
            if (req.body.bio) {new_profile_row.bio = req.body.bio}
            if (req.body.longitude) {new_profile_row.longitude = req.body.longitude}
            if (req.body.latitude) {new_profile_row.latitude = req.body.latitude}
            req.body.search_radius?new_profile_row.search_radius = req.body.search_radius: new_profile_row.search_radius =0
            if (req.body.picture_url) {new_profile_row.picture_url = req.body.picture_url}


            await new ProfileQuery().update(new_profile_row);

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

    async selectWhereEmail (req:Request, res:Response){
        try{
            const email = req.params["email"];
            const new_Profile_row  = await new ProfileQuery().retrieveByEmail(email);

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

    async selectWhereCredentials (req:Request, res:Response){
        try{
            const {email} = req.query;
            const {password} = req.query;
            const new_Profile_row  = await new ProfileQuery().retrieveByCredentials(email, password);
  

            res.status(201).json({
                status:"OK!",
                message: "Here is your data:",
                data:new_Profile_row
            });
        } catch (err:any) {
            if (err.message==="SELECT FROM WHERE statement did not work"){
                res.status(401).json({
                    status:"Unauthorised",
                    message: "incorrect username or password"})
            
            }
            else {
                res.status(500).json({
                    status:"Internal Server Error!",
                    message: "Internal Server Error!"
                })
            }
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