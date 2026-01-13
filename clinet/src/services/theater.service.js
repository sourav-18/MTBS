import { getRequest, patchRequest, PostRequest, PutRequest } from "./api.service";

const baseUrl = process.env.REACT_APP_BASE_URL + "/theaters";
const theaterService = {};

theaterService.listForAdmin=async ({page=1, limit=10, search, city, status, verificationStatus})=>{

    let apiUrl = baseUrl + `/list-for-admin?page=${page}&limit=${limit}`;
    if (search&&search.length>1) {
        apiUrl = apiUrl + '&search=' + search;
    }
    if(city)apiUrl = apiUrl + '&city=' + city;
    if(status)apiUrl = apiUrl + '&status=' + status;
    if(verificationStatus)apiUrl = apiUrl + '&verificationStatus=' + verificationStatus;
    console.log(apiUrl);
    const apiRes = await getRequest({ url: apiUrl });
    return apiRes;
}

theaterService.statusUpdate=async ({id,status})=>{
    let apiUrl = baseUrl + `/${id}/status/${status}`;
    const apiRes = await patchRequest({ url: apiUrl });
    return apiRes;
}

theaterService.verificationStatusUpdate=async ({id,verificationStatus})=>{
    let apiUrl = baseUrl + `/${id}/verificationStatus/${verificationStatus}`;
    const apiRes = await patchRequest({ url: apiUrl });
    return apiRes;
}

theaterService.countDetails=async ({search,city,verificationStatus,status})=>{
    let apiUrl = baseUrl + `/count-details?`;

    if (search&&search.length>1) {
        apiUrl = apiUrl + '&search=' + search;
    }
    if(city)apiUrl = apiUrl + '&city=' + city;
    if(status)apiUrl = apiUrl + '&status=' + status;
    if(verificationStatus)apiUrl = apiUrl + '&verificationStatus=' + verificationStatus;

    const apiRes = await getRequest({ url: apiUrl });
    return apiRes;
}

theaterService.update = async (bodyData,id) => {
    let apiUrl=baseUrl+'/'+id;
    const apiRes=await PutRequest({url:apiUrl,body:bodyData});
    return apiRes;
}

export default  theaterService;