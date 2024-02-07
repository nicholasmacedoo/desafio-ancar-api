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
import { ApiQuery, ApiTags } from '@nestjs/swagger'

@ApiTags('Usuários')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto)
  }

  @Get()
  @ApiQuery({ name: 'offset', required: false, type: Number, description: 'Deslocamento entre o começo da lista e um dado elemento. Valor default é 0.'})
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Quantidade máxima de resultados da pesquisa a serem retornados. Valor default é 100.'})
  index(
    @Query('offset', new DefaultValuePipe(0), ParseIntPipe) offset: number = 0, 
    @Query('limit',  new DefaultValuePipe(100), ParseIntPipe) limit: number = 100
  ) {
    return this.usersService.findAll(offset, limit)
  }

  @Get(':id')
  show(@Param('id') id: string) {
    return this.usersService.findOne(id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id)
  }
}
