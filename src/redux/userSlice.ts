import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type user = {
  name: string;
  mobile: number;
  dob: string;
  sex: string;
  govId: string;
  idType: string;
  address: string;
  pincode: number;
  country: string;
  city: string;
};

type initialState = {
  userList: user[];
};

const initialState: initialState = {
  userList: [],
};

export const userSlice = createSlice({
  initialState,
  name: "user",
  reducers: {
    addSubmitUser: (state, action: PayloadAction<user>) => {
      state.userList.push(action.payload);
    },
  },
});

export const { addSubmitUser } = userSlice.actions;
export default userSlice.reducer;
