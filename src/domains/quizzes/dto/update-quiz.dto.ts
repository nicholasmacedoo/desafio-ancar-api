import { ApiProperty, PartialType } from '@nestjs/swagger';
import { UpdateQuestionDto } from './update-question.dto';

export class UpdateQuizDto {
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
        type: [UpdateQuestionDto],
        nullable: true,
    })
    perguntas?: UpdateQuestionDto[];
}
