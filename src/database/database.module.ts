import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Env } from 'src/env';

@Module({
    imports: [
        SequelizeModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService<Env, true>) => {
                return {
                    dialect: 'postgres',
                    host: configService.get('SEQUELIZE_DATABASE_HOST'),
                    port: configService.get('SEQUELIZE_DATABASE_PORT'),
                    username: configService.get('SEQUELIZE_DATABASE_USERNAME'),
                    password: configService.get('SEQUELIZE_DATABASE_PASSWORD'),
                    database: configService.get('SEQUELIZE_DATABASE_DATABASENAME'),
                    autoLoadModels: true,
                    synchronize: true,
                    models: [__dirname + "../domains/**/entities/*.entity.ts"]
                }
            }
        })
    ]
})
export class DatabaseModule {}