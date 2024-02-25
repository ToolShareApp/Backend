import MessageController from "../controller/MessageController";
import BaseRoutes from "./base/BaseRouter";
import validate from "../utils/validate";
import { CreateMessageSchema } from "../utils/dataschemas/MessageSchema";


class MessageRoutes extends BaseRoutes{
    public routes():void {
        this.router.get("/chat/:chat_id", MessageController.selectWhereChatId)
        this.router.post("/:chat_id", validate(CreateMessageSchema), MessageController.insertByChatId)
        this.router.delete("/:message_id", MessageController.delete)
    }
}

export default new MessageRoutes().router