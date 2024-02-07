declare global {
    namespace NodeJS {
      interface ProcessEnv {
        SEQUELIZE_DATABASE_DIALECT: string
        SEQUELIZE_DATABASE_HOST: string
        SEQUELIZE_DATABASE_PORT: string
        SEQUELIZE_DATABASE_USERNAME: string
        SEQUELIZE_DATABASE_PASSWORD: string
        SEQUELIZE_DATABASE_DATABASENAME: string
      }
    }
  }