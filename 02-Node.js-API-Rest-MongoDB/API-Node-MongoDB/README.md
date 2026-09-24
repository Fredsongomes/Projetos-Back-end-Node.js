<h1 align="center">API Livraria</h1>

<p align="center">
  API REST para gerenciar o acervo de uma livraria, com cadastro de <strong>livros</strong> e <strong>autores</strong>, busca com filtros e paginação.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-18.18%2B-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js">
  <img src="https://img.shields.io/badge/Express-4.x-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express">
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB">
  <img src="https://img.shields.io/badge/licença-ISC-blue?style=for-the-badge" alt="Licença ISC">
</p>

---

## Sobre o projeto

Controlar um acervo de livros em planilhas ou anotações soltas leva a dados duplicados, inconsistentes e difíceis de consultar. A **API Livraria** centraliza essas informações em um banco MongoDB e oferece:

- Cadastro, consulta, atualização e exclusão de **livros** e **autores**
- **Validação dos dados** na criação e na atualização (campos obrigatórios, editoras permitidas, número de páginas entre 10 e 5000)
- **Busca de livros** por editora, título, nome do autor e faixa de páginas
- **Paginação e ordenação** nas listagens
- **Tratamento de erros** padronizado, com respostas em JSON

## Sumário

- [Sobre o projeto](#sobre-o-projeto)
- [Tecnologias](#tecnologias)
- [Instalação e execução](#instalação-e-execução)
  - [Pré-requisitos](#pré-requisitos)
  - [Clonagem do repositório](#clonagem-do-repositório)
  - [Instalação das dependências](#instalação-das-dependências)
  - [Configuração do arquivo .env](#configuração-do-arquivo-env)
  - [Banco de dados](#banco-de-dados)
  - [Execução](#execução)
- [Rotas da API](#rotas-da-api)
  - [Paginação e ordenação](#paginação-e-ordenação)
  - [Busca de livros](#busca-de-livros)
  - [Exemplos de corpo da requisição](#exemplos-de-corpo-da-requisição)
  - [Respostas de erro](#respostas-de-erro)
- [Testes com Postman](#testes-com-postman)
- [Licença e créditos](#licença-e-créditos)

## Tecnologias

| Tecnologia | Uso |
| --- | --- |
| ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white) | Ambiente de execução JavaScript |
| ![Express](https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white) | Framework HTTP e rotas |
| ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white) | Banco de dados NoSQL |
| ![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=flat-square&logo=mongoose&logoColor=white) | Modelagem e validação dos dados |
| ![dotenv](https://img.shields.io/badge/dotenv-ECD53F?style=flat-square&logo=dotenv&logoColor=black) | Variáveis de ambiente |
| ![Nodemon](https://img.shields.io/badge/Nodemon-76D04B?style=flat-square&logo=nodemon&logoColor=white) | Reinício automático em desenvolvimento |
| ![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=flat-square&logo=eslint&logoColor=white) | Padronização do código |
| ![Postman](https://img.shields.io/badge/Postman-FF6C37?style=flat-square&logo=postman&logoColor=white) | Testes das rotas |

## Instalação e execução

### Pré-requisitos

- [Node.js](https://nodejs.org/) **18.18 ou superior**
- **npm** (já vem com o Node.js)
- [Git](https://git-scm.com/)
- Um banco **MongoDB**: um cluster gratuito no [MongoDB Atlas](https://www.mongodb.com/atlas) ou o MongoDB instalado na sua máquina

Confira as versões instaladas:

```bash
node -v
npm -v
```

### Clonagem do repositório

```bash
git clone https://github.com/Fredsongomes/Projetos-Back-end-Node.js.git
cd Projetos-Back-end-Node.js/02-Node.js-API-Rest-MongoDB/API-Node-MongoDB
```

### Instalação das dependências

```bash
npm install
```

### Configuração do arquivo .env

Crie um arquivo `.env` na raiz do projeto com as variáveis abaixo:

```env
# String de conexão com o MongoDB (obrigatória)
STRING_CONEXAO_DB=mongodb+srv://<usuario>:<senha>@<cluster>.mongodb.net/livraria

# Porta do servidor (opcional, padrão: 3000)
PORT=3000
```

Para um MongoDB local, use por exemplo:

```env
STRING_CONEXAO_DB=mongodb://127.0.0.1:27017/livraria
```

> O arquivo `.env` já está no `.gitignore`. Nunca envie suas credenciais para o repositório.

### Banco de dados

Este projeto **não usa migrations**. O MongoDB cria o banco e as coleções (`autores` e `livros`) automaticamente no primeiro cadastro. A estrutura e as validações dos documentos ficam nos schemas do Mongoose, em `src/models`.

Se usar o MongoDB Atlas:

1. Crie um cluster e um usuário do banco de dados.
2. Em **Network Access**, libere o IP da sua máquina.
3. Copie a string de conexão em **Connect → Drivers** e cole no `.env`.

### Execução

Inicie o servidor em modo de desenvolvimento:

```bash
npm run dev
```

Se tudo estiver certo, o terminal vai mostrar:

```text
Servidor escutando em http://localhost:3000
conexão com o banco feita com sucesso
```

Para verificar o padrão do código:

```bash
npx eslint .
```

## Rotas da API

URL base: `http://localhost:3000`

| Método | Rota | Descrição |
| --- | --- | --- |
| `GET` | `/` | Verifica se a API está no ar |
| `GET` | `/livros` | Lista os livros (paginado) |
| `GET` | `/livros/busca` | Busca livros com filtros (paginado) |
| `GET` | `/livros/:id` | Busca um livro pelo id, com o nome do autor |
| `POST` | `/livros` | Cadastra um livro |
| `PUT` | `/livros/:id` | Atualiza um livro |
| `DELETE` | `/livros/:id` | Remove um livro |
| `GET` | `/autores` | Lista os autores (paginado) |
| `GET` | `/autores/:id` | Busca um autor pelo id |
| `POST` | `/autores` | Cadastra um autor |
| `PUT` | `/autores/:id` | Atualiza um autor |
| `DELETE` | `/autores/:id` | Remove um autor |

### Paginação e ordenação

Válido para `GET /livros`, `GET /livros/busca` e `GET /autores`.

| Parâmetro | Padrão | Descrição |
| --- | --- | --- |
| `limite` | `5` | Quantidade de itens por página |
| `pagina` | `1` | Número da página |
| `ordenacao` | `_id:-1` | `campo:ordem`, com `1` para crescente e `-1` para decrescente. Sem ordem, é crescente |

Exemplo: `GET /livros?limite=10&pagina=2&ordenacao=titulo:1`

### Busca de livros

`GET /livros/busca` aceita os filtros abaixo, que podem ser combinados:

| Parâmetro | Descrição |
| --- | --- |
| `editora` | Nome exato da editora |
| `titulo` | Parte do título, sem diferenciar maiúsculas de minúsculas |
| `nomeAutor` | Nome exato do autor |
| `minPaginas` | Número mínimo de páginas |
| `maxPaginas` | Número máximo de páginas |

Exemplo: `GET /livros/busca?editora=Alura&minPaginas=100&maxPaginas=500`

### Exemplos de corpo da requisição

**Autor** (`POST /autores`):

```json
{
  "nome": "Machado de Assis",
  "nacionalidade": "brasileira"
}
```

**Livro** (`POST /livros`):

```json
{
  "titulo": "Node.js na prática",
  "autor": "<id do autor>",
  "editora": "Alura",
  "numeroPaginas": 250
}
```

Regras de validação dos livros:

- `titulo`, `autor` e `editora` são obrigatórios.
- `editora` aceita apenas `Casa do código` ou `Alura`.
- `numeroPaginas` deve estar entre 10 e 5000.
- Nenhum campo de texto pode ser enviado em branco.

### Respostas de erro

Os erros seguem o formato:

```json
{
  "mensagem": "Id do livro não localizado",
  "status": 404
}
```

| Status | Quando acontece |
| --- | --- |
| `400` | Id em formato inválido, falha de validação ou parâmetros de paginação inválidos |
| `404` | Registro ou rota não encontrados |
| `500` | Erro interno do servidor |

## Testes com Postman

A pasta `postman/` tem uma coleção pronta com os testes de todas as rotas.

1. Inicie a API com `npm run dev`.
2. No Postman, clique em **Import** e selecione `postman/livraria.postman_collection.json`.
3. Abra a coleção e clique em **Run collection**.

A coleção cria os próprios dados de teste e os apaga no final. Para testar em outro endereço, altere a variável `baseUrl` da coleção.

Também é possível rodar pelo terminal com o [Newman](https://www.npmjs.com/package/newman):

```bash
npx newman run postman/livraria.postman_collection.json
```

## Licença e créditos

Este projeto está sob a licença **ISC**.

Desenvolvido por **Fredson Gomes** a partir do curso de Node.js com Express e MongoDB da [Alura](https://www.alura.com.br/).
