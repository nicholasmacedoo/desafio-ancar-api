import { Body, Controller, Post } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { CreateAuthenticateDto } from './dto/create-authenticate.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Autenticaçao')
@Controller('sessions')
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}
  @Post()
    async create(@Body() createAuthenticate: CreateAuthenticateDto) {
        return this.sessionsService.authenticate(createAuthenticate)
    }
}
