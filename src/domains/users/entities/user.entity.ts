import { AutoIncrement, Column, DataType, IsUUID, Model, PrimaryKey, Table, Unique } from "sequelize-typescript";


@Table({ tableName: 'users' })
export class User extends Model {
    
    @PrimaryKey
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4
    })
    id: string;

    @Column
    nome: string;

    @Unique
    @Column
    email: string;

    @Column
    password: string

    @Column
    cpf: string
}
