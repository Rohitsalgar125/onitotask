import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type user = {
  name: string;
  mobile: string;
  sex: string;
  id: string;
  idType: string;
  address: string;
  pincode: string;
  country: string;
  state: string;
  city: string;
  age : string 
};

type stepOne = {
  name: string;
  mobile: string;
  sex: string;
  id: string;
  idType: string;
  age: string;
};

type initialState = {
  userList: user[];
  stepOne: stepOne[];
};

const initialState: initialState = {
  userList: [],
  stepOne: [],
};

export const userSlice = createSlice({
  initialState,
  name: "user",
  reducers: {
    addSubmitUser: (state, action: PayloadAction<user>) => {
      state.userList.push(action.payload);
    },
    addStepOne: (state, action: PayloadAction<stepOne>) => {
      state.stepOne.push(action.payload);
    },
    clearStepOne: (state) => {
      state.stepOne = [];
    },
  },
});

export const { addSubmitUser, addStepOne, clearStepOne } = userSlice.actions;
export default userSlice.reducer;
