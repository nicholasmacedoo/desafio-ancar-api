import { ApiProperty } from "@nestjs/swagger";

export class CreateAuthenticateDto {
    @ApiProperty()
    email: string;

    @ApiProperty()
    senha: string;
}