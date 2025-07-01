# 📦 Sistema de Controle de Estoque

Sistema completo de controle de estoque com autenticação via JWT, gestão de produtos, usuários, categorias e marcas. Desenvolvido em **Node.js + TypeScript** com banco de dados **PostgreSQL**.

---

## 🧱 Estrutura do Projeto

```
register-products-ts-node/
├── src/
│   ├── controller/         # Lógica de negócio (ex: AuthController, ProductController)
│   ├── dto/                # Data Transfer Objects
│   ├── enums/              # Enums como CategoryEnum
│   ├── middleware/         # Middlewares como verificação de token JWT
│   ├── model/              # Models do Sequelize (User, Product, Brand)
│   ├── routes/             # Rotas agrupadas (ex: main-routes.ts)
│   ├── db/                 # Configuração do Sequelize
│   ├── app.ts              # Instância do Express + middlewares globais
│   └── server.ts           # Inicialização do servidor
├── dist/                   # Arquivos compilados
├── __tests__/              # Testes unitários (alternativo a src/)
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🛠 Tecnologias Utilizadas

- **Node.js** com **Express**
- **TypeScript**
- **Sequelize** com **sequelize-typescript**
- **PostgreSQL**
- **JWT** (JSON Web Token)
- **Jest** para testes
- **Docker** (opcional)
- **ESModules** (type: "module")

---

## 🧪 Executando o Projeto

1. **Instale as dependências**

```bash
npm install
```

2. **Configure o banco de dados**

Crie um banco chamado `products` no PostgreSQL e defina sua conexão em `src/db/sequelize.ts`.

3. **Configure o `.env`**

Crie um arquivo `.env` com:

```
JWT_SECRET=meusegredo123
```

4. **Compile o projeto**

```bash
npm run build
```

5. **Execute**

```bash
npm start
```

6. **Rode os testes**

```bash
npm test
```

---

## 🔐 Autenticação JWT

- Rota de login: `POST /auth/login`
- Rota de registro: `POST /auth/register`
- Token deve ser enviado no header `Authorization: Bearer <token>`
- Middleware `verifyToken` garante acesso por `role`

---

## 📘 Endpoints Principais

| Método | Rota               | Descrição                      | Protegido? |
|--------|--------------------|-------------------------------|------------|
| POST   | /auth/register     | Criação de usuário            | ❌         |
| POST   | /auth/login        | Autenticação e JWT            | ❌         |
| PUT    | /product           | Atualiza produto              | ✅ admin   |
| DELETE | /product           | Remove produto                | ✅ admin   |

---

## 🔄 Fluxo de Processos

1. Usuário realiza **registro**
2. Realiza **login** e recebe token JWT
3. Com token, acessa rotas protegidas
4. Admin pode **editar** e **remover produtos**
5. Produtos possuem **marca**, **categoria**, **capacidade**, etc.

---

## 📐 Diagrama de Classes

```
+------------------+
|      User        |
+------------------+
| id: number       |
| name: string     |
| email: string    |
| password: string |
| role: 'admin'    |
+------------------+

+------------------+
|     Product      |
+------------------+
| id: number       |
| brand: string    |
| model: string    |
| capacity: number |
| price: number    |
| category: string |
| brandId: number  |
+------------------+
        ▲
        │
+------------------+
|      Brand       |
+------------------+
| id: number       |
| name: string     |
+------------------+
```

---

## 🧪 Testes Automatizados

- Local: `src/controller/*.spec.ts`
- Rodados com Jest
- Cobrem:
    - Login inválido/válido
    - Registro duplicado
    - Atualização e exclusão de produto

---

## 📋 Observações

- Projeto utiliza ESModules — não use `require`
- JWT é assinado com segredo definido via `.env`
- Sequelize com `sequelize-typescript` e decorators
