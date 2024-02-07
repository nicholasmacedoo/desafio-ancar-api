import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { InjectModel } from '@nestjs/sequelize'
import { User } from './entities/user.entity'
import { hash } from 'bcryptjs'

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User
  ) {}
  
  async create(createUserDto: CreateUserDto): Promise<User> {

    const hashedPassword = await hash(createUserDto.password, 8)

    const user = await this.userModel.create({
      nome: createUserDto.nome,
      email: createUserDto.email,
      cpf: createUserDto.cpf,
      password: hashedPassword,
    })

    await user.save()

    return user;
  }

  async findAll(offset: number, limit: number) {
<<<<<<< HEAD
    const count = await this.userModel.count()

    const results = await this.userModel.findAll({
=======

    const usersResult = await this.userModel.findAndCountAll({
>>>>>>> finished
      offset,
      limit,
      attributes: ['id', 'nome', 'cpf', 'createdAt', 'updatedAt']
    })
    
    const resultSetMedata = {
<<<<<<< HEAD
      count,
=======
      count: usersResult.count,
>>>>>>> finished
      offset,
      limit
    }

    return {
      resultSetMedata,
<<<<<<< HEAD
      results
=======
      results: usersResult.rows,
>>>>>>> finished
    }
  }

  async findOne(id: string) {
    const user = await this.userModel.findOne({
      where: {
        id,
      }
    })

    if(!user) throw new NotFoundException('Usuário não encontrado')

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userModel.findOne({
      where: {
        id,
      }
    })

    if(!user) throw new NotFoundException('Usuário não encontrado')

    await this.userModel.update(updateUserDto, {
      where: {
        id
      }
    })

  }

  async remove(id: string) {
    const user = await this.userModel.findOne({
      where: {
        id,
      }
    })

    if(!user) throw new NotFoundException('Usuário não encontrado')

    await this.userModel.destroy({
      where: {
        id,
      }
    })
  }
}
