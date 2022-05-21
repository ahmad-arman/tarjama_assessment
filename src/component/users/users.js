import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { loginHandler } from "../../store/users";

const Users = (props) => {
  let [users, setUsers] = useState();
  let [posts, setPosts] = useState();
  let [albums, setAlbums] = useState();
  const { usersData, loginHandler } = props;
  
  useEffect(() => {
    loginHandler();
    
  }, []);
  useEffect(() => {
    
    setUsers(usersData.users);
    setPosts(usersData.posts);
    setAlbums(usersData.albums);
  }, [usersData]);
  
  
  console.log("🚀 ~ file: users.js ~ line 10 ~ Users ~ usersData", users,posts)
  return (
      <>
  <div className="h-full p-3 space-y-2  dark:bg-gray-900 dark:text-gray-100">
       {users? users.map((user)=>(
             
             <div key={user.id} className=" grid grid-cols-2.5 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 h-full p-3 space-y-2  dark:bg-gray-900 dark:text-gray-100 border ">
               
             <div className="flex items-center p-2 space-x-4">
               <div>
                 <h2 className="text-lg font-semibold w-40 ">{user.name}</h2>
                 {/* <span className="flex items-center space-x-1">
                   <a rel="noopener noreferrer" href="/profile" className="text-xs hover:underline dark:text-gray-400">View profile</a>
                 </span> */}
               </div>
             </div>
             <div className="divide-y divide-gray-700">
               <ul className="pt-2 pb-4 space-y-1 text-sm ml-20">
                 <li className="dark:bg-gray-800 dark:text-gray-50  ">
                     
                     <span>Albums({albums.filter(p =>p.userId ===user.id ).length})</span>
                  
                   
                 </li>
                 <li>
                 
                     <span>Posts({posts.filter(p =>p.userId ===user.id ).length} )</span>
                 
                 </li>
                 
               
               </ul>
             
             </div>
           </div>
              
              )):'ahmad'} 
     
          </div>
          
    </>
  );
};

const mapStateToProps = (state) => ({
  usersData: state.users ? state.users : null,
});
const mapDispatchToProps = { loginHandler };
export default connect(mapStateToProps, mapDispatchToProps)(Users);
