import { configureStore } from "@reduxjs/toolkit";
import rootReducers from "./reducers";
import ct, { Timezone } from "countries-and-timezones";
import { initialState as timezonesInitialState } from "./reducers/TimezonesSlice/TimezonesSlice";

const openedTimezonesText = localStorage.getItem('openedTimezones');
let openedTimezones: (Timezone & {isHome: boolean})[] = [];
let homeTimezone: Timezone | null = null;
if (openedTimezonesText) {
    openedTimezones = JSON.parse(openedTimezonesText);

    homeTimezone = openedTimezones.find((timezone) => timezone.isHome) || openedTimezones[0];
} else {
    openedTimezones = [Object.assign(ct.getTimezone('Europe/London'), {isHome: true})];
    homeTimezone = openedTimezones[0];
}

const store = configureStore({
    reducer: rootReducers,
    preloadedState: {
        timezonesSlice: {
            ...timezonesInitialState,
            openedTimezones,
            homeTimezone
        }
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;