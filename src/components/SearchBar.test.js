import { incrementRecipesList } from './SearchBar';

test('incrementRecipesList with prevState={from: 0, to: 10} should return new state {from: 10, to: 20}', () =>
  expect(incrementRecipesList({ from: 0, to: 10 })).toEqual({
    from: 10,
    to: 20,
  }));
