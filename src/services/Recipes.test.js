import mockAxios from 'jest-mock-axios';
import { API_KEY, API_ID } from './ApiUtils';
import { getRecipe } from './RecipesApi';

afterEach(() => {
  mockAxios.reset();
});

it('getRecipe should get recipe datas from server with key word Lemon', () => {
  let catchFn = jest.fn(),
    thenFn = jest.fn();

  getRecipe()
    .then(thenFn)
    .catch(catchFn);

  expect(mockAxios.get).toHaveBeenCalledWith(
    `https://api.edamam.com/search?app_id=${API_ID}&app_key=${API_KEY}&q='lemon'`
  );

  let responseObj = { data: {} };
  mockAxios.mockResponse(responseObj);

  expect(catchFn).not.toHaveBeenCalled();
});
