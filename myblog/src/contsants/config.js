// api notification messages

// API NOTIFICATION MESSAGES
export const API_NOTIFICATION_MESSAGES = {
    loading: {
        title: "Loading...",
        message: "Data is being loaded. Please wait"
    },
    success: {
        title: "Success",
        message: "Data successfully loaded"
    },
    requestFailure: {
        title: "Error!",
        message: "An error occur while parsing request data"
    },
    responseFailure: {
        title: "Error!",
        message: "An error occur while fetching response from server. Please try again"
    },
    networkError: {
        title: "Error!",
        message: "Unable to connect to the server. Please check internet connectivity and try again."
    }
}

// api service calls
//sample request
// need service call : {url: '/' ,method:'post/get/put/delete' params :true , query :true/false}

export const SERVICE_URLS={
    userSignup: { url: '/signup', method: 'POST' },
    userLogin:  { url:'login', method:'POST'},
    uploadFile: {url:'/file/upload',method:'POST', headers: {"Content-Type" : "multipart/form-data"}}
    
}