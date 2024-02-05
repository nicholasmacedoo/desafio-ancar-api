import { ApiProperty } from "@nestjs/swagger";

export class CreateAnswerDto {
    @ApiProperty()
    descricao: string;
    
    @ApiProperty()
    question_id: string;   
}
