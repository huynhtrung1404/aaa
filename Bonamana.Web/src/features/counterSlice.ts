import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../stores/store";

export interface CounterState {
    value: number
}

const initialState: CounterState = {
    value: 0
}

export const counterSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        incre: state => {
            state.value +=1
        },
        decre: state => {
            state.value -=1
        },
        increByAmount: (state, action: PayloadAction<number>) => {
            state.value += action.payload
        }
    }
})

export const {incre, decre, increByAmount} = counterSlice.actions;

export const selectCount = (state: RootState) => state.counter.value;

export default counterSlice.reducer;