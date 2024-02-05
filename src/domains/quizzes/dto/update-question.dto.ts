// import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateQuestionDto } from './create-question.dto';

export class UpdateQuestionDto extends PartialType(CreateQuestionDto) {
    @ApiProperty({ description: 'Id da pergunta; na ausência do ID, será considerado como criação; caso contrário, como atualização.'})
    id?: string;
}
