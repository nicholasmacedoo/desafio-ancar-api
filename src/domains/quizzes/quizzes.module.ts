import { Module } from '@nestjs/common';
import { QuizzesService } from './quizzes.service';
import { QuizzesController } from './quizzes.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Quiz } from './entities/quiz.entity';
import { Question } from './entities/question.entity';
import { AnswersController } from '../answers/answers.controller';
import { AnswersService } from '../answers/answers.service';
import { Answer } from '../answers/entities/answer.entity';

@Module({
  imports: [SequelizeModule.forFeature([Quiz, Question, Answer])],
  controllers: [QuizzesController,AnswersController],
  providers: [QuizzesService, AnswersService],
})
export class QuizzesModule {}
