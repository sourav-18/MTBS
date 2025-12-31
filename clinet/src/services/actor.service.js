import { getRequest, patchRequest, PostRequest, PutRequest } from "./api.service";

const baseUrl=process.env.REACT_APP_BASE_URL+"/actors";

export const getTotalActorCountDetails = async () => {
    const apiUrl=baseUrl+"/count-details"
    const apiRes=await getRequest({url:apiUrl});
    return apiRes;
}

export const getActorList = async (page=1,limit=10,search="") => {
    let apiUrl=baseUrl+`?page=${page}&limit=${limit}`;
    if(search){
        apiUrl=apiUrl+`&search=${search}`
    }
    const apiRes=await getRequest({url:apiUrl});
    return apiRes;
}

export const actorStatusUpdate = async (id,status) => {
    let apiUrl=baseUrl+`/${id}/status/${status}`;
    const apiRes=await patchRequest({url:apiUrl});
    return apiRes;
}

export const actorCreate = async (bodyData) => {
    let apiUrl=baseUrl;
    const apiRes=await PostRequest({url:apiUrl,body:bodyData});
    return apiRes;
}

export const actorUpdate = async (bodyData) => {
    let apiUrl=baseUrl;
    const apiRes=await PutRequest({url:apiUrl,body:bodyData});
    return apiRes;
}

