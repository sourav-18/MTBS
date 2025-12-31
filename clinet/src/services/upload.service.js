import { getRequest, patchRequest, PostRequest, uploadRequest } from "./api.service";

const baseUrl=process.env.REACT_APP_BASE_URL+"/uploads";

export const uploadImages = async (imageData) => {
    const apiUrl=baseUrl
    const apiRes=await uploadRequest({url:apiUrl,body:imageData});
    return apiRes;
}