import { Column, DataType, HasMany, Model, PrimaryKey, Scopes, Table } from "sequelize-typescript";
import { Question } from "./question.entity";

@Scopes(() => ({
    withQuestions: {
        include: [Question]
    }
}))
@Table({ tableName: 'quizzes' })
export class Quiz extends Model {
    @PrimaryKey
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4
    })
    id: string;

    @Column
    nome: string;

    @Column(DataType.TEXT)
    descricao: string;

    @HasMany(() => Question, {
        onDelete: 'cascade',
        foreignKey: 'quiz_id'
    })
    perguntas?: Question[]
    // No modelo conceitual é informado a data porém por convensão o sequelize já cria
    // a coluna createdAt (que consideraremos a data) e updatedAt.
}
