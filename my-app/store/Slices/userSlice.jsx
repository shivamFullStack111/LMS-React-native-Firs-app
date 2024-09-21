import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    isauthenticated: false,
    isloading: true,
    user: null,
    courses: [],
  },
  reducers: {
    setisauthenticated: (state, action) => {
      state.isauthenticated = action.payload;
    },
    setuser: (state, action) => {
      state.user = action.payload;
    },
    setcourses: (state, action) => {
      state.courses = action.payload;
    },
  },
});

export const { setisauthenticated, setuser, setcourses } = userSlice.actions;
export default userSlice.reducer;
