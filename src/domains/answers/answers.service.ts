import { Injectable } from '@nestjs/common';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Answer } from './entities/answer.entity';

@Injectable()
export class AnswersService {
  constructor(
    @InjectModel(Answer)
    private answerRepository: typeof Answer
  ) {}

  create(createAnswerDto: CreateAnswerDto) {
    return this.answerRepository.create({
      ...createAnswerDto
    });
  }

  findAll(offset: number = 0, limit: number = 100) {
    return this.answerRepository.findAll({
      limit,
      offset
    })
  }

  findOne(id: number) {
    return `This action returns a #${id} answer`;
  }

  update(id: number, updateAnswerDto: UpdateAnswerDto) {
    return `This action updates a #${id} answer`;
  }

  remove(id: number) {
    return `This action removes a #${id} answer`;
  }
}
