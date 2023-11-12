import { isAHumanName, isAWord, isHumanNames } from '../validator';

it('isAHumanName returns true for a human name', () => {
    const result = isAHumanName("Lev Orlov");
    expect(result).toBeTruthy();
});

it('isAHumanName returns true for a human name with non-alphabetic characters', () => {
    const result = isAHumanName("Mary-Jane Smith");
    expect(result).toBeTruthy();
});

it('isAHumanName returns false for a blank string', () => {
    const result = isAHumanName("");
    expect(result).toBeFalsy();
});

it('isAHumanName returns false for a string containing only non-alphabetic characters', () => {
    const result = isAHumanName("!@#$%^&*");
    expect(result).toBeFalsy();
});

it('isAHumanName returns false for a human name that starts with non-alphabetic characters', () => {
    const result = isAHumanName("123 John");
    expect(result).toBeFalsy();
});

it('isAHumanName returns false for a non-human name', () => {
    const result = isAHumanName("|xX_GigaKiller_xX|");
    expect(result).toBeFalsy();
});


it('isAWord returns true for a word', () => {
    const result = isAWord("Some Book");
    expect(result).toBeTruthy();
});

it('isAWord returns true for a word the ends with non-alphabetic characters', () => {
    const result = isAWord("Some Book 1984");
    expect(result).toBeTruthy();
});

it('isAWord returns true for a word starting with non-alphabetic characters', () => {
    const result = isAWord("123 Some Book");
    expect(result).toBeTruthy();
});

it('isAWord returns true for a number', () => {
    const result = isAWord("1984");
    expect(result).toBeTruthy();
});

it('isAWord returns false for a blank string', () => {
    const result = isAWord("");
    expect(result).toBeFalsy();
});

it('isAWord returns false for a non-word', () => {
    const result = isAWord("'%$%^'");
    expect(result).toBeFalsy();
});

it('isHumanNames returns true for a single name', () => {
    const result = isHumanNames("John Tolkien");
    expect(result).toBeTruthy();
});

it('isHumanNames returns true for a two names', () => {
    const result = isHumanNames("Leo Tolstoy, George Orwell");
    expect(result).toBeTruthy();
});

it('isHumanNames returns false for a blank string', () => {
    const result = isHumanNames("");
    expect(result).toBeFalsy();
});

it('isHumanNames returns false for two non-names', () => {
    const result = isHumanNames("&^%*&$, &*^^%");
    expect(result).toBeFalsy();
});