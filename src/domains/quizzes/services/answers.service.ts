import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAnswerDto } from '../dto/create-answer.dto';
import { UpdateAnswerDto } from '../dto/update-answer.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Answer } from '../entities/answer.entity';
import { Question } from '../entities/question.entity';
import { QuestionUser } from '../entities/question-user.entity';

@Injectable()
export class AnswersService {
  constructor(
    @InjectModel(Answer)
    private answerRepository: typeof Answer,
    @InjectModel(Question)
    private questionRepository: typeof Question,
    @InjectModel(QuestionUser)
    private questionUserRepository: typeof QuestionUser
  ) {}

  async create(quiz_id: string, user_id: string, createAnswerDto: CreateAnswerDto) {
    const question = await this.questionRepository.findOne({ where: { quiz_id }, attributes: ['id']})

    if(!question) throw new NotFoundException('Nenhum questionário encontrado')

    await this.questionUserRepository.create({
      question_id: quiz_id,
      user_id,
    })

    return this.answerRepository.create({
      ...createAnswerDto
    });
  }

  async findAll(offset: number = 0, limit: number = 100, quiz_id: string) {
    const question = await this.questionRepository.findOne({ where: { quiz_id }, attributes: ['id']})
    
    if(question) { 
      const answers = await this.answerRepository.findAndCountAll({
        limit,
        offset,
        where: {
          question_id: question.id,
        }
      })
      const resultSetMedata = {
        count: answers.count,
        offset,
        limit
      }

      return {
        resultSetMedata,
        results: answers.rows,
      }
    }

    return []
  }

  findOne(id: number) {
    return `This action returns a #${id} answer`;
  }

  async update(quiz_id: string, updateAnswerDto: UpdateAnswerDto) {
    const question = await this.questionRepository.findOne({ where: { quiz_id }, attributes: ['id']})

    if(!question) {
      throw new NotFoundException('Questioário não encontrado.')
    }

    await this.answerRepository.update(updateAnswerDto, {
      where: {
        id: updateAnswerDto.id
      }
    })
  }

  async remove(quiz_id: string, id: string) {
    const question = await this.questionRepository.findOne({ where: { quiz_id }, attributes: ['id']})

    if(!question) {
      throw new NotFoundException('Questioário não encontrado.')
    }
    
    await this.answerRepository.destroy({
      where: {
        id,
      }
    });
  }
}
