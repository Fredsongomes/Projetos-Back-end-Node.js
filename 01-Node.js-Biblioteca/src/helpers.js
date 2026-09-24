function filtraOcorrencias(palavras) {
    return Object.keys(palavras).filter(chave => palavras[chave] > 1);
}

function montaSaidaArquivo(listaParagrafos) {
    let textoFinal = '';
    listaParagrafos.forEach(({ numero, palavras }) => {
        const duplicadas = filtraOcorrencias(palavras);
        if (duplicadas.length === 0) return;
        textoFinal += `palavras duplicadas no parágrafo ${numero}: ${duplicadas.join(', ')}\n`;
    });

    return textoFinal;
}

export { montaSaidaArquivo };
