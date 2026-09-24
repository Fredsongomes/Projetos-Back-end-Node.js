export function contaPalavras(texto) {
    const paragrafos = extraiParagrafos(texto);
    const contagem = paragrafos.flatMap((paragrafo, indice) => {
        if (!paragrafo.trim()) return [];
        return {
            numero: indice + 1,
            palavras: verificaPalavrasDuplicadas(paragrafo)
        };
    });
    return contagem;
}

function extraiParagrafos(texto) {
    return texto.toLowerCase().split(/\r?\n/);
}

function limpaPalavras(palavra) {
    return palavra
        .replace(/[^\p{L}\p{N}'’-]/gu, '')
        .replace(/^['’-]+|['’-]+$/g, '');
}

function verificaPalavrasDuplicadas(texto) {
    const listaPalavras = texto.split(/\s+/);
    const resultado = {};
    listaPalavras.forEach(palavra => {
        const palavraLimpa = limpaPalavras(palavra);
        if (palavraLimpa.length >= 3) {
            resultado[palavraLimpa] = (resultado[palavraLimpa] || 0) + 1;
        }
    });
    return resultado;
}
