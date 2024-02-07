import { ApiProperty } from "@nestjs/swagger";
import { CreateQuestionDto } from "./create-question.dto";

export class CreateQuizDto {
    @ApiProperty({
        description: 'Nome do questionário',
        type: String
    })
    nome: string;
    
    @ApiProperty({
        description: 'Descrição do questionário',
        type: String
    })
    descricao: string;

    @ApiProperty({
        description: 'Perguntas do questionário',
        type: [CreateQuestionDto],
        nullable: true,
    })
    perguntas?: CreateQuestionDto[];
}
