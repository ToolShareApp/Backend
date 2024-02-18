import {DataType, Model, Table, Column} from "sequelize-typescript"

@Table({
    tableName: Exampletable.EXAMPLETABLE_TABLE_NAME
})


export class Exampletable extends Model {

    public static EXAMPLETABLE_TABLE_NAME  = "exampletable" as string;
    public static EXAMPLETABLE_ID  = "exampletable_id" as string;
    public static EXAMPLETABLE_NUMBERFIELD = "counter" as string;
    public static EXAMPLETABLE_STRINGFIELD  = "name" as string;
    public static EXAMPLETABLE_DATEFIELD  = "birthday" as string;

    @Column ({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: Exampletable.EXAMPLETABLE_ID
    })
    id!:number

    @Column ({
        type: DataType.INTEGER,
        allowNull: false,
        field: Exampletable.EXAMPLETABLE_NUMBERFIELD
    })
    counter!:number

    @Column ({
        type: DataType.STRING,
        allowNull: false,
        field: Exampletable.EXAMPLETABLE_STRINGFIELD
    })
    name!:string

    @Column ({
        type: DataType.DATE,
        allowNull: false,
        field: Exampletable.EXAMPLETABLE_DATEFIELD
    })
    birthday!:Date

}