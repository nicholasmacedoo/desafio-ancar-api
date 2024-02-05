import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const config = new DocumentBuilder()
    .setTitle('Api - Enquetes simplificadas')
    .setDescription(
      'Este desefio tem como objetivo implementar um projeto de elaboração de enquetes simplificadas, onde um usuário pode criar sua enquete e associar perguntas e respostas a elas',
    )
    .setVersion('1.0')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('docs', app, document)

  await app.listen(3333)
}
bootstrap()
