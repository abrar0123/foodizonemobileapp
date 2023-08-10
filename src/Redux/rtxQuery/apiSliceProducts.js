import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {API_KEY} from '../Handleapi/handleapi';

export const foodProductsApi = createApi({
  reducerPath: 'foodProduct',
  baseQuery: fetchBaseQuery({baseUrl: 'https://api.spoonacular.com'}),
  endpoints: buildler => ({
    getAllFood: buildler.query({
      query: () => ({
        url: `search?apiKey=${API_KEY}&query=pizza&number=10`,
        method: 'get',
      }),
    }),
  }),
});
export const {useGetDataQuery} = foodProductsApi;
