import ExampletableController from "../controller/ExampletableController";
import BaseRoutes from "./base/BaseRouter";
import validate from "../utils/validate";
import { CreateExampletableSchema, UpdateExampletableSchema } from "../utils/dataschemas/ExampletableSchema";


class ExampletableRoutes extends BaseRoutes{
    public routes():void {
        this.router.post("", validate(CreateExampletableSchema), ExampletableController.insert)
        this.router.patch("/:exampletable_id", validate(UpdateExampletableSchema), ExampletableController.update)
        this.router.delete("/:exampletable_id", ExampletableController.delete)
        this.router.get("/:exampletable_id", ExampletableController.selectWhereId)
        this.router.get("", ExampletableController.selectAll)
    }
}

export default new ExampletableRoutes().router