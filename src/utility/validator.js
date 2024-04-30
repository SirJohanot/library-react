const humanNameRegex = /^\p{L}+.*$/u;
const wordRegex = /^[\p{L}\w]+.*$/u;
const humanNamesRegex = /^\p{L}+.*( *, +\p{L}+.*)*$/u;
const isbnRegex = /^([0-9]{10}|[0-9]{13})$/

export function isAHumanName(string) {
    return humanNameRegex.test(string);
}

export function isAWord(string) {
    return wordRegex.test(string);
}

export function isHumanNames(string) {
    return humanNamesRegex.test(string);
}

export function isValidIsbn(string) {
    return isbnRegex.test(string);
}