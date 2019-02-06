import axios from 'axios';
import { API_KEY, API_ID } from './ApiUtils';

const BASE_URL = 'https://api.edamam.com/';
const BASE_FOR_SEARCH = `${BASE_URL}search?app_id=${API_ID}&app_key=${API_KEY}`;

export const getRecipe = () => axios.get(`${BASE_FOR_SEARCH}&q='lemon'`);

async function getRecipesList() {
  const {
    data: { hits },
  } = await getRecipe();
  return hits;
}

const getRecipesByKeywords = (keywords, from, to) =>
  axios.get(`${BASE_FOR_SEARCH}&q=${keywords}&from=${from}&to=${to}`);

async function getRecipesDatasByKeyword(keywords, from, to) {
  const {
    data: { hits },
  } = await getRecipesByKeywords(keywords, from, to);
  return hits;
}

const getRecipeByUri = recipeUri =>
  axios.get(
    `${BASE_FOR_SEARCH}&r=${encodeURIComponent(
      `http://www.edamam.com/ontologies/edamam.owl#${recipeUri}`
    )}`
  );

async function getRecipeDatasByUri(recipeUri) {
  const { data } = await getRecipeByUri(recipeUri);
  return data;
}

export { getRecipesList, getRecipesDatasByKeyword, getRecipeDatasByUri };
