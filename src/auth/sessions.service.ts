import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAuthenticateDto } from './dto/create-authenticate.dto';
import { User } from 'src/domains/users/entities/user.entity';
import { InjectModel } from '@nestjs/sequelize';
import { JwtService } from '@nestjs/jwt';
<<<<<<< HEAD
=======
import { compare } from 'bcryptjs';
>>>>>>> finished

@Injectable()
export class SessionsService {
    constructor(
        @InjectModel(User)
        private userRepository: typeof User,
        private jwt: JwtService
    ) {}

    async authenticate(createAuthenticate: CreateAuthenticateDto) {
        const user = await this.userRepository.findOne({
            where: {
<<<<<<< HEAD
                email: createAuthenticate.email,
            }
        }) 

        if(!user) throw new BadRequestException('Email/Senha inválida')

        // const verifyPassword = 

        const token = this.jwt.sign({ user_id: user.id })

        return token
=======
                cpf: createAuthenticate.cpf,
            },
        }) 

        if(!user) throw new BadRequestException('Cpf/Senha inválida')

        const isPasswordValid = await compare(createAuthenticate.senha, user.password)

        if(!isPasswordValid) throw new BadRequestException('Cpf/Senha inválida')
        
        const token = this.jwt.sign({ user_id: user.id })

        const userResponse = {
            ...user.dataValues,
            password: undefined,
        }

        delete userResponse.password

        return {
            user: userResponse,
            token
        }
>>>>>>> finished
    }
}
