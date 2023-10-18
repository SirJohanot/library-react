import { isAWord, isHumanName } from '../validator';

it('isHumanName returns true for a human name', () => {
    const result = isHumanName("Lev Orlov");
    expect(result).toBeTruthy();
});

it('isHumanName returns false for a blank string', () => {
    const result = isHumanName("");
    expect(result).toBeFalsy();
});

it('isHumanName returns false for a non-human name', () => {
    const result = isHumanName("|xX_GigaKiller_xX|");
    expect(result).toBeFalsy();
});

it('isAWord returns true for a word', () => {
    const result = isAWord("Some Book");
    expect(result).toBeTruthy();
});
