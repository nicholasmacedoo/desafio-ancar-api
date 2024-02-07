import { ApiProperty } from "@nestjs/swagger";

export class CreateAuthenticateDto {
    @ApiProperty()
    cpf: string;

    @ApiProperty()
    senha: string;
}