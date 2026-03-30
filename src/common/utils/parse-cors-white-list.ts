export function parseCorsWhiteList(raw: string) {
    return raw.split(/\s+/g)
        .map(url => url.replace(/\/+$/, ''))
        .filter(Boolean);
}