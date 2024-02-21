import {DataType, Model, Table, Column} from "sequelize-typescript"
import { Profile } from "./ProfileModel";

@Table({
    tableName: Listing.LISTING_TABLE_NAME
})


export class Listing extends Model {

    public static LISTING_TABLE_NAME  = "listing" as string;
    public static LISTING_LISTING_ID  = "listing_id" as string;
    public static LISTING_OWNER_ID  = "owner_id" as string;
    public static LISTING_TOOL  = "tool" as string;
    public static LISTING_CATEGORY = "category" as string;
    public static LISTING_SUBCATEGORY  = "subcategory" as string;
    public static LISTING_DEPOSIT_REQUIRED  = "deposit_required" as string;
    public static LISTING_DEPOSIT_AMOUNT  = "deposit_amount" as string;
    public static LISTING_DESCRIPTION  = "description" as string;
    public static LISTING_PHOTO_URL  = "photo_url" as string;


    @Column ({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: Listing.LISTING_LISTING_ID
    })
    listing_id!:number

    @Column ({ // this needs to be a FK to Profile.profile_id - look up docs about associations
        type: DataType.INTEGER,
        field: Listing.LISTING_OWNER_ID
    })
    owner_id!:number

    @Column ({
        type: DataType.STRING,
        allowNull: false,
        field: Listing.LISTING_TOOL
    })
    tool!:string

    @Column ({
        type: DataType.STRING,
        allowNull: false,
        field: Listing.LISTING_CATEGORY
    })
    category!:string

    @Column ({
        type: DataType.STRING,
        allowNull: false,
        field: Listing.LISTING_SUBCATEGORY
    })
    subcategory!:string

    @Column ({
        type: DataType.BOOLEAN,
        defaultValue: false,
        field: Listing.LISTING_DEPOSIT_REQUIRED
    })
    deposit_required!:boolean

    @Column ({
        type: DataType.INTEGER,
        defaultValue: 0,
        field: Listing.LISTING_DEPOSIT_AMOUNT
    })
    deposit_amount!:number

    @Column ({
        type: DataType.STRING,
        allowNull: false,
        field: Listing.LISTING_DESCRIPTION
    })
    description!:string

    @Column ({
        type: DataType.STRING,
        field: Listing.LISTING_PHOTO_URL
    })
    photo_url!:string
}