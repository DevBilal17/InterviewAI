import { createSlice } from "@reduxjs/toolkit";

const userData = {
  name: "",
  email: "",
  photoUrl: "",
  credits: 0,
};

const userSlice = createSlice({
  name: "user",
  initialState: userData,

  reducers: {
    setUserData: (state, action) => {
        state.name = action.payload.name;
        state.email = action.payload.email;
        state.credits = action.payload.credits;
        state.photoUrl = action.payload.photoUrl;
    },
  },
});

export const {setUserData} = userSlice.actions;

export default userSlice.reducer
