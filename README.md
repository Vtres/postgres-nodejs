# API com PostgreSQL

## 1. Tecnologias Utilizadas
- ### NodeJs
<img alt="Logo" align="right" width="20%" src="/src/img/node.png"  >

**NodeJs** é um software de código aberto, multiplataforma, baseado no interpretador V8 do Google e que permite a execução de códigos JavaScript fora de um navegador web.
Visite: *[NodeJS](https://https://nodejs.org/en/)*.

---
- ### Yarn
<img alt="Logo" align="right" width="20%"  src="/src/img/yarn.png" width="150"> 

O **Yarn** é um gerenciador de pacotes para aplicar comandos prontos ao código de uma aplicação. 
O que reforça essa ideia é o fato de a ferramenta utilizar também os bancos de dados tanto do NPM quanto do Bower, outro importante e conhecido gerenciador de pacotes de códigos. Visite: *[Yarn](https://yarnpkg.com/)*.

---
- ### Nodemon
<img alt="Logo" align="right" width="19%" src="/src/img/nodemon.png" width="150">

O **nodemon** é um utilitário de interface de linha de comando (CLI) desenvolvido pelo @rem que encapsula seu aplicativo Node, monitora o sistema de arquivos e reinicia o processo automaticamente.

---

- ### Express
<img alt="Logo" align="right" width="30%"  src="/src/img/express.png" width="150"> 

O **ExpressJs** é um framework para Node.js que fornece recursos mínimos para construção de servidores web. Foi lançado como software livre e de código aberto sob a Licença MIT. É um dos mais populares frameworks para servidores em Node.js.
Visite: *[Express](https://expressjs.com/pt-br/)*.

---

- ### Insomnia
<img alt="Logo" align="right" width="20%" src="/src/img/insomnia.jpg" width="150"> 

**Insomnia** é um cliente REST API poderoso com gerenciamento de cookies, variáveis ​​de ambiente, geração de código e autenticação para Mac, Window e Linux.
Visite: *[Insomnia](https://insomnia.rest/download)*.

---
- ### Postgres
<img alt="Logo" align="right" width="19%" src="/src/img/postgresql.png" width="150">

**PostgreSQL** Sistema gerenciador de banco de dados objeto relacional, desenvolvido como projeto de código aberto.
Visite: *[PosgreSQL](https://www.postgresql.org/)*.

---
- ### GitHub
<img alt="Logo" align="right" width="20%" src="/src/img/git.png" width="150"> 

**GitHub** Plataforma de hospedagem de código-fonte e arquivos com controle de versão usando o Git. Ele permite que programadores, utilitários ou qualquer usuário cadastrado na plataforma contribuam em projetos privados e/ou Open Source de qualquer lugar do mundo.
Visite: *[GitHub](https://github.com/)*.

## 2. Comandos Terminal
Instale o Yarn
- **`npm install --global yarn`**

Para criar a estrutura dessa API. 
- **`yarn init -y`**
- **`yarn add nodemon -D`**
- **`yarn add express`**
- **`yarn add pg`**
- **`yarn add dotenv`**
- **`yarn add cors`**
- **`yarn add bcryptjs`**

## 3. Requests API
**`GET`** - Listagem de usuários
**`POST`** - Cria usuário
**`DEL`** - Deleta usuário por ID
**`PUT`** - Atualiza dados dos usuários