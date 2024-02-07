import { ApiProperty } from "@nestjs/swagger"

export class CreateUserDto {
  @ApiProperty({
    description: 'Nome do usuário',
    type: String,
  })
  nome: string

  @ApiProperty({
    description: 'Email do usuário',
    type: String,
  })
  email: string

  @ApiProperty({
    description: 'Senha do usuário',
    type: String,
  })
  password: string

  @ApiProperty({
    description: 'CPF do usuário',
    type: String
  })
  cpf: string
}
