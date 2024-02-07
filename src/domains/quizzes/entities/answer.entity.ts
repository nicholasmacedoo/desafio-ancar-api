import { ApiProperty } from "@nestjs/swagger";
import { Model, Column, DataType, ForeignKey, PrimaryKey, Table } from "sequelize-typescript";
import { Question } from "src/domains/quizzes/entities/question.entity";

@Table({ tableName: 'answers' })
export class Answer extends Model{
    @ApiProperty()
    @PrimaryKey
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4
    })
    id: string;

    @ApiProperty()
    @Column
    descricao: string;
    
    @ApiProperty()
    @ForeignKey(() => Question)
    @Column({ onDelete: 'cascade' })
    question_id: string;    
}
