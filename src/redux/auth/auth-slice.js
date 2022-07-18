import { createSlice } from '@reduxjs/toolkit';
import authOperations from './auth-operations';

const initialUserState = {
  user: { name: null, email: null },
  token: null,
  // error: null,
  isLoggedIn: false,
  isFetchingCurrentUser: false,
  // isLoading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialUserState,
  extraReducers: {
    [authOperations.register.fulfilled](state, action) {
      state.user.name = action.payload.data.user.name;
      state.user.email = action.payload.data.user.email;
      state.token = action.payload.token;
      // state.isLoggedIn = true;
      // console.log(action);
      console.log(state);
    },
    [authOperations.logIn.fulfilled](state, action) {
      state.user = action.payload.data.user;
      state.token = action.payload.data.token;
      state.isLoggedIn = true;
    },
    [authOperations.logOut.fulfilled](state) {
      state.user = { name: null, email: null };
      state.token = null;
      state.isLoggedIn = false;
    },
    [authOperations.fetchCurrentUser.pending](state) {
      state.isFetchingCurrentUser = true;
    },
    [authOperations.fetchCurrentUser.fulfilled](state, action) {
      state.user = action.payload.data.user;
      state.isLoggedIn = true;
      state.isFetchingCurrentUser = false;
    },
    [authOperations.fetchCurrentUser.rejected](state) {
      state.isFetchingCurrentUser = false;
    },
  },
});

export default authSlice.reducer;