import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { signIn } from './loginAPI';

const initialState = {
  email: '',
  password: '',
  accessToken: '',
  uid: '',
  client: '',
  isLoggedIn: false,
  status: 'idle',
  errors: [],
};

export const loginAsync = createAsyncThunk(
  'login/login',
  async ({ email, password }) => {
    const response = await signIn({ email, password });
    return response.headers;
  }
);

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setEmail: (state, action) => {
        state.email = action.payload;
    },
    setPassword: (state, action) => {
        state.password = action.payload;
    },
    logout: (state) => {
      state.email = '';
      state.password = '';
      state.accessToken = '';
      state.uid = '';
      state.client = '';
      state.isLoggedIn = false;
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.accessToken = action.payload.accessToken;
        state.uid = action.payload.uid;
        state.client = action.payload.client;
        state.isLoggedIn = true;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.errors = [action.error.message];
        state.status = 'idle';
      })
  },
});

export const { login, logout, setEmail, setPassword } = loginSlice.actions;

export const selectEmail = (state) => state.login.email;
export const selectPassword = (state) => state.login.password;
export const selectIsSignedIn = (state) => state.login.isLoggedIn;
export const selectErrors = (state) => state.login.errors;

export default loginSlice.reducer;
