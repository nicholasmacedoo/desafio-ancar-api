import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/domains/users/entities/user.entity";

export class ResponseSessionDto {
    @ApiProperty()
    user: User;

    @ApiProperty()
    token: string;
}