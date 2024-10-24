import { createAsyncThunk } from '@reduxjs/toolkit'


export const getCodes = createAsyncThunk(
  'codes/getCodes',
  async (payload: string, thunkAPI) => {
    try {
      const stringToArr = payload.split("\r\n")
      const even = (element: string) => element.length > 17;

      if (stringToArr.some(even)) {
        const withoutDash = stringToArr.map(code => code.replace(/[^0-9]/g, ''))
        return withoutDash
      } else {
        return stringToArr
      }
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message)
    }
  }
)

export const setCodes = createAsyncThunk(
  'codes/setCodes',
  async (payload: string[], thunkAPI) => {
    try {
      return payload
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message)
    }
  }
)
export const setResCodes = createAsyncThunk(
  'codes/setResCodes',
  async (payload: string[], thunkAPI) => {
    try {
      return payload
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message)
    }
  }
)

export const setUsedCodes = createAsyncThunk(
  'codes/setUsedCodes',
  async (payload: string[], thunkAPI) => {
    try {
      return payload
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message)
    }
  }
)

export const resetAllCodes = createAsyncThunk(
  'codes/resetAllCodes',
  async (_, thunkAPI) => {
    console.log('called resed codes')
    try {
      return []
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message)
    }
  }
)