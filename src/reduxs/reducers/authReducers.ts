import { createSlice } from "@reduxjs/toolkit";

export interface AuthState {
    id: string,
    email: string,
    fullname: string,
    isLogin:boolean
}

const initialState: AuthState = {
    id: '',
    email: '',
    fullname: '',
    isLogin:false
}

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        authData: initialState
    },
    reducers: {
        addAuth: (state, action) => {
            state.authData = action.payload;
        },
        removeAuth: (state) => {
            state.authData = initialState;
        },
        setIsLogin:(state,action) =>{
            state.authData.isLogin = action.payload.isLogin
        }
        
    }
});
export const { addAuth, removeAuth,setIsLogin} = authSlice.actions;
export const authReducer = authSlice.reducer;
// export const authSelector = (state: any) => state.authReducer.auth;
