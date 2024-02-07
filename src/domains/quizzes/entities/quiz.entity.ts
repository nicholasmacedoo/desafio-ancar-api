import { Column, DataType, HasMany, Model, PrimaryKey, Scopes, Table } from "sequelize-typescript";
import { Question } from "./question.entity";
import { ApiProperty } from "@nestjs/swagger";

@Scopes(() => ({
    withQuestions: {
        include: [Question]
    }
}))
@Table({ tableName: 'quizzes' })
export class Quiz extends Model {
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

    @ApiProperty()
    @Column(DataType.TEXT)
    descricao: string;

    @ApiProperty()
    @HasMany(() => Question, {
        onDelete: 'cascade',
        foreignKey: 'quiz_id'
    })
    perguntas?: Question[]
    // No modelo conceitual é informado a data porém por convensão o sequelize já cria
    // a coluna createdAt (que consideraremos a data) e updatedAt.
}
