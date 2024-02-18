import {Request, Response} from "express";
import { ExampletableQuery } from "../db/queries/ExampletableQueries";
import { Exampletable } from "../db/models/ExampletableModel";


class ExampletableController {
    async insert(req:Request, res:Response){
        try{
            const new_exampletable_row  = new Exampletable();
            new_exampletable_row.counter = req.body.counter;
            new_exampletable_row.name = req.body.name;
            new_exampletable_row.birthday = req.body.birthday;

            await new ExampletableQuery().save(new_exampletable_row);

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
            const id = parseInt(req.params["record_id"]);
            const new_exampletable_row  = new Exampletable();
            new_exampletable_row.id = id;
            new_exampletable_row.counter = req.body.counter;
            new_exampletable_row.name = req.body.name;
            new_exampletable_row.birthday = req.body.birthday;

            await new ExampletableQuery().update(new_exampletable_row);

            res.status(201).json({
                status:"Created!",
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
            const id = parseInt(req.params["record_id"]);

            await new ExampletableQuery().delete(id);

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
            const id = parseInt(req.params["record_id"]);
            const new_exampletable_row  = await new ExampletableQuery().retrieveById(id);

            res.status(201).json({
                status:"OK!",
                message: "Here is your data:",
                data:new_exampletable_row
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
            const new_exampletable_row  = await new ExampletableQuery().retrieveAll();

            res.status(201).json({
                status:"OK!",
                message: "Here is your data:",
                data:new_exampletable_row
            });
        } catch (err) {
            res.status(500).json({
                status:"Internal Server Error!",
                message: "Internal Server Error!"
            })
        }
    }
}

export default new ExampletableController()