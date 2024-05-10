import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const register = createAsyncThunk(
  'user/register',
  async ({ email, firstName, lastName, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post('https://reqres.in/api/register', {
        email,
        firstName,
        lastName,
        password,
      });
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 400) {
        return rejectWithValue({ error: 'Missing password' });
      } else {
        throw error;
      }
    }
  }
);

export const login = createAsyncThunk(
    'user/login',
  async ({ email,password }, { rejectWithValue }) => {
    try {
      const response = await axios.post('https://reqres.in/api/login', {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 400) {
        return rejectWithValue({ error: 'Missing password' });
      } else {
        throw error;
      }
    }
  }
);

export const list = createAsyncThunk('user/list', async () => {
  try {
    const response = await axios.get('https://reqres.in/api/unknown');
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const listAdd = createAsyncThunk('user/listAdd', async () => {
  try {
    const response = await axios.get('https://reqres.in/api/users?page=2');
    return response.data;
  } catch (error) {
    throw error;
  }
});

const initialState = {
  user: [null],
  additionalData: [null],
  error: [null],
  loading: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
  },
  extraReducers: builder => {
    builder
      .addCase(register.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action?.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(login.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action?.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(list.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(list.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action?.payload;
      })
      .addCase(list.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(listAdd.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(listAdd.fulfilled, (state, action) => {
        state.loading = false;
        state.additionalData = action?.payload;
      })
      .addCase(listAdd.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      });
  },
});

export const {userActions, addUser} = userSlice.actions;

export default userSlice.reducer;