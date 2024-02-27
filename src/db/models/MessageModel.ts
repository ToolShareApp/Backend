import {DataType, Model, Table, Column} from "sequelize-typescript"

@Table({
    tableName: Message.MESSAGE_TABLE_NAME
})


export class Message extends Model {

    public static MESSAGE_TABLE_NAME  = "message" as string;
    public static MESSAGE_MESSAGE_ID  = "message_id" as string;
    public static MESSAGE_CHAT_ID  = "chat_id" as string;
    public static MESSAGE_AUTHOR_ID  = "author_id" as string;
    public static MESSAGE_TEXT = "text" as string;
    public static MESSAGE_STATUS = "status" as string;

    @Column ({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: Message.MESSAGE_MESSAGE_ID
    })
    message_id!:number

    @Column ({
        type: DataType.INTEGER,
        allowNull: false,
        field: Message.MESSAGE_CHAT_ID
    })
    chat_id!:number

    @Column ({
        type: DataType.INTEGER,
        allowNull: false,
        field: Message.MESSAGE_AUTHOR_ID
    })
    author_id!:number

    @Column ({
        type: DataType.STRING(1000),
        allowNull: false,
        field: Message.MESSAGE_TEXT
    })
    text!:string

    @Column ({
        type: DataType.INTEGER,
        allowNull: false,
        defaultValue: 0,
        field: Message.MESSAGE_STATUS
    })
    status!:number
}