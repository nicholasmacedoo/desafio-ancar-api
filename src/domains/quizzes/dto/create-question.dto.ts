import { ApiProperty } from "@nestjs/swagger";

export class CreateQuestionDto {
    @ApiProperty()
    descricao: string;
}