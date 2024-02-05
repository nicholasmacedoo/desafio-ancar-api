import { BelongsTo, Column, DataType, ForeignKey, Model, NotNull, PrimaryKey, Table } from "sequelize-typescript";
import { Quiz } from "./quiz.entity";

@Table({ tableName: 'questions' })
export class Question extends Model {
    @PrimaryKey
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4
    })
    id: string;

    @Column
    descricao: string

    @Column(DataType.UUID)
    @ForeignKey(() => Quiz)
    quiz_id: string;

    @BelongsTo(() => Quiz)
    quiz: Quiz;
}
