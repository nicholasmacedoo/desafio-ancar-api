import { Module } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { SessionsController } from './sessions.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/domains/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Module({
    imports: [SequelizeModule.forFeature([User]), JwtService],
    controllers: [SessionsController],
    providers: [SessionsService]
})
export class SessionsModule {}
