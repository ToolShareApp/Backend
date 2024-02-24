import {DataType, Model, Table, Column} from "sequelize-typescript"

@Table({
    tableName: Profile.PROFILE_TABLE_NAME
})


export class Profile extends Model {

    public static PROFILE_TABLE_NAME  = "profile" as string;
    public static PROFILE_USER_ID  = "profile_id" as string;
    public static PROFILE_PASSWORD  = "password" as string;
    public static PROFILE_EMAIL  = "email" as string;
    public static PROFILE_VERIFIED = "verified" as string;
    public static PROFILE_DISPLAY_NAME  = "display_name" as string;
    public static PROFILE_BIO  = "bio" as string;
    public static PROFILE_LONGITUDE  = "longitude" as string;
    public static PROFILE_LATITUDE  = "latitude" as string;
    public static PROFILE_SEARCH_RADIUS  = "search_radius" as string;
    public static PROFILE_PICTURE_URL  = "picture_url" as string;


    @Column ({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: Profile.PROFILE_USER_ID
    })
    profile_id!:number

    @Column ({
        type: DataType.STRING,
        allowNull: false,
        field: Profile.PROFILE_PASSWORD
    })
    password!:string

    @Column ({
        type: DataType.STRING,
        allowNull: false,
        unique:true,
        field: Profile.PROFILE_EMAIL
    })
    email!:string

    @Column ({
        type: DataType.BOOLEAN,
        defaultValue: false,
        field: Profile.PROFILE_VERIFIED
    })
    verified!:number//this should be bool, need to change and test

    @Column ({
        type: DataType.STRING,
        allowNull: false,
        field: Profile.PROFILE_DISPLAY_NAME 
    })
    display_name!:string

    @Column ({
        type: DataType.STRING(1000),
        field: Profile.PROFILE_BIO
    })
    bio!:string

    @Column ({
        type: DataType.FLOAT,
        allowNull: false,
        field: Profile.PROFILE_LATITUDE
    })
    latitude!:number

    @Column ({
        type: DataType.FLOAT,
        allowNull: false,
        field: Profile.PROFILE_LONGITUDE
    })
    longitude!:number

    @Column ({
        type: DataType.INTEGER,
        defaultValue: 5,        
        field: Profile.PROFILE_SEARCH_RADIUS
    })
    search_radius!:number

    @Column ({
        type: DataType.STRING(500),
        field: Profile.PROFILE_PICTURE_URL
    })
    picture_url!:string
}