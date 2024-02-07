import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAuthenticateDto } from './dto/create-authenticate.dto';
import { User } from 'src/domains/users/entities/user.entity';
import { InjectModel } from '@nestjs/sequelize';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';

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
    }
}
