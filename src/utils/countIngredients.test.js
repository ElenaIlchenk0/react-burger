import { countIngredients } from './countIngredients';

const fixtures = ['apple', 'banana', 'orange', 'apple', 'apple'];

describe('countIngredients', () => {
    it('should return object with ingredient as key and its quantity as value', () => {
        const result = countIngredients(fixtures);
        expect(result).toEqual({ 'apple': 3, 'banana': 1, 'orange': 1});
    });
});
