import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';
import trataErros from './erros/funcoesErro.js';
import { contaPalavras } from './index.js';
import { montaSaidaArquivo } from './helpers.js';
import { Command } from 'commander';
import chalk from 'chalk';

const require = createRequire(import.meta.url);
const { version } = require('../package.json');

const program = new Command();

program
    .version(version)
    .option('-t, --texto <string>', 'caminho do texto a ser processado')
    .option('-d, --destino <string>', 'caminho da pasta onde salvar o arquivo de resultados')
    .action(async (options) => {
        const { texto, destino } = options;

        if (!texto || !destino) {
            console.error(chalk.red('erro: favor inserir caminho de origem e destino'));
            program.help({ error: true });
            return;
        }

        const caminhoTexto = path.resolve(texto);
        const caminhoDestino = path.resolve(destino);

        try {
            await processaArquivo(caminhoTexto, caminhoDestino);
            console.log(chalk.green('texto processado com sucesso'));
        } catch (erro) {
            console.error(chalk.red('ocorreu um erro no processamento:'), trataErros(erro));
            process.exitCode = 1;
        }
    });

await program.parseAsync();

async function processaArquivo(caminhoTexto, caminhoDestino) {
    const texto = await fs.promises.readFile(caminhoTexto, 'utf-8');
    const resultado = contaPalavras(texto);
    await criaESalvaArquivo(resultado, caminhoDestino);
}

async function criaESalvaArquivo(listaPalavras, endereco) {
    await fs.promises.mkdir(endereco, { recursive: true });
    const arquivoNovo = path.join(endereco, 'resultado.txt');
    const textoPalavras = montaSaidaArquivo(listaPalavras);
    await fs.promises.writeFile(arquivoNovo, textoPalavras);
    console.log('arquivo criado');
}
