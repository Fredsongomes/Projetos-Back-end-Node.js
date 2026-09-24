# 01 - Node.js Biblioteca

CLI em Node.js que lê um arquivo de texto e identifica as **palavras duplicadas em cada parágrafo**, salvando o resultado em um arquivo `resultado.txt`.

## Sobre o projeto

O programa recebe pelo terminal o caminho de um texto e o caminho de uma pasta de destino. Em seguida ele:

1. Lê o arquivo de texto;
2. Divide o conteúdo em parágrafos (quebras de linha), ignorando linhas vazias;
3. Remove pontuação das palavras e desconsidera palavras com menos de 3 letras;
4. Conta quantas vezes cada palavra aparece em cada parágrafo;
5. Gera o arquivo `resultado.txt` na pasta de destino, listando as palavras repetidas de cada parágrafo.

Exemplo de saída:

```
palavras duplicadas no parágrafo 3: uma
palavras duplicadas no parágrafo 7: dispositivos, web, seu, conectado
palavras duplicadas no parágrafo 8: cliente, uma, para
```

Erros como arquivo ou pasta inexistente são tratados e exibidos com uma mensagem amigável.

## Tecnologias utilizadas

- [Node.js](https://nodejs.org/) (ES Modules, módulos `fs` e `path`)
- [Commander](https://www.npmjs.com/package/commander): leitura dos argumentos da linha de comando
- [Chalk](https://www.npmjs.com/package/chalk): cores nas mensagens do terminal

## Estrutura

```
├── arquivos/               # textos de entrada
├── resultado/              # arquivo resultado.txt gerado
└── src/
    ├── cli.js              # interface de linha de comando
    ├── index.js            # contagem de palavras por parágrafo
    ├── helpers.js          # montagem do texto de saída
    └── erros/
        └── funcoesErro.js  # tratamento de erros
```

## Como executar

Instale as dependências:

```bash
npm install
```

Execute informando o texto (`-t`) e a pasta de destino (`-d`):

```bash
node src/cli.js -t arquivos/texto-web.txt -d resultado
```

Para ver as opções disponíveis:

```bash
node src/cli.js --help
```
