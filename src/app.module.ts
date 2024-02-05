import { Module } from '@nestjs/common'
import { UsersModule } from './domains/users/users.module'
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from './env';
import { QuizzesModule } from './domains/quizzes/quizzes.module';
import { AnswersModule } from './domains/answers/answers.module';
// import { AuthModule } from './auth/auth.module';
// import { SessionsModule } from './auth/sessions.module';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: '.env',
    validate: env => envSchema.parse(env),
    isGlobal: true,
  }), DatabaseModule, UsersModule, QuizzesModule, AnswersModule /* AuthModule, SessionsModule */],
  providers: [],
})
export class AppModule {}
