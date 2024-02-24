import { Profile } from "../models/ProfileModel";

interface IProfileQuery {
    save(data:Profile):Promise<void>;
    delete(id:number):Promise<void>;
    update(data:Profile):Promise<void>;
    retrieveById(id:number):Promise<Profile[]>;
    retrieveByEmail(id:string):Promise<Profile[]>;
    retrieveByCredentials(email:string, password:string):Promise<Profile>;
    retrieveAll():Promise<Profile[]>;
}

export class ProfileQuery implements IProfileQuery {
   async save(data:Profile):Promise<void>{
        try {
            await Profile.create(
                {
                    profile_id: data.profile_id,
                    password: data.password,
                    email : data.email,
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

    async update(data:Profile):Promise<void>{
        try {
            console.log("search_radius in queries: ", data.search_radius)
           const profile_row =  await Profile.findOne(
                {
                    where: {
                        profile_id: data.id,
                    }
                })
                if(!profile_row){
                    throw new Error("Could not find the record to update")
                }
                console.log("profile_row.search_radius: ",  profile_row.search_radius)
                data.verified? profile_row.verified = data.verified:profile_row.verified =profile_row.verified 
                if (data.display_name){profile_row.display_name = data.display_name}
                if (data.bio){profile_row.bio = data.bio}
                if (data.longitude){profile_row.longitude = data.longitude}
                if (data.latitude){profile_row.latitude = data.latitude}
                data.search_radius !== 0 ? profile_row.search_radius = data.search_radius:profile_row.search_radius =profile_row.search_radius 
                if (data.picture_url){profile_row.picture_url = data.picture_url}

                await profile_row.save();
        }
        catch(error){
            console.log(error)
            throw new Error("UPDATE statement did not work")
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

    async retrieveByEmail(email:string):Promise<Profile[]>{
        try {
           return await Profile.findAll(
                {
                    where: {
                        email: email,
                    }
                })
        }
        catch(error){
            console.log(error)
            throw new Error("SELECT FROM WHERE statement did not work ")
        }
    }

    async retrieveById(record_id:number):Promise<Profile[]>{
        try {
            return await Profile.findAll(
                {
                    where: {
                        profile_id: record_id,
                    }
                })
        }
        catch(error){
            console.log(error)
            throw new Error("SELECT FROM WHERE statement did not work ")
        }
    }

    async retrieveByCredentials(email:any, password:any):Promise<Profile>{
        try {
            const profile_row = await Profile.findOne(
                {
                    where: {
                        email: email,
                        password:password
                    }
                })
                if(!profile_row){
                    throw new Error("Could not find the record")
                }
            return profile_row
        }
        catch(error){
            console.log(error)
            throw new Error("SELECT FROM WHERE statement did not work")
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