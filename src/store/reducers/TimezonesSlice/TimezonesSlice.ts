import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import ct, { Timezone, Country } from 'countries-and-timezones';
import { amountOfRecommendations } from '../../../data/constants';

export interface TimezonesState {
    timezones: Timezone[],
    countries: Country[],
    openedTimezones: (Timezone & {isHome: boolean})[],
    recomendedTimezones: Timezone[], // search recomendations
    homeTimezone: Timezone | null
}

export const initialState: TimezonesState = {
    timezones: Object.entries(ct.getAllTimezones()).map(([key, value]) => value),
    countries: Object.entries(ct.getAllCountries()).map(([key, value]) => value),
    openedTimezones: [],
    recomendedTimezones: [],
    homeTimezone: null
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
            state.openedTimezones.push(Object.assign(state.timezones.find(tz => {
                return tz.name.toLowerCase().includes(payload);
            })!, {isHome: state.openedTimezones.length === 0}));

            localStorage.setItem('openedTimezones', JSON.stringify(state.openedTimezones));
        },
        closeTimezone(state, {payload}: PayloadAction<string>) {
            payload = payload.toLowerCase();
            state.openedTimezones = state.openedTimezones.filter((timezone) => 
                timezone.name.toLowerCase() !== payload
            );

            if (state.openedTimezones.length !== 0) {
                state.openedTimezones[0].isHome = true;
            }

            localStorage.setItem('openedTimezones', JSON.stringify(state.openedTimezones));
        },
        setHomeTimezone(state, {payload}: PayloadAction<string>) {
            payload = payload.toLowerCase();
            const timezones = state.openedTimezones;

            timezones.forEach(timezone => timezone.isHome = false);
            const index = timezones.findIndex((timezone) => timezone.name.toLowerCase() === payload);
            timezones[index].isHome = true;
            
            state.homeTimezone = timezones[index];
            state.openedTimezones = timezones;
            
            localStorage.setItem('openedTimezones', JSON.stringify(state.openedTimezones));
        }
    },
})

export const {
    searchTimezone,
    clearRecommendations,
    openTimezone,
    closeTimezone,
    setHomeTimezone
} = TimezonesSlice.actions;
export default TimezonesSlice.reducer;