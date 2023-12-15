import { createSelector } from 'reselect';
import { RootState } from './store';

export const selectHome = (state: RootState) => state.homeState;
export const selectAbout = (state: RootState) => state.aboutState;
export const selectAdvantages = (state: RootState) => state.advantagesState;
export const selectInfo = (state: RootState) => state.infoState;

export const selectAll = createSelector(
    selectAbout,
    selectAdvantages,
    selectInfo,
    selectHome,
    (aboutState, advantagesState, infoState, homeState) => ({
        aboutState,
        advantagesState,
        infoState,
        homeState,
    })
);
