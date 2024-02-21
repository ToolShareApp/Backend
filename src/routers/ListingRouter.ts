import ListingController from "../controller/ListingController";
import BaseRoutes from "./base/BaseRouter";
import validate from "../utils/validate";
import { CreateListingSchema } from "../utils/dataschemas/ListingSchema";


class ListingRoutes extends BaseRoutes{
    public routes():void {
        this.router.post("", validate(CreateListingSchema), ListingController.insert)
        this.router.delete("/:listing_id", ListingController.delete)
        this.router.get("/:listing_id", ListingController.selectWhereId)
        this.router.get("/owner/:owner_id", ListingController.selectWhereOwnerId)
        this.router.get("", ListingController.selectAll)
    }
}

export default new ListingRoutes().router