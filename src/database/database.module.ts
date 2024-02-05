import { SequelizeModule } from '@nestjs/sequelize';

export const DatabaseModule = SequelizeModule.forRoot({
    dialect: 'postgres',
    host: process.env.SEQUELIZE_DATABASE_HOST,
    port: +process.env.SEQUELIZE_DATABASE_PORT,
    username: 'postgres',
    password: 'docker',
    database: 'ancarquizzes',
    autoLoadModels: true,
    synchronize: true,
    models: [__dirname + "../domains/**/entities/*.entity.ts"]
})