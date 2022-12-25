import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from '../../../utils/axios.js'

const initialState = {
    grants: [],
    loading:false,
}

export const getAllGrants = createAsyncThunk('grant/getAllGrants', async () => {
    try {
        const { data } = await axios.get('/grants')
        return data
    } catch (error) {
        console.log(error)
    }
})

export const postSlice = createSlice({
    name: 'grant',
    initialState,
    reducers: {},
    extraReducers: {
        // Получаение всех постов
        [getAllGrants.pending]: (state) => {
            state.loading = true
        },
        [getAllGrants.fulfilled]: (state, action) => {
            state.loading = false
            state.grants = action.payload.grants
        },
        [getAllGrants.rejected]: (state) => {
            state.loading = false
        },
    },
})

export default postSlice.reducer