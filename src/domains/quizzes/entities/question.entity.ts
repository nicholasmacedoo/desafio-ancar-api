import { BelongsTo, Column, DataType, ForeignKey, Model, NotNull, PrimaryKey, Table } from "sequelize-typescript";
import { Quiz } from "./quiz.entity";
import { ApiProperty } from "@nestjs/swagger";

@Table({ tableName: 'questions' })
export class Question extends Model {
    @ApiProperty()
    @PrimaryKey
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4
    })
    id: string;

    @ApiProperty()
    @Column
    descricao: string

    @ApiProperty()
    @Column(DataType.UUID)
    @ForeignKey(() => Quiz)
    quiz_id: string;

    @ApiProperty()
    @BelongsTo(() => Quiz)
    quiz: Quiz;
}
