import { Module } from '@nestjs/common';
import { QuizzesService } from './services/quizzes.service';
import { QuizzesController } from './controllers/quizzes.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Quiz } from './entities/quiz.entity';
import { Question } from './entities/question.entity';
import { AnswersController } from './controllers/answers.controller';
import { AnswersService } from './services/answers.service';
import { Answer } from './entities/answer.entity';
import { QuestionUser } from './entities/question-user.entity';

@Module({
  imports: [SequelizeModule.forFeature([Quiz, Question, Answer, QuestionUser])],
  controllers: [QuizzesController,AnswersController],
  providers: [QuizzesService, AnswersService],
})
export class QuizzesModule {}
