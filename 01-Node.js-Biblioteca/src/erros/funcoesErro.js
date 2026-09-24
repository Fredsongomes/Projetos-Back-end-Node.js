export default function trataErros(erro) {
    if (erro.code === 'ENOENT') {
        return `Arquivo ou pasta não encontrado: ${erro.path}`;
    } else if (erro.code === 'EISDIR') {
        return 'O caminho informado é uma pasta, não um arquivo';
    } else {
        return `Erro na aplicação: ${erro.message}`;
    }
}
