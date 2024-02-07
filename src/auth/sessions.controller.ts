import { Body, Controller, Post } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { CreateAuthenticateDto } from './dto/create-authenticate.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseSessionDto } from './dto/response-session.dto';

@ApiTags('Autenticaçao')
@Controller('sessions')
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}
  @ApiOperation({ summary: 'Criar autenticação'})
  @ApiResponse({ status: 200, description: 'Objeto referente a autenticação do usuário.', type: ResponseSessionDto})
  @Post()
    async create(@Body() createAuthenticate: CreateAuthenticateDto) {
        return this.sessionsService.authenticate(createAuthenticate)
    }
}
