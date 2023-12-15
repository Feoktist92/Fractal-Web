import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export enum Sex {
    DEFAULT = 'Не выбрано',
    MALE = 'мужской',
    FEMALE = 'женский',
}
export type HomeFields = {
    phone: string;
    email: string;
};

export type AboutFields = {
    nickname: string;
    name: string;
    surname: string;
    gender: Sex;
};

export type AdvantagesFields = {
    advantagesInputs: string[];
    checkboxOne: boolean;
    checkboxTwo: boolean;
    checkboxThree: boolean;
    radio: string;
};

export type InfoFields = {
    aboutInfo: string;
};

export interface SliceState {
    homeState: HomeFields;
    aboutState: AboutFields;
    advantagesState: AdvantagesFields;
    infoState: InfoFields;
}

const initialState: SliceState = {
    homeState: {
        phone: '',
        email: '',
    },
    aboutState: {
        nickname: '',
        name: '',
        surname: '',
        gender: Sex.DEFAULT,
    },
    advantagesState: {
        advantagesInputs: ['', '', ''],
        checkboxOne: false,
        checkboxTwo: false,
        checkboxThree: false,
        radio: '',
    },
    infoState: {
        aboutInfo: '',
    },
};

const SliceFields = createSlice({
    name: 'SliceFields',
    initialState: initialState,
    reducers: {
        setHomePage(state, action: PayloadAction<HomeFields>) {
            state.homeState = action.payload;
        },
        setAboutPage(state, action: PayloadAction<AboutFields>) {
            state.aboutState = action.payload;
        },
        setAdvantagesPage(state, action: PayloadAction<AdvantagesFields>) {
            state.advantagesState = action.payload;
        },
        setInfoPage(state, action: PayloadAction<InfoFields>) {
            state.infoState = action.payload;
        },
        resetAllFields(state) {
            state.homeState = initialState.homeState;
            state.aboutState = initialState.aboutState;
            state.advantagesState = initialState.advantagesState;
            state.infoState = initialState.infoState;
        },
    },
});

export const {
    setHomePage,
    setAboutPage,
    setAdvantagesPage,
    setInfoPage,
    resetAllFields,
} = SliceFields.actions;

export const Reducer = SliceFields.reducer;
