# 📋 Task Manager API

## 📖 Sobre o Projeto

O Task Manager é uma API REST desenvolvida para gerenciamento de tarefas, permitindo que usuários criem contas, realizem autenticação e gerenciem suas próprias tarefas de forma segura.

O projeto foi desenvolvido com foco no aprendizado e aplicação de conceitos fundamentais do desenvolvimento backend, incluindo autenticação, autorização, organização de código, banco de dados relacionais e testes automatizados.

---

## 🚀 Tecnologias Utilizadas

* Node.js
* Express.js
* PostgreSQL
* Sequelize ORM
* JWT (JSON Web Token)
* Bcrypt
* Jest (Testes)
* Dotenv

---

## 🏗️ Arquitetura do Projeto

O projeto segue uma arquitetura simples e organizada para facilitar a manutenção e escalabilidade:

```bash
src/
├── config/
├── controllers/
├── middlewares/
├── models/
└── routes/
```

### Estrutura

* **Config:** Configurações da aplicação e banco de dados.
* **Models:** Representação das tabelas do banco utilizando Sequelize.
* **Controllers:** Responsáveis pelas regras de negócio.
* **Middlewares:** Validações e autenticação com JWT.
* **Routes:** Definição das rotas da API.

---

## 🔐 Sistema de Autenticação

Para utilizar a aplicação, o usuário deve criar uma conta informando:

* Nome
* E-mail
* Senha

Após o cadastro, cada usuário possui:

### ID

Identificador único utilizado pelos administradores para verificações e gerenciamento.

### Token JWT

O token é gerado automaticamente e funciona como a identidade do usuário dentro da aplicação.

Sem um token válido, o usuário não possui autorização para acessar recursos protegidos da API.

---

## 🗄️ Banco de Dados

O banco de dados foi modelado utilizando Sequelize ORM.

Foram criadas duas tabelas principais:

### Usuários

Responsável por armazenar:

* Nome
* E-mail
* Senha criptografada
* ID do usuário

### Tarefas

Responsável por armazenar as tarefas criadas pelos usuários.

Cada tarefa está vinculada a um usuário específico.

---

## 🧪 Testes

O projeto possui uma primeira implementação de testes automatizados.

O objetivo foi compreender o funcionamento dos testes dentro de aplicações Node.js e iniciar a aplicação de boas práticas de validação de código.

---

# ⚠️ IMPORTANTE - COMO UTILIZAR A API

Para utilizar a API é necessário possuir uma ferramenta para realizar requisições HTTP, como:

* Postman
* Insomnia

A aplicação possui três grupos principais de rotas:

### Usuários

```http
/usuario
```

Responsável por:

* Cadastro
* Login
* Operações relacionadas aos usuários

### Administradores

```http
/admin
```

Responsável por funcionalidades administrativas e verificações através do ID dos usuários.

### Tarefas

```http
/usuario/tarefas
```

Responsável por:

* Criar tarefas
* Listar tarefas
* Atualizar tarefas
* Excluir tarefas

---

## ▶️ Instalação

Clone o repositório:

```bash
git clone https://github.com/JoaoPedroPavanelo11/TASK-MANAGER.git
```

Instale as dependências:

```bash
npm install
```

Configure o arquivo `.env`:

```env
PORT=3000

DB_HOST=
DB_PORT=
DB_NAME=
DB_USER=
DB_PASSWORD=

JWT_SECRET=
```

Execute o projeto:

```bash
npm run dev
```

---

## 🎯 Objetivos de Aprendizado

Este projeto foi desenvolvido para praticar:

* Desenvolvimento de APIs REST
* Autenticação com JWT
* Criptografia de senhas com Bcrypt
* Modelagem de banco de dados
* Sequelize ORM
* PostgreSQL
* Testes automatizados
* Organização de código backend
* CRUD completo

---

## 👨‍💻 Autor

João Pedro Pavanelo

GitHub:
https://github.com/JoaoPedroPavanelo11
