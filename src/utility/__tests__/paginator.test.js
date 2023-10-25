import { getNumberOfPagesToContainEntities } from "../paginator";

it('getNumberOfPagesToContainEntities returns one when there is not enough entities for a full page', () => {
    const entities = ['entity1', 'entity2', 'entity3'];
    const entitiesPerPage = 5;
    const result = getNumberOfPagesToContainEntities(entities, entitiesPerPage);
    expect(result).toBe(1);
});

it('getNumberOfPagesToContainEntities returns three when there is enough entities for three full pages', () => {
    const entities = ['entity1', 'entity2', 'entity3', 'entity4', 'entity5', 'entity6', 'entity7'];
    const entitiesPerPage = 3;
    const result = getNumberOfPagesToContainEntities(entities, entitiesPerPage);
    expect(result).toBe(3);
});