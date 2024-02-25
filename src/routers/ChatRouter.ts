import ChatController from "../controller/ChatController";
import BaseRoutes from "./base/BaseRouter";
import validate from "../utils/validate";
import { CreateChatSchema } from "../utils/dataschemas/ChatSchema";


class ChatRoutes extends BaseRoutes{
    public routes():void {
       this.router.post("", validate(CreateChatSchema), ChatController.insert)
        this.router.get("/user/:user_id", ChatController.selectWhereUserId)
    }
}

export default new ChatRoutes().router