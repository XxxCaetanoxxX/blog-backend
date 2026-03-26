export function slugiy(text: string) {
    return text
        .normalize('NFKC') //separa acentos de letras
        .toLocaleLowerCase()
        .replace(/[\u0300-\u036f]/g, '') // remove acentos
        .replace(/[^a-z0-9]+/g, ' ') // troca tudo que nao for letra ou numero por espaco
        .trim()
        .replace(/\s+/g, '-'); // espaço hifen
}