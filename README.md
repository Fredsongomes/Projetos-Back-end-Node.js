# 🟢 Projetos Back-End Node.js

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
  <img src="https://img.shields.io/badge/ES_Modules-000000?style=for-the-badge&logo=javascript&logoColor=white" alt="ES Modules" />
  <br />
  <img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express" />
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white" alt="Mongoose" />
  <br />
  <img src="https://img.shields.io/badge/Commander-000000?style=for-the-badge&logo=gnubash&logoColor=white" alt="Commander" />
  <img src="https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white" alt="ESLint" />
  <img src="https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white" alt="Postman" />
</p>

**Projetos práticos dos meus estudos de back-end com Node.js**: da leitura de arquivos pela linha de comando até uma API REST com Express e MongoDB.

Cada projeto fica em sua própria pasta, com `package.json` e README próprios. Este README é o ponto de entrada: mostra o que cada um faz e como rodá-los.

---

## 📦 Projetos

| # | Projeto | O que faz | Principais tecnologias |
| --- | --- | --- | --- |
| 01 | [Biblioteca (CLI)](01-Node.js-Biblioteca/) | Lê um texto e lista as palavras duplicadas em cada parágrafo, gerando um `resultado.txt` | Node.js (`fs`, `path`), Commander, Chalk |
| 02 | [API Livraria](02-Node.js-API-Rest-MongoDB/API-Node-MongoDB/) | API REST de livros e autores, com validação, busca com filtros e paginação | Express, MongoDB, Mongoose, dotenv |

### 01 · Biblioteca (CLI)

- Recebe o texto (`-t`) e a pasta de destino (`-d`) pelo terminal
- Divide o texto em parágrafos, remove a pontuação (com suporte a Unicode) e ignora palavras com menos de 3 letras
- Cria a pasta de destino se ela não existir e salva só os parágrafos com palavras repetidas
- Erros como arquivo inexistente viram mensagens amigáveis, com código de saída diferente de zero

➡️ [README do projeto](01-Node.js-Biblioteca/README.md)

### 02 · API Livraria

- CRUD completo de **livros** e **autores**
- **Busca de livros** por editora, título, nome do autor e faixa de páginas
- **Paginação e ordenação** em todas as listagens (`?limite=10&pagina=2&ordenacao=titulo:1`)
- **Erros padronizados** em JSON (`400`, `404`, `500`)
- Coleção do **Postman** pronta para testar todas as rotas

➡️ [README do projeto](02-Node.js-API-Rest-MongoDB/API-Node-MongoDB/README.md)

---

## 🧠 Destaques técnicos

Algumas decisões que valem a leitura do código:

- **ES Modules nos dois projetos.** `import`/`export` nativos e `top-level await` na CLI (`await program.parseAsync()`). A versão da CLI é lida do próprio `package.json`, então `--version` nunca fica desatualizado.
- **Contagem de palavras com funções pequenas e puras** (`01-Node.js-Biblioteca/src/index.js`). A limpeza usa a regex Unicode `\p{L}\p{N}`, então acentos (`informação`, `você`) não são tratados como pontuação.
- **Hierarquia de erros na API.** `ErroBase` sabe se enviar como resposta (`enviarResposta(res)`), e `RequisicaoIncorreta`, `ErroValidacao` e `NaoEncontrado` estendem essa classe. Os controllers só chamam `next(erro)`, e um middleware central traduz também os erros do Mongoose (`CastError`, `ValidationError`) e JSON malformado.
- **Paginação como middleware reaproveitável.** O controller monta a consulta (`req.resultado = livros.find()`) sem executá-la, e o middleware `paginar` aplica `sort`, `skip` e `limit` e valida os parâmetros. Livros, busca e autores usam o mesmo código.
- **Validador global do Mongoose.** Uma única regra em `validadorGlobal.js` impede que qualquer campo de texto seja salvo em branco, sem repetir a validação em cada schema.
- **Credenciais fora do código.** A string de conexão do MongoDB vem do `.env`, que está no `.gitignore`.

---

## 🛠️ Stack

