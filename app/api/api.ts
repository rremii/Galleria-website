import axios from "axios";

const instance = axios.create({
    withCredentials: false,
    baseURL: `https://api.unsplash.com/`,
    headers: {}
})
const ApiKey = 'ZrhaKXUYD2q5JEx6I5giQwyxLsx4jdQIaFIuux5uvVs'
export const photosAPI = {
    getPhotos: (page: number) => {
        return instance.get(`photos/?client_id=${ApiKey}&&page=${'' + page}`)
    },
}