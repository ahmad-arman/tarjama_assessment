import ApiService from "./ApiService";
import cookie from 'react-cookies';

class Login extends ApiService {
    constructor(){
        super();
         this.path='users';
         this.path_2="posts";
         this.path_3="albums";
         this.path_4="comments";
    }
    async login(){
        try {
            let response = await this.get(`${this.path}`);
            return response;
        } catch (error) {
            return error;
        }
    }
    async getUser(id){
        try {
            let response = await this.get(`${this.path}/${id}`);
            return response;
        } catch (error) {
            return error;
        }
    }
    async updateProfile(id){
        try {
            let response = await this.put(`${this.path}/${id}`);
            return response;
        } catch (error) {
            return error;
        }
    }
    async getAllUsers(){
        try {
            let response = await this.get(`${this.path}`);
            return response;
        } catch (error) {
            return error;
        }
    }
    async getAllAlbums(){
        try {
            let response = await this.get(`${this.path_3}`);
            return response;
        } catch (error) {
            return error;
        }
    }
    async getAllComments(){
        try {
            let response = await this.get(`${this.path_4}`);
            return response;
        } catch (error) {
            return error;
        }
    }
    async getAllPosts(){
        try {
            let response = await this.get(`${this.path_2}`);
            return response;
        } catch (error) {
            return error;
        }
    }
    async addPost(data){
        try {
            let  headers= {
                'Content-type': 'application/json; charset=UTF-8',
              }
            let response = await this.post(`${this.path_2}`,null,headers,data);
            return response;
        } catch (error) {
            return error;
        }
    }
    async updatePost(id){
        try {
            let response = await this.put(`${this.path_2}/${id}`);
            return response;
        } catch (error) {
            return error;
        }
    }
    async deletePost(id){
        try {
            let response = await this.delete(`${this.path}/${id}`);
            console.log("🚀 ~ file: Service.js ~ line 90 ~ Login ~ deletePost ~ response", response)
            return response;
        } catch (error) {
            return error;
        }
    }
}

let Service = new Login();
export default Service;