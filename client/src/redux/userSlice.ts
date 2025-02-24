import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserData {
    id: string | null;
    email: string | null;
    mobile: string | null
    title?:string | null,
    fullname?:string | null,
    dob?:string | null,
    currentAddress?:string | null,
    livingDuration?:string | null,
    about?:string | null,
    employmentStatus?:string | null,
    additionalSavings?:string | null
}


const initialState: UserData = {
    id: null,
    email: null,
    mobile: null,
    title:null,
    fullname:null,
    dob:null,
    currentAddress:null,
    livingDuration:null,
    about:null,
    employmentStatus:null,
    additionalSavings: null
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        createAccount: (state, action: PayloadAction<UserData>) => {
            state.id = action.payload.id;
            state.email = action.payload.email;
            state.mobile = action.payload.mobile
        },
        personalInfo: (state, action: PayloadAction<UserData>) => {
            state.title = action.payload.title;
            state.fullname = action.payload.fullname;
            state.dob = action.payload.dob;
            state.currentAddress = action.payload.currentAddress;
            state.livingDuration = action.payload.livingDuration;
        },
        financialInfo: (state, action: PayloadAction<UserData>) => {
            state.employmentStatus = action.payload.employmentStatus;
            state.additionalSavings = action.payload.additionalSavings
        },
        removeData: (state) => {
            state.id = null;
            state.email = null;
            state.mobile = null;
            state.fullname = null;
            state.dob = null;
            state.currentAddress = null;
            state.livingDuration = null;
            state.about = null;
            state.employmentStatus = null;
            state.additionalSavings = null;
        }
    }
});

export const {createAccount,personalInfo,financialInfo,removeData} = userSlice.actions;

export default userSlice.reducer;