import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import ct, { Timezone, Country } from 'countries-and-timezones';
import { amountOfRecommendations } from '../../../data/constants';
import ITimeForTimezones from '../../../models/ITimeForTimezones';
import { DropResult } from 'react-beautiful-dnd';

export interface TimezonesState {
    timezones: Timezone[],
    countries: Country[],
    openedTimezones: (Timezone & {isHome: boolean})[],
    recomendedTimezones: Timezone[], // search recomendations
    homeTimezone: Timezone | null,
    gmt: ITimeForTimezones
}

export const initialState: TimezonesState = {
    timezones: Object.entries(ct.getAllTimezones()).map(([key, value]) => value),
    countries: Object.entries(ct.getAllCountries()).map(([key, value]) => value),
    openedTimezones: [],
    recomendedTimezones: [],
    homeTimezone: null,
    gmt: {hours: 0, minutes: 0}
}

const TimezonesSlice = createSlice({
    name: 'Timezone',
    initialState,
    reducers: {
        searchTimezone(state, {payload}: PayloadAction<string>) {
            payload = payload.toLowerCase();
            state.recomendedTimezones = state.timezones.filter(tz => 
                tz.name.toLowerCase().includes(payload)
            ).slice(0, amountOfRecommendations);
        },
        clearRecommendations(state) {
            state.recomendedTimezones = [];
        },
        openTimezone(state, {payload}: PayloadAction<string>) {
            payload = payload.toLowerCase();

            if (state.openedTimezones.map(tz => tz.name.toLowerCase()).includes(payload)) return;
            
            const newOpenedTimezone = Object.assign(state.timezones.find(tz => 
                tz.name.toLowerCase().includes(payload)
            )!, {isHome: state.openedTimezones.length === 0});

            if (newOpenedTimezone.isHome) {
                state.homeTimezone = newOpenedTimezone;
            }

            state.openedTimezones.push(newOpenedTimezone);

            localStorage.setItem('openedTimezones', JSON.stringify(state.openedTimezones));
        },
        setNewOpenedTimezonesOrder(state, {payload}: PayloadAction<DropResult>) {
            const {source, destination} = payload;

            if (!destination || (
                destination.index === source.index &&
                destination.droppableId === source.droppableId
            )) {
                return;
            }

            const newOpenedTimezones = Array.from(state.openedTimezones);
            const element = {...newOpenedTimezones[source.index]};
            newOpenedTimezones.splice(source.index, 1);
            newOpenedTimezones.splice(destination.index, 0, element);

            state.openedTimezones = newOpenedTimezones;
        },
        closeTimezone(state, {payload}: PayloadAction<string>) {
            payload = payload.toLowerCase();
            let isHome: boolean = false;
            state.openedTimezones = state.openedTimezones.filter((timezone) => {
                if (timezone.name.toLowerCase() === payload) {
                    if (timezone.isHome) {
                        isHome = true;
                    }

                    return false;
                }

                return true;
            });

            if (isHome) {
                state.openedTimezones[0].isHome = true;
            }

            localStorage.setItem('openedTimezones', JSON.stringify(state.openedTimezones));
        },
        setHomeTimezone(state, {payload}: PayloadAction<string>) {
            payload = payload.toLowerCase();
            const timezones = state.openedTimezones;

            timezones.forEach(timezone => timezone.isHome = false);
            const home = timezones.find((timezone) => timezone.name.toLowerCase() === payload)!;
            home.isHome = true;
            
            state.homeTimezone = home;
            
            localStorage.setItem('openedTimezones', JSON.stringify(state.openedTimezones));
        },
        updateGmt(state, {payload}: PayloadAction<ITimeForTimezones>) {
            state.gmt = payload;
        }
    },
})

export const {
    searchTimezone,
    clearRecommendations,
    openTimezone,
    setNewOpenedTimezonesOrder,
    closeTimezone,
    setHomeTimezone,
    updateGmt
} = TimezonesSlice.actions;
export default TimezonesSlice.reducer;