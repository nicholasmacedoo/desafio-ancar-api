import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CreateAuthenticateDto } from "./dto/create-authenticate.dto";

@ApiTags('Autenticação')
@Controller('auth')
export class AuthController {

    @Post()
    async create(@Body() createAuthenticate: CreateAuthenticateDto) {
        
    }
}