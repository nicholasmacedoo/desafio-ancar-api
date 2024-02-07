import { Controller, Get, Post, Body, Patch, Param, Delete, Query, DefaultValuePipe, ParseIntPipe } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { QuizzesService } from '../services/quizzes.service'; 
import { CreateQuizDto } from '../dto/create-quiz.dto';
import { UpdateQuizDto } from '../dto/update-quiz.dto';
import { Quiz } from '../entities/quiz.entity';

@ApiTags('Questionários')
@Controller('/quizzes')
export class QuizzesController {
  constructor(private readonly quizzesService: QuizzesService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um questionário.'})
  @ApiResponse({ status: 200, description: 'Objeto para criação de um questionário', type: Quiz})
  create(@Body() createQuizDto: CreateQuizDto) {
    return this.quizzesService.create(createQuizDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar questionários.'})
  @ApiResponse({ status: 200, description: 'Questionários encontrados', type: [Quiz]})
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
  @ApiOperation({ summary: 'Recuperar um questionário específico.'})
  @ApiResponse({ status: 200, description: 'Questionário encontrado', type: Quiz})
  @ApiResponse({ status: 404, description: 'Questionário não encontrado' })
  @ApiQuery({ name: 'loadQuestions', required: false, type: Boolean, description: 'O valor "true" (Verdadeiro) ativa o carregamento das perguntas associadas ao questionário.'})
  findOne(@Param('id') id: string, @Query('loadQuestions') loadQuestions?: boolean) {
    return this.quizzesService.findOne(id, loadQuestions);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar questionário.'})
  @ApiResponse({ status: 200, description: 'Questionário atualizado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Questionário não encontrado' })
  update(@Param('id') id: string, @Body() updateQuizDto: UpdateQuizDto) {
    return this.quizzesService.update(id, updateQuizDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletar questionário.'})
  @ApiResponse({ status: 200, description: 'Questionário deletado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Questionário não encontrado' })
  remove(@Param('id') id: string) {
    return this.quizzesService.remove(id);
  }
}
