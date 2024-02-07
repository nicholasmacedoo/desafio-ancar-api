import { PartialType } from '@nestjs/mapped-types';
import { CreateAnswerDto } from './create-answer.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateAnswerDto extends PartialType(CreateAnswerDto) {
    @ApiProperty()
    id: string
}