| 01 · Biblioteca (CLI) | 02 · API Livraria |
| --- | --- |
| Node.js 22.12+ | Node.js 18.18+ |
| Módulos nativos `fs` e `path` | Express 4 |
| Commander | MongoDB + Mongoose 6 |
| Chalk | dotenv |
| | Nodemon |
| | ESLint 9 |
| | Postman / Newman |

---

## 🚀 Como rodar localmente

Pré-requisitos: **Node.js 22.12+** (a versão mínima da CLI; a API roda a partir da 18.18) e **Git**. Para a API, também um banco **MongoDB** (local ou no [MongoDB Atlas](https://www.mongodb.com/atlas)).

```bash
git clone https://github.com/Fredsongomes/Projetos-Back-end-Node.js.git
cd Projetos-Back-end-Node.js
```

### 01 · Biblioteca (CLI)

```bash
cd 01-Node.js-Biblioteca
npm install
node src/cli.js -t arquivos/texto-web.txt -d resultado
```

O resultado fica em `resultado/resultado.txt`.

### 02 · API Livraria

```bash
cd 02-Node.js-API-Rest-MongoDB/API-Node-MongoDB
npm install
# crie o .env com STRING_CONEXAO_DB (veja o README do projeto)
npm run dev
```

A API sobe em `http://localhost:3000`. As rotas, os parâmetros de busca e os exemplos de requisição estão no [README da API](02-Node.js-API-Rest-MongoDB/API-Node-MongoDB/README.md).

### Scripts

| Projeto | Comando | O que faz |
| --- | --- | --- |
| Biblioteca | `npm run cli -- -t <texto> -d <pasta>` | Executa a CLI |
| API Livraria | `npm run dev` | Servidor com reinício automático (Nodemon) |
| API Livraria | `npx eslint .` | Verifica o padrão do código |
| API Livraria | `npx newman run postman/livraria.postman_collection.json` | Roda a coleção do Postman pelo terminal |

---

## 🧱 Estrutura

```
Projetos-Back-end-Node.js/
├── 01-Node.js-Biblioteca/          # CLI de palavras duplicadas (README próprio)
│   ├── arquivos/                   # textos de entrada
│   ├── resultado/                  # resultado.txt gerado pela CLI
│   └── src/                        # cli.js, contagem, helpers e erros
└── 02-Node.js-API-Rest-MongoDB/
    └── API-Node-MongoDB/           # API Livraria (README próprio)
        ├── postman/                # coleção com os testes das rotas
        ├── server.js               # ponto de entrada
        └── src/
            ├── config/             # conexão com o MongoDB
            ├── controllers/        # regras de cada rota
            ├── erros/              # classes de erro da API
            ├── middlewares/        # 404, tratamento de erros e paginação
            ├── models/             # schemas do Mongoose
            └── routes/             # definição das rotas
```

**Convenções**

- Uma pasta por projeto, numerada na ordem em que foi feito (`01-`, `02-`...).
- Cada projeto é independente: `npm install` é feito dentro da pasta dele, não na raiz.
- Código, mensagens e commits em português.

---

## 🧪 Testes

- **API Livraria:** a coleção do Postman em `postman/` testa todas as rotas, cria os próprios dados e os apaga no final. Pode ser rodada no Postman (**Run collection**) ou no terminal com o Newman.
- **Biblioteca:** os textos em `arquivos/` servem como entrada de exemplo; a saída esperada de `texto-web.txt` está no README do projeto.

---

## 📈 Próximos passos

- [ ] Testes automatizados (Jest) para a contagem de palavras e para os controllers da API
- [ ] GitHub Actions rodando lint e testes a cada push
- [ ] Autenticação com JWT na API
- [ ] Documentação da API com Swagger / OpenAPI
- [ ] `docker compose` para subir a API junto com o MongoDB

---

## 📚 Contexto

Os projetos nasceram durante a formação de Node.js da [Alura](https://www.alura.com.br/). Depois dos cursos, revisei o código: suporte a Unicode na limpeza das palavras, criação automática da pasta de destino, tratamento de JSON malformado e de parâmetros de paginação inválidos, ESLint, coleção do Postman e a documentação de cada projeto.

---

## 👤 Autor

**Fredson Gomes**

[LinkedIn](https://www.linkedin.com/in/fredson--gomes) · [GitHub](https://github.com/Fredsongomes)
