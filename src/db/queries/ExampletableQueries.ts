import { Exampletable } from "../models/ExampletableModel";

interface IexampletableQuery {
    save(data:Exampletable):Promise<void>;
    update(data:Exampletable):Promise<void>;
    delete(id:number):Promise<void>;
    retrieveById(id:number):Promise<Exampletable>;
    retrieveAll():Promise<Exampletable[]>;
}

export class ExampletableQuery implements IexampletableQuery {
   async save(data:Exampletable):Promise<void>{
        try {
            console.log("here is the data")
            console.log(data)
            await Exampletable.create(
                {
                    exampletable_id: data.id,
                    counter: data.counter,
                    name: data.name,
                    birthday: data.birthday
                }
            )
        }
        catch(error){
            console.log(error)
            throw new Error("INSERT INTO statement did not work")
        }
    }

    async update(data:Exampletable):Promise<void>{
        try {
           const exampletable_row =  await Exampletable.findOne(
                {
                    where: {
                        id: data.id,
                    }
                })
                if(!exampletable_row){
                    throw new Error("Could not find the record to update")
                }
                exampletable_row.counter = data.counter;
                exampletable_row.name = data.name;
                exampletable_row.birthday = data.birthday;
                await exampletable_row.save();
        }
        catch(error){
            console.log(error)
            throw new Error("UPDATE statement did not work")
        }
    }

    async delete(record_id:number):Promise<void>{
        try {
           const exampletable_row =  await Exampletable.findOne(
                {
                    where: {
                        id: record_id,
                    }
                })
                if(!exampletable_row){
                    throw new Error("Could not find the record to delete")
                }
                await exampletable_row.destroy();
        }
        catch(error){
            console.log(error)
            throw new Error("DELETE statement did not work ")
        }
    }

    async retrieveById(record_id:number):Promise<Exampletable>{
        try {
           const exampletable_row =  await Exampletable.findOne(
                {
                    where: {
                        id: record_id,
                    }
                })
                if(!exampletable_row){
                    throw new Error("Could not find the record")
                }
            
            return exampletable_row

        }
        catch(error){
            console.log(error)
            throw new Error("SELECT FROM WHERE statement did not work ")
        }
    }

    async retrieveAll():Promise<Exampletable[]>{
        try {
            return await Exampletable.findAll();
        }
        catch(error){
            console.log(error)
            throw new Error("SELECT ALL statement did not work")
        }
    }


}