import { Column, DataType, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Question } from "./question.entity";
import { User } from "src/domains/users/entities/user.entity";

@Table
export class QuestionUser extends Model {
    @PrimaryKey
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4
    })
    id: string;

    @Column({
        onDelete: 'cascade'
    })
    @ForeignKey(() => Question)
    quiz_id: string;
    
    @Column({
        onDelete: 'cascade'
    })
    @ForeignKey(() => User)
    user_id: string;

    // o campo data será considerado como o createdAt
}