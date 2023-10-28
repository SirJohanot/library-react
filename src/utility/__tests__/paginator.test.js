import { getClosestAcceptableTargetPage, getNumberOfPagesToContainEntities } from "../paginator";

it('getNumberOfPagesToContainEntities returns one when there are not enough entities for a full page', () => {
    const entities = ['entity1', 'entity2', 'entity3'];
    const entitiesPerPage = 5;
    const result = getNumberOfPagesToContainEntities(entities, entitiesPerPage);
    expect(result).toBe(1);
});

it('getNumberOfPagesToContainEntities returns three when there are enough entities for three full pages', () => {
    const entities = ['entity1', 'entity2', 'entity3', 'entity4', 'entity5', 'entity6', 'entity7'];
    const entitiesPerPage = 3;
    const result = getNumberOfPagesToContainEntities(entities, entitiesPerPage);
    expect(result).toBe(3);
});

it('getNumberOfPagesToContainEntities returns two when there are exactly enough entities for two full pages', () => {
    const entities = ['entity1', 'entity2', 'entity3', 'entity4'];
    const entitiesPerPage = 2;
    const result = getNumberOfPagesToContainEntities(entities, entitiesPerPage);
    expect(result).toBe(2);
});

it('getNumberOfPagesToContainEntities returns zero when there are no entities', () => {
    const entities = [];
    const entitiesPerPage = 10;
    const result = getNumberOfPagesToContainEntities(entities, entitiesPerPage);
    expect(result).toBe(0);
});

it('getClosestAcceptableTargetPage returns targetPage when the targetPage is in the acceptable range', () => {
    const entitiesList = ['entity1', 'entity2', 'entity3', 'entity4', 'entity5'];
    const targetPage = 2;
    const entitiesPerPage = 2;
    const result = getClosestAcceptableTargetPage(entitiesList, targetPage, entitiesPerPage);
    expect(result).toBe(targetPage);
});