import { createSlice } from "@reduxjs/toolkit"

export const experienceSlice = createSlice({
    name:"experience",
    initialState:{
        experiences:[]
    },
    reducers:{
        editExperiences(state,{payload}){
            state.experiences = payload.data
        }
    }
})

export const { editExperiences } = experienceSlice.actions