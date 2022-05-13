import {configureStore} from "@reduxjs/toolkit";
import PhotosSlice from './PhotosSlice'
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";

// export function makeStore() {
//     return configureStore({
//         reducer: {
//             Photos: PhotosSlice
//         }
//     })
// }
export const store = configureStore({
    reducer: {
        Photos: PhotosSlice
    }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
//
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector
