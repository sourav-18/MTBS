import { getRequest, patchRequest, PostRequest, PutRequest } from "./api.service";

const baseUrl = process.env.REACT_APP_BASE_URL + "/movies";

export const createMovie = async (body) => {
    let apiUrl = baseUrl;
    const apiRes = await PostRequest({ url: apiUrl, body: body });
    return apiRes;
}

export const getMovieList = async (search, page, limit) => {
    let apiUrl = baseUrl + `?page=${page}&limit=${limit}`;
    if (search) {
        apiUrl = apiUrl + '&search=' + search;
    }
    const apiRes = await getRequest({ url: apiUrl });
    return apiRes;
}

export const getMovieActorList = async (movieId,search) => {
    let apiUrl=baseUrl+`/${movieId}`+`/actors-list`;
    if(search){
        apiUrl=apiUrl+`?search=${search}`
    }
    const apiRes=await getRequest({url:apiUrl});
    return apiRes;
}

export const movieStatusUpdate = async (id,status) => {
    let apiUrl=baseUrl+`/${id}/status/${status}`;
    const apiRes=await patchRequest({url:apiUrl});
    return apiRes;
}

