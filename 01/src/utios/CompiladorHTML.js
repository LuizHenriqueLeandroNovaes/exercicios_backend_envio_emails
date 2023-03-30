const fs = require('fs/promises');
const { compile } = require('handlebars');

const compiladorHtml = async (arquivo,contexto) => {
    const html = await fs.readFile(arquivo);
    const compilador = compile(html.toString());
    return compilador(contexto);
}


module.exports = compiladorHtml;