# wishlist-magalu

![CI](https://github.com/samuelpadua/wishlist-magalu/workflows/CI/badge.svg)

### Api

Para iniciar o projeto

Dependências

```sh
cd api
npm install
```

Banco de dados sqlite
```sh
npx sequelize-cli db:migrate
```

Start do projeto

```sh
npm run dev

# Build do projeto para produção

npm run build
npm start
```

O serviço estará disponível em http://localhost:9000

#### Documentação da API

https://documenter.getpostman.com/view/100570/TVKA5zN3


### UI

Para iniciar o front

Dependências

```sh
cd ui
npm install
```

Start do projeto

```sh
npm run dev

# Build do projeto para produção

npm run build
npm start
```

O serviço está disponível em http://localhost:3000

### Detalhes de implementação

Na api utilizei @hapi para subir o serviço da api.

Para armazenar os dados utilizei um sqlite devido a praticidade de implementação, e para abstrair e permitir que altere o banco posteriormente utilizei o sequelize para migrations e queries.

No ambiente de teste, construí testes integrados e para a integração que foi necessário fazer com a api de produtos utilizei o nock para interceptar as requisições.

Para o ui utilizei React com nextJS, react-redux para o gerenciamento de estado, hooks e context para controlar as manipulações necessárias no projeto.

No ui devido ao tempo não consegui fazer uma cobertura de teste dentro de /pages validando as iterações do usuário.

