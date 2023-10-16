import { isHumanName } from '../validator';

it('isHumanName returns true for a human name', () => {
    const result = isHumanName("Lev Orlov");
    expect(result).toBeTruthy();
});

it('isHumanName returns false for a blank string', () => {
    const result = isHumanName("");
    expect(result).toBeFalsy();
});
