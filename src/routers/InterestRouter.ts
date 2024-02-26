import InterestController from "../controller/InterestController";
import BaseRoutes from "./base/BaseRouter";
import validate from "../utils/validate";
import { CreateInterestSchema } from "../utils/dataschemas/InterestSchema";


class InterestRoutes extends BaseRoutes{
    public routes():void {
       this.router.post("", validate(CreateInterestSchema), InterestController.insert)
        this.router.get("/lendee/:user_id", InterestController.selectWhereUserId)
    }
}

export default new InterestRoutes().router