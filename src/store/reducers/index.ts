import { combineReducers } from "@reduxjs/toolkit";
import timezonesSlice from './TimezonesSlice/TimezonesSlice'
import hourlineSelectorSlice from "./HourlineSelectorSlice/HourlineSelectorSlice";

export default combineReducers({
    timezonesSlice,
    hourlineSelectorSlice
});