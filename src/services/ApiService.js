import axios from 'axios';
import cookie from 'react-cookies';

let api = process.env.REACT_APP_API || 'https://jsonplaceholder.typicode.com' ;

export default class ApiService {
    async get(endpoint,params,headers){
        let res = await axios({
            method: 'GET',
            url:`${api}/${endpoint}`,
            params: params,
            headers: headers
        });
        return res.data
    }
    async post(endpoint,params,headers,data){
        let res =await axios({
            method: 'POST',
            url:`${api}/${endpoint}`,
            params: params,
            headers: headers,
            data:data,

        });
        return res.data
    }
    async update(endpoint,params,headers,data){
        let res =await axios({
            method: 'PUT',
            url:`${api}/${endpoint}/${endpoint}`,
            params: params,
            headers: headers,
            data:data,
        });
        return res.data
    }
    async delete(endpoint,params,headers){
        let res = await axios({
            method: 'DELETE',
            url:`${api}/${endpoint}`,
            params: params,
            headers: headers,
        });
        return res.data
    }
}
