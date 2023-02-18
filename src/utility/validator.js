const humanNameRegex = /^\p{L}+.*$/u;
const wordRegex = /^[\p{L}\w]+.*$/u;
const humanNamesRegex = /^\p{L}+.*( *, +\p{L}+.*)*$/u;

export function isHumanName(string) {
    return humanNameRegex.test(string);
}

export function isAWord(string) {
    return wordRegex.test(string);
}

export function isHumanNames(string) {
    return humanNamesRegex.test(string);
}