import { Interest } from "../models/InterestModel";

interface IInterestQuery {
    save(data:Interest):Promise<void>;
    retrieveByLendeeId(user_id:number):Promise<Interest[]>;
   
}

export class InterestQuery implements IInterestQuery {

   async save(data:Interest):Promise<void>{
        try {
            await Interest.create(
                {
                    interest_id: data.interest_id,
                    listing_id: data.listing_id,
                    lendee_id : data.lendee_id,
                }
            )
        }
        catch(error){
            console.log(error)
            throw new Error("INSERT INTO statement did not work")
        }
    }


    async retrieveByLendeeId(user_id:number):Promise<Interest[]>{
        try {
            return await Interest.findAll(
                {
                    where: {
                        lendee_id: user_id,
                    }
                }
            );
        }
        catch(error){
            console.log(error)
            throw new Error("SELECT ALL statement did not work")
        }
    }
}