import { configureStore, combineReducers } from "@reduxjs/toolkit";
import CodesReducer from "./reducers/CodesReducer"

const rootReducers = combineReducers({
    CodesReducer,
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducers
})}

export type RootState = ReturnType<typeof rootReducers>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']