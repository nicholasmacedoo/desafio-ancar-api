import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, PrimaryKey, Table, Unique } from "sequelize-typescript";

@Table({ tableName: 'users' })
export class User extends Model {
    
    @ApiProperty()
    @PrimaryKey
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4
    })
    id: string;

    @ApiProperty()
    @Column
    nome: string;

    @Column
    password: string

    @ApiProperty()
    @Column
    cpf: string
}
