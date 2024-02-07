import { Controller, Get, Post, Body, Param, Delete, Query, DefaultValuePipe, ParseIntPipe, Put, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AnswersService } from '../services/answers.service';
import { CreateAnswerDto } from '../dto/create-answer.dto';
import { UpdateAnswerDto } from '../dto/update-answer.dto';
import { Answer } from '../entities/answer.entity';
import { CurrentUser } from 'src/auth/current-user-decorator';
import { TokenPayload } from 'src/auth/jwt.strategy';

@ApiTags('Questionários')
@Controller('/quizzes')
@UseGuards(AuthGuard('jwt'))
export class AnswersController {
  constructor(private readonly answersService: AnswersService) {}

  @Post(':quizId/answers')
  @ApiOperation({ summary: 'Cadastrar respostas ao um questionário'})
  @ApiResponse({ status: 200, description: 'Respostas encontradas.', type: [Answer]})
  @ApiResponse({ status: 404, description: 'Respostas não encontradas.'})
  create(@Param('quizId') quiz_id: string, @CurrentUser() user: TokenPayload, @Body() createAnswerDto: CreateAnswerDto) {
    return this.answersService.create(quiz_id, user.user_id, createAnswerDto);
  }

  @Get(':quizId/answers')
  @ApiOperation({ summary: 'Recuperar todas as respostas de um questioário'})
  @ApiResponse({ status: 200, description: 'Respostas encontradas.', type: [Answer]})
  @ApiResponse({ status: 404, description: 'Respostas não encontradas.'})
  @ApiQuery({ name: 'offset', required: false, type: Number, description: 'Deslocamento entre o começo da lista e um dado elemento. Valor default é 0.'})
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Quantidade máxima de resultados da pesquisa a serem retornados. Valor default é 100.'})
  findAll(
    @Query('offset', new DefaultValuePipe(0), ParseIntPipe) offset: number = 0, 
    @Query('limit', new DefaultValuePipe(100), ParseIntPipe) limit: number = 100, 
    @Param('quizId') quiz_id: string,  
  ) {
    return this.answersService.findAll(offset, limit, quiz_id);
  }

  @Put(':quizId/answers')
  @ApiOperation({ summary: 'Atualizar respostas de um questioário'})
  @ApiResponse({ status: 200, description: 'Resposta atualizada com sucesso.'})
  @ApiResponse({ status: 404, description: 'Resposta não encontradas.'})
  update(@Param('quizId') quiz_id: string, @Body() updateAnswerDto: UpdateAnswerDto) {
    return this.answersService.update(quiz_id, updateAnswerDto);
  }

  @Delete(':quizId/answers/:id')
  @ApiOperation({ summary: 'Deletar uma resposta de um questioário'})
  remove(@Param('quizId') quiz_id: string, @Param('id') id: string) {
    return this.answersService.remove(quiz_id, id);
  }
}
