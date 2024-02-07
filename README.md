## Como inicializar a aplicação
### Instalação das dependências necessárias

```bash
$ npm install
```

### Variaveis de ambiente
Será necessário fornecer as variáveis de ambiente para que a aplicação funcione corretamente. Você pode seguir o exemplo do arquivo .env-example.

```env
SEQUELIZE_DATABASE_HOST=
SEQUELIZE_DATABASE_PORT=
SEQUELIZE_DATABASE_USERNAME=
SEQUELIZE_DATABASE_PASSWORD=
SEQUELIZE_DATABASE_DATABASENAME=
```

### Executando API

```bash
# desenvolvimento
$ npm run start

# watch mode
$ npm run start:dev

# modo de produção
$ npm run start:prod
```


### ℹ️ Mudanças no modelo

- Os relacionamentos foram modificados para aderir ao padrão [entity]_id...
- No modelo ER, o campo "Data" é representado pela propriedade "createdAt" na entidade.

### Desenvolvedor

- Autor - [Nicholas Macedo](https://www.linkedin.com/in/nicholasmacedoo/)

