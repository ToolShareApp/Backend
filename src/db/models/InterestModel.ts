import {DataType, Model, Table, Column} from "sequelize-typescript"

@Table({
    tableName: Interest.CHAT_TABLE_NAME
})


export class Interest extends Model {

    public static CHAT_TABLE_NAME  = "interest" as string;
    public static CHAT_CHAT_ID  = "interest_id" as string;
    public static CHAT_LISTING_ID  = "listing_id" as string;
    public static CHAT_LENDEE_ID = "lendee_id" as string;


    @Column ({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: Interest.CHAT_CHAT_ID
    })
    interest_id!:number

    @Column ({
        type: DataType.INTEGER,
        allowNull: false,
        field: Interest.CHAT_LISTING_ID
    })
    listing_id!:number

    @Column ({
        type: DataType.INTEGER,
        allowNull: false,
        field: Interest.CHAT_LENDEE_ID
    })
    lendee_id!:number

}