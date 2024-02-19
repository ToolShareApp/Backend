import { Profile } from "../models/ProfileModel";

interface IProfileQuery {
    save(data:Profile):Promise<void>;
    delete(id:number):Promise<void>;
    retrieveById(id:number):Promise<Profile>;
    retrieveAll():Promise<Profile[]>;
}

export class ProfileQuery implements IProfileQuery {
   async save(data:Profile):Promise<void>{
        try {
            console.log("here is the data")
            console.log(data)
            await Profile.create(
                {
                    profile_id: data.profile_id,
                    user_auth_id: data.user_auth_id,
                    username : data.username,
                    verified : data.verified,
                    display_name : data.display_name,
                    bio : data.bio,
                    longitude: data.longitude,
                    latitude: data.latitude,
                    search_radius: data.search_radius,
                    picture_url: data.picture_url,
                }
            )
        }
        catch(error){
            console.log(error)
            throw new Error("INSERT INTO statement did not work")
        }
    }

    async delete(record_id:number):Promise<void>{
        try {
           const Profile_row =  await Profile.findOne(
                {
                    where: {
                        profile_id: record_id,
                    }
                })
                if(!Profile_row){
                    throw new Error("Could not find the record to delete")
                }
                await Profile_row.destroy();
        }
        catch(error){
            console.log(error)
            throw new Error("DELETE statement did not work ")
        }
    }

    async retrieveById(record_id:number):Promise<Profile>{
        try {
           const Profile_row =  await Profile.findOne(
                {
                    where: {
                        profile_id: record_id,
                    }
                })
                if(!Profile_row){
                    throw new Error("Could not find the record")
                }
            
            return Profile_row

        }
        catch(error){
            console.log(error)
            throw new Error("SELECT FROM WHERE statement did not work ")
        }
    }

    async retrieveAll():Promise<Profile[]>{
        try {
            return await Profile.findAll();
        }
        catch(error){
            console.log(error)
            throw new Error("SELECT ALL statement did not work")
        }
    }


}