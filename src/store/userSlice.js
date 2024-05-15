import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://reqres.in/api/',
});

export const register = createAsyncThunk(
  'user/register',
  async ({email, firstName, lastName, password}, {rejectWithValue}) => {
    try {
      const response = await api.post('register', {
        email,
        firstName,
        lastName,
        password,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message,
      );
    }
  },
);

export const login = createAsyncThunk(
  'user/login',
  async ({email, password}, {rejectWithValue}) => {
    try {
      const response = await api.post('login', {email, password});
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message,
      );
    }
  },
);

export const fetchUserDetails = createAsyncThunk(
  'user/fetchUserDetails',
  async (userId, {rejectWithValue}) => {
    try {
      const response = await api.get(`users/${userId}`);
      return response.data.data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        return rejectWithValue({error: 'User not found'});
      } else {
        return rejectWithValue(
          error.response ? error.response.data : error.message,
        );
      }
    }
  },
);

export const fetchDetails = createAsyncThunk(
  'user/fetchDetails',
  async (userId, {rejectWithValue}) => {
    try {
      const response = await api.get(`unknown/${userId}`);
      return response.data.data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        return rejectWithValue({error: 'User not found'});
      } else {
        return rejectWithValue(
          error.response ? error.response.data : error.message,
        );
      }
    }
  },
);

export const list = createAsyncThunk('user/list', async () => {
  try {
    const response1 = await api.get('users?page=1');
    const response2 = await api.get('users?page=2');
    const users1 = response1.data.data;
    const users2 = response2.data.data;
    const combinedUsers = [...users1, ...users2];
    return combinedUsers;
  } catch (error) {
    throw error;
  }
});

export const listAdd = createAsyncThunk('unknown/list', async () => {
  try {
    const response1 = await api.get('unknown?page=1');
    const response2 = await api.get('unknown?page=2');
    const data1 = response1.data.data;
    const data2 = response2.data.data;
    const combinedData = [...data1, ...data2];
    return combinedData;
  } catch (error) {
    throw error;
  }
});

export const deleteUser = createAsyncThunk(
  'user/deleteUser',
  async (userId, {rejectWithValue}) => {
    try {
      const response = await api.delete(`users/${userId}`);
      console.log('Delete API Response:', response.status);
      return {userId};
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message,
      );
    }
  },
);

export const createUser = createAsyncThunk(
  'user/createUser',
  async ({name, job}, {rejectWithValue}) => {
    try {
      const response = await api.post('users', {name, job});
      console.log('Create User API Response:', response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message,
      );
    }
  },
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async ({userId, name, job}, {rejectWithValue}) => {
    try {
      const response = await api.put(`users/${userId}`, {name, job});
      console.log('Update User PUT API Response:', response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message,
      );
    }
  },
);

export const updateUserPatch = createAsyncThunk(
  'user/updateUserPatch',
  async ({userId, name, job}, {rejectWithValue}) => {
    try {
      const response = await api.patch(`users/${userId}`, {name, job});
      console.log('Update User PATCH API Response:', response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message,
      );
    }
  },
);

// export const fetchDataWithDelay = createAsyncThunk(
//   'user/fetchDataWithDelay',
//   async (_, {rejectWithValue}) => {
//     try {
//       const response = await api.get('users?delay=3');
//       return response.data.data;
//     } catch (error) {
//       return rejectWithValue(
//         error.response ? error.response.data : error.message,
//       );
//     }
//   },
// );

const initialState = {
  user: [null],
  additionalData: [null],
  error: [null],
  loading: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
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
      })
      .addCase(deleteUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = state.user.filter(
          user => user.id !== action.payload.userId,
        );
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(createUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      });
    // .addCase(fetchDataWithDelay.pending, state => {
    //   state.loading = true;
    //   state.error = null;
    // })
    // .addCase(fetchDataWithDelay.fulfilled, (state, action) => {
    //   state.loading = false;
    //   state.user = action.payload;
    // })
    // .addCase(fetchDataWithDelay.rejected, (state, action) => {
    //   state.loading = false;
    //   state.error = action?.error?.message;
    // });
  },
});

export const {userActions, addUser} = userSlice.actions;

export default userSlice.reducer;
