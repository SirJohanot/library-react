const humanNameRegex = /^\p{L}+.*$/u;

export function isHumanName(string) {
    return humanNameRegex.test(string);
}