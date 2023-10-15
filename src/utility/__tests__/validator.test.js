import { isHumanName } from '../validator';

it('isHumanName returns true for a human name', () => {
    const result = isHumanName("Lev Orlov");
    expect(result).toBeTruthy();
});
