import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { Quiz } from './entities/quiz.entity';
import { InjectModel } from '@nestjs/sequelize';
import { Question } from './entities/question.entity';

@Injectable()
export class QuizzesService {
  constructor(
    @InjectModel(Quiz)
    private quizzesRepository: typeof Quiz,
    @InjectModel(Question)
    private questionModel: typeof Question
    ) {}

  async create(createQuizDto: CreateQuizDto) {
    let quizResponse: Quiz;

    await this.quizzesRepository.sequelize.transaction(async (transaction) => {
      const quiz = await this.quizzesRepository.create({
        nome: createQuizDto.nome,
        descricao: createQuizDto.descricao,
        perguntas: createQuizDto.perguntas,
      }, { transaction })
  
      if(createQuizDto.perguntas && createQuizDto.perguntas.length > 0) {
        const createdQuestions = await Promise.all(
          createQuizDto.perguntas.map(async(questionDto) => {
            const question = await this.questionModel.create({
              descricao: questionDto.descricao,
            }, { transaction })
  
            await quiz.$add('perguntas', question, { transaction })
  
            return question
          })
        )
  
        quiz.perguntas = createdQuestions
      }
      
      await quiz.save({ transaction })

      quizResponse = quiz
    })


    return quizResponse;
  }

  async findAll(offset: number, limit: number, withQuetions?: boolean) {
    const count = await this.quizzesRepository.count()

    let results: Quiz[] = []; 
    
    if(withQuetions) {
      results = await this.quizzesRepository
      .scope('withQuestions')
      .findAll({
        limit,
        offset,
      });
    } else {
      results = await this.quizzesRepository.findAll({
        limit,
        offset
      });
    }

    const resultSetMedata = {
      count,
      offset,
      limit
    }

    return {
      resultSetMedata,
      results
    }
  }

  async findOne(id: string, loadQuestions?: boolean) {
    let quiz: Quiz;

    if(loadQuestions) {
      quiz = await this.quizzesRepository.scope('withQuestions').findOne({
        where: {
          id,
        }
      })
    } else {
      quiz = await this.quizzesRepository.findOne({
       where: {
         id,
       }
     })
    }

    if(!quiz) throw new NotFoundException('Nenhum questionário encontrado')

    return quiz;
  }

  async update(id: string, updateQuizDto: UpdateQuizDto) {
    const quiz = await this.quizzesRepository.findOne({
      where: {
        id,
      },
      include: [Question]
    })

    if(!quiz) throw new NotFoundException('Nenhum questionário encontrado')
    
    const { perguntas } = updateQuizDto

    await this.quizzesRepository.sequelize.transaction(async transaction => {
      await Promise.all([
        perguntas?.map(async (perguntaData) => {
          const questionExists = quiz.perguntas.find(_question => _question.id === perguntaData.id)

          if(questionExists) {
            await this.questionModel.update(perguntaData,{ 
              where: {
                id: perguntaData.id,
              },
              transaction
            })
          } else {
            const question = await this.questionModel.create({
              descricao: perguntaData.descricao,
            }, { transaction })
  
            await quiz.$add('perguntas', question, { transaction })
          }
        })
      ])

      await this.quizzesRepository.update(updateQuizDto, {
        where: {
          id,
        },
        transaction
      })
    })
  }

  async remove(id: string) {
    const quiz = await this.quizzesRepository.findOne({
      where: {
        id,
      }
    })

    if(!quiz) throw new NotFoundException('Nenhum questionário encontrado')
    
    await this.quizzesRepository.destroy({
      where: {
        id,
      }
    })
  }
}
