import {photosAPI} from "../api/api";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit"
import {IcurrentPhoto, Iphoto} from "./types";

export const fetchPhotos = createAsyncThunk(
    'PhotosSlice/fetchPhotos',
    async (page: number, store) => {
        let response = await photosAPI.getPhotos(page)
        await new Promise((resolve, reject) => {
            setTimeout(() => resolve(''), 3500);
        });

        if (response?.status !== 200) throw new Error('server error')

        return (response.data) as Iphoto[]
    }
)


type initialStateType = {
    photos: Iphoto[]
    isPending: boolean
    currentPhoto: IcurrentPhoto
    currentPage: number | null
    isSlideShow: boolean
}

let initialState = {
    photos: [],
    isPending: false,
    currentPhoto: {PhotoId: 1} as IcurrentPhoto,
    currentPage: null,
    isSlideShow: false
} as initialStateType

const PhotosSlice = createSlice({
    name: 'PhotosSlice',
    initialState,
    reducers: {
        setCurrentPhoto(state, action: PayloadAction<number>) {
            state.currentPhoto = {PhotoId: action.payload, ...state.photos[action.payload]}
        },
        setCurrentPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload
        },
        toggleIsSlideShow(state, action: PayloadAction<boolean>) {
            state.isSlideShow = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPhotos.fulfilled, (state, action: PayloadAction<Iphoto[]>) => {
            state.photos.push(...action.payload)
            state.isPending = false
            state.currentPhoto = {PhotoId: state.currentPhoto.PhotoId, ...state.photos[state.currentPhoto.PhotoId]}
        })
        builder.addCase(fetchPhotos.pending, (state) => {
            state.isPending = true
        })

    },

})
export const {setCurrentPhoto, setCurrentPage, toggleIsSlideShow} = PhotosSlice.actions
export default PhotosSlice.reducer