import axios from "axios";
import { API_NOTIFICATION_MESSAGES, SERVICE_URLS} from "../contsants/config";
import { getAccessToken ,getType} from "../utils/common-utils";
const API_URL='http://localhost:8000';

const axiosInstance=axios.create({
    baseURL:API_URL,
    timeout:10000,
    // headers:{
    //     "content-type":"application/json"
    // }
    headers: {
        "Accept": "application/json,multipart/form-data", 
        "Content-Type": "application/json"
        // "Content-Type":"multipart/form-data"
    }
})

axiosInstance.interceptors.request.use(
   
    function(config){
        if(config.TYPE.params){
           
            config.params=config.TYPE.params;
        }else if(config.TYPE.query){
            config.url=config.url+'/'+config.TYPE.query;
        }


        return config;
    },
    function(error){
        return Promise.reject(error);
    }
)

axiosInstance.interceptors.response.use(
    function(response){
        //Stop the global loader here
       return processResponse(response);
    },
    function(error){
        //Stop the global loader here
        return Promise.reject(processError(error));
    }
)

// if response is success return {isSucess:true,data:object}
// if response is failed return {isFailure:true,status:string,msg:string,data:object}

const processResponse=(response)=>{
    if(response?.status===200){
        return {isSuccess:true,data:response.data}; // response has data as an object where data is stored
    }else{
        return {
            isFailure:true,
            status:response?.status,
            msg:response?.msg,
            code:response?.code
        }
    }
}

const processError=(error)=>{
    if(error.response){
        //  req made to server and server then responded 
        // with status code that falls out of range 2.x.x
        console.log('error in response',error.toJSON());
        return{
            isError:true,
            msg:API_NOTIFICATION_MESSAGES.responseFailure,
            code:error.response.status
        }
    }else if(error.request){
         // req made to server but server has not responded
         console.log('error in request',error.toJSON());
        return{
            isError:true,
            msg:API_NOTIFICATION_MESSAGES.requestFailure,
            code:""
        }
    }else{
         // something wrong in frontend only
         //something wrong in setting up req 
         console.log('error in network',error.toJSON());
        return{
            isError:true,
            msg:API_NOTIFICATION_MESSAGES.networkError,
            code:""
        }
    }
}

const API = {};

for (const [key, value] of Object.entries(SERVICE_URLS)) {
    API[key] = (body, showUploadProgress, showDownloadProgress) =>
        axiosInstance({
            method: value.method,
            url: value.url,
            data: value.method === 'DELETE' ? {} : body,
            //responseType: value.responseType,
            headers: {
                authorization: getAccessToken(),
            },
            TYPE: getType(value, body),
            onUploadProgress: function(progressEvent) {
                if (showUploadProgress) {
                    let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    showUploadProgress(percentCompleted);
                }
            },
            onDownloadProgress: function(progressEvent) {
                if (showDownloadProgress) {
                    let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    showDownloadProgress(percentCompleted);
                }
            }
        });
}

export { API };
