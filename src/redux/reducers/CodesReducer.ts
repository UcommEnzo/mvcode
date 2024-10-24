import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import {
  getCodes,
  setCodes,
  setResCodes,
  setUsedCodes,
  resetAllCodes,
  // @ts-ignore
} from './ActionCreators.ts';
import { CodesType } from "../../models/CodesTypes.ts";

export interface SearchState {
  fetchingCodes: boolean
  getCodesError: string
  codes: Array<string>
  fetchingResCodes: boolean
  getResCodesError: string
  resCodes: Array<CodesType>
  fetchingUsedCodes: boolean
  getUsedCodesError: string
  usedCodes: Array<string>
  fetchingSetCodes: boolean
  setCodesError: string
  fetchingResetAllCodes: boolean
  resetAllCodesError: string
}

const initialState: SearchState = {
  fetchingCodes: false,
  getCodesError: '',
  codes: [],
  fetchingResCodes: false,
  getResCodesError: '',
  resCodes: [],
  fetchingUsedCodes: false,
  getUsedCodesError: '',
  usedCodes: [],
  fetchingSetCodes: false,
  setCodesError: '',
  fetchingResetAllCodes: false,
  resetAllCodesError: '',
}

export const codesSlice = createSlice({
  name: 'codes',
  initialState,
  reducers: {},
  extraReducers: {
    [getCodes.pending.type]: (state) => {
      state.fetchingCodes = true
    },
    [getCodes.fulfilled.type]: (state, action: PayloadAction<string[]>) => {
      state.fetchingCodes = false
      state.getCodesError = ''
      state.codes = action.payload
    },
    [getCodes.rejected.type]: (state, action: PayloadAction<string>) => {
      state.fetchingCodes = false
      state.getCodesError = action.payload
    },

    [setResCodes.pending.type]: (state) => {
      state.fetchingResCodes = true
    },
    [setResCodes.fulfilled.type]: (state, action: PayloadAction<CodesType[]>) => {
      state.fetchingResCodes = false
      state.getResCodesError = ''
      state.resCodes = [...state.resCodes, ...action.payload]
    },
    [setResCodes.rejected.type]: (state, action: PayloadAction<string>) => {
      state.fetchingResCodes = false
      state.getResCodesError = action.payload
    },

    [setUsedCodes.pending.type]: (state) => {
      state.fetchingUsedCodes = true
    },
    [setUsedCodes.fulfilled.type]: (state, action: PayloadAction<string[]>) => {
      state.fetchingUsedCodes = false
      state.getUsedCodesError = ''
      state.usedCodes = [...state.usedCodes, ...action.payload]
    },
    [setUsedCodes.rejected.type]: (state, action: PayloadAction<string>) => {
      state.fetchingUsedCodes = false
      state.getUsedCodesError = action.payload
    },

    [setCodes.pending.type]: (state) => {
      state.fetchingSetCodes = true
    },
    [setCodes.fulfilled.type]: (state, action: PayloadAction<string[]>) => {
      state.fetchingSetCodes = false
      state.setCodesError = ''
      state.codes = action.payload
    },
    [setCodes.rejected.type]: (state, action: PayloadAction<string>) => {
      state.fetchingSetCodes = false
      state.setCodesError = action.payload
    },

    [resetAllCodes.pending.type]: (state) => {
      state.fetchingResetAllCodes = true
    },
    [resetAllCodes.fulfilled.type]: (state, action: PayloadAction<[]>) => {
      state.fetchingResetAllCodes = false
      state.resetAllCodesError = ''
      state.codes = []
      state.usedCodes = []
      state.resCodes = []
    },
    [resetAllCodes.rejected.type]: (state, action: PayloadAction<string>) => {
      state.fetchingResetAllCodes = false
      state.resetAllCodesError = action.payload
    }
  }
})

export default codesSlice.reducer