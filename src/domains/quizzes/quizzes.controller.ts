import { Controller, Get, Post, Body, Patch, Param, Delete, Query, DefaultValuePipe, ParseIntPipe } from '@nestjs/common';
import { QuizzesService } from './quizzes.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('Questionários')
@Controller('quizzes')
export class QuizzesController {
  constructor(private readonly quizzesService: QuizzesService) {}

  @Post()
  create(@Body() createQuizDto: CreateQuizDto) {
    return this.quizzesService.create(createQuizDto);
  }

  @Get()
  @ApiQuery({ name: 'loadQuestions', required: false, type: Boolean, description: 'O valor "true" (Verdadeiro) ativa o carregamento das perguntas associadas ao questionário.'})
  @ApiQuery({ name: 'offset', required: false, type: Number, description: 'Deslocamento entre o começo da lista e um dado elemento. Valor default é 0.'})
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Quantidade máxima de resultados da pesquisa a serem retornados. Valor default é 100.'})
  findAll(
    @Query('offset', new DefaultValuePipe(0), ParseIntPipe) offset: number = 0, 
    @Query('limit', new DefaultValuePipe(100), ParseIntPipe) limit: number = 100, 
    @Query('loadQuestions') loadQuestions?: boolean
  ) {
    return this.quizzesService.findAll(offset, limit, loadQuestions);
  }

  @Get(':id')
  @ApiQuery({ name: 'loadQuestions', required: false, type: Boolean, description: 'O valor "true" (Verdadeiro) ativa o carregamento das perguntas associadas ao questionário.'})
  findOne(@Param('id') id: string, @Query('loadQuestions') loadQuestions?: boolean) {
    return this.quizzesService.findOne(id, loadQuestions);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQuizDto: UpdateQuizDto) {
    return this.quizzesService.update(id, updateQuizDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.quizzesService.remove(id);
  }
}
