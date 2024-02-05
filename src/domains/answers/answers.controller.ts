import { Controller, Get, Post, Body, Patch, Param, Delete, Query, DefaultValuePipe, ParseIntPipe } from '@nestjs/common';
import { AnswersService } from './answers.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

// @ApiTags('Respostas')
@Controller('quizzes')
export class AnswersController {
  constructor(private readonly answersService: AnswersService) {}

  @Post(':idQuizzes/answers')
  create(@Body() createAnswerDto: CreateAnswerDto) {
    return this.answersService.create(createAnswerDto);
  }

  @Get(':idQuizzes/answers')
  @ApiQuery({ name: 'loadQuestions', required: false, type: Boolean, description: 'O valor "true" (Verdadeiro) ativa o carregamento das perguntas associadas ao questionário.'})
  @ApiQuery({ name: 'offset', required: false, type: Number, description: 'Deslocamento entre o começo da lista e um dado elemento. Valor default é 0.'})
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Quantidade máxima de resultados da pesquisa a serem retornados. Valor default é 100.'})
  findAll(
    @Query('offset', new DefaultValuePipe(0), ParseIntPipe) offset: number = 0, 
    @Query('limit', new DefaultValuePipe(100), ParseIntPipe) limit: number = 100) {
    return this.answersService.findAll(offset, limit);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.answersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAnswerDto: UpdateAnswerDto) {
    return this.answersService.update(+id, updateAnswerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.answersService.remove(+id);
  }
}
