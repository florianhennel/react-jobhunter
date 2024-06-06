import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const registerApiSlice = createApi({
    reducerPath: "registerApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3030/users",
    }),
    endpoints: (build) => ({
        register: build.mutation({
            query: ({body})=>({
                method:"POST",
                headers:{
                    "Content-type":"application/json"
                },
                body: body
            })
        })
    })
})

export const { useRegisterMutation } = registerApiSlice;