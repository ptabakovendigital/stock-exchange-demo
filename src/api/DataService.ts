import axios, { AxiosError, AxiosResponse } from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.response.use(async response => {    
    return response
}, (error: AxiosError) => {    
    return Promise.reject(error.response);
})

const requests = {
    get: (url: string) => axios.get(`${url}&api_key=${process.env.REACT_APP_API_KEY}`, {
        headers: {
            Accept: 'application/json'
        }
    }).then(responseBody)            
   
}

const Companies = {
    get: () => requests.get('v3/datasets/?database_code=WIKI'),
    getHistory: (database_code: string, dataset_code: string) => requests.get(`v3/datasets/${database_code}/${dataset_code}/data.json?`),         
}

const DataService = {
    Companies,    
}

export default DataService;