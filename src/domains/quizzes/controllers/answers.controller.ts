import { Controller, Get, Post, Body, Patch, Param, Delete, Query, DefaultValuePipe, ParseIntPipe, Put, UseGuards, Req } from '@nestjs/common';
import { AnswersService } from '../services/answers.service';
import { CreateAnswerDto } from '../dto/create-answer.dto';
import { UpdateAnswerDto } from '../dto/update-answer.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Answer } from '../entities/answer.entity';
import { AuthGuard } from '@nestjs/passport';
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
  findAll(@Param('id') id: string) {
    return this.answersService.findOne(+id);
  }

  @Put(':quizId/answers')
  @ApiOperation({ summary: 'Atualizar respostas de um questioário'})
  @ApiResponse({ status: 200, description: 'Resposta atualizada com sucesso.'})
  @ApiResponse({ status: 404, description: 'Resposta não encontradas.'})
  update(@Param('id') id: string, @Body() updateAnswerDto: UpdateAnswerDto) {
    return this.answersService.update(+id, updateAnswerDto);
  }

  @Delete(':quizId/answers/:id')
  @ApiOperation({ summary: 'Deletar uma resposta de um questioário'})
  remove(@Param('id') id: string) {
    return this.answersService.remove(+id);
  }
}
