import { createSlice } from "@reduxjs/toolkit";
import {
  registerUserRequest,
  loginUserRequest,
  authUserRequest,
  logOutRequest,
} from "./thunk";

const initialState = {
  userData: null,
  token: null,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) =>
    builder
      .addCase(registerUserRequest.pending, (state) => {
        state.error = null;
      })
      .addCase(registerUserRequest.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.userData = action.payload.user;
      })
      .addCase(registerUserRequest.rejected, (state, action) => {
        state.error = action.payload;
      })

      // Login

      .addCase(loginUserRequest.pending, (state) => {
        state.error = null;
      })
      .addCase(loginUserRequest.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.userData = action.payload.user;
      })
      .addCase(loginUserRequest.rejected, (state, action) => {
        state.error = action.payload;
      })
      // Auth User

      .addCase(authUserRequest.pending, (state) => {
        state.error = null;
      })
      .addCase(authUserRequest.fulfilled, (state, action) => {
        state.userData = action.payload;
      })
      .addCase(authUserRequest.rejected, (state, action) => {
        state.error = action.payload;
      })

      // Log Out
      .addCase(logOutRequest.pending, (state) => {
        state.error = null;
      })
      .addCase(logOutRequest.fulfilled, (state) => {
        state.token = null;
        state.userData = null;
      })
      .addCase(logOutRequest.rejected, (state, action) => {
        state.error = action.payload;
      }),
});

export default userSlice.reducer;
