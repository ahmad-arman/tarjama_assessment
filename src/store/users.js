import { createSlice } from "@reduxjs/toolkit";
import cookie from 'react-cookies';
import Service from "../services/Service";
cookie.load('post');
let login = createSlice({
    name:'login',
    initialState:{
        user:{},users:[],posts:[],albums:[],comments:[]
    },
    reducers:{
     getAll(state,action){
            return {...state,...action.payload}
               
    },
     getAllCommits(state,action){
        return {...state.data,...action.payload}
    }  
}
})

export const loginHandler =(payload) => async (dispatch,state) => {
    try {
        let data = await Service.login();
        let data2 =await Service.getAllPosts();
        let data3 =await Service.getAllAlbums();
        
        dispatch(getAll({users:Object.values(data),posts:Object.values(data2),albums:Object.values(data3)}))
    } catch (error) {
        dispatch(getAllUsers({message:error.message}))
    }
}
export const postHandler =(payload)  =>async(dispatch,state)=>{
    try {
        let data = await Service.login();
        let data2 =await Service.getAllPosts();
       let data3 = await Service.getAllComments();

       dispatch(getAll({users:data,posts:data2,comments:data3})) 
    } catch (error) {
        dispatch(getAllUsers({message:error.message}))

    }
}
export const addPostHandler =(payload)  => async (dispatch,state)=>{
    try {
        let data =await Service.addPost(payload);
       
        cookie.save("post",data);
        let addPost = cookie.load("post");
        let newData = {posts:[addPost,...state().users.posts],comments:[...state().users.comments],};
          dispatch(getAll(newData))
          cookie.remove("post");

    } catch (error) {
        dispatch(getAll({message:error.message}))
    }
}
export const removePostHandler =(payload)  => async (dispatch,state)=>{
    try {
        let data =await Service.deletePost(payload);
        console.log("🚀 ~ file: users.js ~ line 60 ~ removePostHandler ~ data", data)
       
       
        // let newData = {posts:[data,...state().users.posts],comments:[...state().users.comments],};
        //   dispatch(getAll(newData))

    } catch (error) {
        dispatch(getAll({message:error.message}))
    }
}

export default login.reducer
export const{getAllUsers,getAll}=login.actions