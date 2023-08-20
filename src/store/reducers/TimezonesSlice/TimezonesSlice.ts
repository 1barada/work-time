import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import ct, { Timezone, Country } from 'countries-and-timezones';
import { amountOfRecommendations } from '../../../data/constants';

export interface TimezonesState {
    timezones: Timezone[],
    countries: Country[],
    openedTimezones: Timezone[],
    recomendedTimezones: Timezone[], // search recomendations
}

export const initialState: TimezonesState = {
    timezones: Object.entries(ct.getAllTimezones()).map(([key, value]) => value),
    countries: Object.entries(ct.getAllCountries()).map(([key, value]) => value),
    openedTimezones: [],
    recomendedTimezones: []
}

const TimezonesSlice = createSlice({
    name: 'Timezone',
    initialState,
    reducers: {
        searchTimezone(state, {payload}: PayloadAction<string>) {
            payload = payload.toLowerCase();
            state.recomendedTimezones = state.timezones.filter(tz => {
                return tz.name.toLowerCase().includes(payload);
            }).slice(0, amountOfRecommendations);
        },
        clearRecommendations(state) {
            state.recomendedTimezones = [];
        },
        openTimezone(state, {payload}: PayloadAction<string>) {
            payload = payload.toLowerCase();
            state.openedTimezones.push(state.timezones.find(tz => {
                return tz.name.toLowerCase().includes(payload);
            })!);
        }
    },
})

export const {
    searchTimezone,
    clearRecommendations
} = TimezonesSlice.actions;
export default TimezonesSlice.reducer;