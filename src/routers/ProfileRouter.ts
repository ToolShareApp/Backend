import ProfileController from "../controller/ProfileController";
import BaseRoutes from "./base/BaseRouter";
import validate from "../utils/validate";
import { CreateProfileSchema } from "../utils/dataschemas/ProfileSchema";


class ProfileRoutes extends BaseRoutes{
    public routes():void {
        this.router.post("", validate(CreateProfileSchema), ProfileController.insert)
        this.router.delete("/:profile_id", ProfileController.delete)
        this.router.get("/email/:email", ProfileController.selectWhereEmail)
        this.router.get("/auth", ProfileController.selectWhereCredentials)
        this.router.get("/:profile_id", ProfileController.selectWhereId)

        this.router.get("", ProfileController.selectAll)
    }
}

export default new ProfileRoutes().router