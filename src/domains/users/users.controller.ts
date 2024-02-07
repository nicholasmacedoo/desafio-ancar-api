import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
} from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger'
import { User } from './entities/user.entity'

@ApiTags('Usuários')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um usuário.'})
  @ApiResponse({ status: 200, description: 'Objeto para criação de um usuário', type: User})
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto)
  }

  @Get()
  @ApiOperation({ summary: 'Listar usuários.'})
  @ApiResponse({ status: 200, description: 'Usuários encontrados.', type: User})
  @ApiQuery({ name: 'offset', required: false, type: Number, description: 'Deslocamento entre o começo da lista e um dado elemento. Valor default é 0.'})
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Quantidade máxima de resultados da pesquisa a serem retornados. Valor default é 100.'})
  index(
    @Query('offset', new DefaultValuePipe(0), ParseIntPipe) offset: number = 0, 
    @Query('limit',  new DefaultValuePipe(100), ParseIntPipe) limit: number = 100
  ) {
    return this.usersService.findAll(offset, limit)
  }

  @Get(':id')
  @ApiOperation({ summary: 'Recuperar um usuário específico.'})
  @ApiResponse({ status: 200, description: 'Usuário encontrado', type: User})
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  show(@Param('id') id: string) {
    return this.usersService.findOne(id)
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar usuário.'})
  @ApiResponse({ status: 200, description: 'Usuário atualizado com sucesso.'})
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletar usuário.'})
  @ApiResponse({ status: 200, description: 'Usuário deletado com sucesso.'})
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  remove(@Param('id') id: string) {
    return this.usersService.remove(id)
  }
}
