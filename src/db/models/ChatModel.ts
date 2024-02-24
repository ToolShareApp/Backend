import {DataType, Model, Table, Column} from "sequelize-typescript"

@Table({
    tableName: Chat.CHAT_TABLE_NAME
})


export class Chat extends Model {

    public static CHAT_TABLE_NAME  = "chat" as string;
    public static CHAT_CHAT_ID  = "chat_id" as string;
    public static CHAT_LISTING_ID  = "listing_id" as string;
    public static CHAT_OWNER_ID  = "owner_id" as string;
    public static CHAT_LENDEE_ID = "lendee_id" as string;
    public static CHAT_START_DT  = "start_dt" as string;
    public static CHAT_END_DT = "end_dt" as string;
    public static CHAT_STATUS = "status" as string;


    @Column ({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: Chat.CHAT_CHAT_ID
    })
    chat_id!:number

    @Column ({
        type: DataType.INTEGER,
        allowNull: false,
        unique:true,
        field: Chat.CHAT_LISTING_ID
    })
    listing_id!:number

    @Column ({
        type: DataType.INTEGER,
        allowNull: false,
        field: Chat.CHAT_OWNER_ID
    })
    owner_id!:number

    @Column ({
        type: DataType.INTEGER,
        allowNull: false,
        field: Chat.CHAT_LENDEE_ID
    })
    lendee_id!:number

    @Column ({
        type: DataType.DATEONLY,
        field: Chat.CHAT_START_DT
    })
    start_dt!:Date

    @Column ({
        type: DataType.DATEONLY,
        field: Chat.CHAT_END_DT
    })
    end_dt!:Date

    @Column ({
        type: DataType.INTEGER,
        allowNull: false,
        defaultValue: 0,
        field: Chat.CHAT_STATUS
    })
    status!:number
}