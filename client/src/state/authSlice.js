import {createSlice} from "@reduxjs/toolkit";
import {authApiSlice} from "./authApiSlice.js";

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        token: null,
        isAuthenticated: false,
    },
    reducers: {
        login(state, {payload}) {
            state.user = payload.user;
            state.token = payload.accessToken;
            state.isAuthenticated = true;
        },
        logout(state) {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
        }
    },
    extraReducers: (builder) => {
        builder.addMatcher(authApiSlice.endpoints.login.matchFulfilled, (state, {payload}) => {
            state.user = payload.user;
            state.token = payload.accessToken;
            state.isAuthenticated = true;
        })
    }
})

export const selectUser = (state) =>{
    return state.auth.user;
}

export const { login, logout} = authSlice.actions;