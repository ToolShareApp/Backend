import { Listing } from "../models/ListingModel";

interface IListingQuery {
    save(data:Listing):Promise<void>;
    delete(id:number):Promise<void>;
    retrieveById(id:number):Promise<Listing[]>;
    retrieveByOwnerId(id:number):Promise<Listing[]>;
    retrieveAll(cateogry:any, subcategory:any):Promise<Listing[]>;
}

export class ListingQuery implements IListingQuery {
   async save(data:Listing):Promise<void>{
        try {
            console.log(data)
            await Listing.create(
                {
                    listing_id: data.listing_id,
                    owner_id: data.owner_id,
                    tool : data.tool,
                    category : data.category,
                    subcategory : data.subcategory,
                    deposit_required : data.deposit_required,
                    deposit_amount: data.deposit_amount,
                    description: data.description,
                    photo_url: data.photo_url
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
           const Listing_row =  await Listing.findOne(
                {
                    where: {
                        listing_id: record_id,
                    }
                })
                if(!Listing_row){
                    throw new Error("Could not find the record to delete")
                }
                await Listing_row.destroy();
        }
        catch(error){
            console.log(error)
            throw new Error("DELETE statement did not work ")
        }
    }

    async retrieveById(record_id:number):Promise<Listing[]>{
        try {
            console.log()
            return await Listing.findAll(
                {
                    where: {
                        listing_id: record_id,
                    },
                    order:[['createdAt','DESC']]
                })
        }
        catch(error){
            console.log(error)
            throw new Error("SELECT FROM WHERE statement did not work ")
        }
    }

    async retrieveByOwnerId(record_id:number):Promise<Listing[]>{
        try {
            console.log()
            return await Listing.findAll(
                {
                    where: {
                        owner_id: record_id,
                    },
                    order:[['createdAt','DESC']]
                })
        }
        catch(error){
            console.log(error)
            throw new Error("SELECT FROM WHERE statement did not work ")
        }
    }

    async retrieveAll(category:any, subcategory:any):Promise<Listing[]>{
        try {

            const whereCondition:any = {}; 
            if (category){whereCondition.category = category }
            if (subcategory){whereCondition.subcategory = subcategory }

            console.log(whereCondition)

            return await Listing.findAll({where:whereCondition,
                order:[['createdAt','DESC']]});
        }
        catch(error){
            console.log(error)
            throw new Error("SELECT ALL statement did not work")
        }
    }


}