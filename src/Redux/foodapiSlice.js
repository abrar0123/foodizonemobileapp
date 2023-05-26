import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {API_KEY, Api_EndPoints} from './Handleapi/handleapi';

export const getFoodData = createAsyncThunk('fooddata', async () => {
  try {
    const response = await fetch(
      `${Api_EndPoints}/search?apiKey=${API_KEY}&query=pizza&number=10`,
    );
    const data = await response.json();
    // console.log('fooddata__1\n', data.results);
    return data.results;
  } catch (error) {
    console.log('error_', error);
  }
});

export const foodapiSlice = createSlice({
  name: 'foodapi',
  initialState: {
    foodapidata: [],
    loading: false,
    error: null,
  },
  reducers: {
    apidata: () => {},
  },
  extraReducers: buildler => {
    buildler
      .addCase(getFoodData.pending, state => {
        state.loading = true;
      })
      .addCase(getFoodData.fulfilled, (state, action) => {
        const foodapi = action.payload;
        state.loading = false;
        state.foodapidata = foodapi;
      })
      .addCase(getFoodData.rejected, (state, action) => {
        const error = action.error.message;
        state.error = error;
      });
  },
});

export const foodApiReducer = foodapiSlice.reducer;
