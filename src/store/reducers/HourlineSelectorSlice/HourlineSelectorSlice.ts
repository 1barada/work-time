import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import ICoordinates from "../../../models/ICoordinates";
import { hourlineConstants } from "../../../data/constants";
import ISelectedTime from "../../../models/ISelectedTime";

export interface HourlineSelectorState {
    selectorTopLeftPosition: ICoordinates,
    selectorWidth: number,
    selectorHeight: number,
    selectedTime: ISelectedTime | null
}

export const initialState: HourlineSelectorState = {
    selectorTopLeftPosition: {x: 0, y: 0},
    selectorWidth: 24 * hourlineConstants.cellWidth,
    selectorHeight: 0,
    selectedTime: null
}

const HourlineSelectorSlice = createSlice({
    name: 'HourlineSelector',
    initialState,
    reducers: {
        setHourLineSelectorTopLeftPosition(state, {payload}: PayloadAction<ICoordinates>) {
            state.selectorTopLeftPosition = payload;
        },
        setHourLineSelectorHeight(state, {payload}: PayloadAction<number>) {
            state.selectorHeight = payload;
        },
        setSelectedTime(state, {payload}: PayloadAction<ISelectedTime>) {
            state.selectedTime = payload;
        }, 
        removeSelectedTime(state) {
            state.selectedTime = null;
        }
    },
});

export const {
    setHourLineSelectorTopLeftPosition,
    setHourLineSelectorHeight,
    setSelectedTime,
    removeSelectedTime
} = HourlineSelectorSlice.actions;
export default HourlineSelectorSlice.reducer;