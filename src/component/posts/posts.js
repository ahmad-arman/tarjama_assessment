import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { postHandler, addPostHandler,removePostHandler } from "../../store/users";
const Posts = (props) => {
  let [comments, setComment] = useState([]);
  let [posts, setPosts] = useState([]);
  let [users, setUsers] = useState([]);
  const { postData, postHandler, addPostHandler,removePostHandler } = props;
  useEffect(() => {
      postHandler();
    }, []);
    useEffect(() => {
        setComment(postData.comments);
        setPosts(postData.posts);
        setUsers(postData.users);
    }, [postData.comments, postData.posts, postData.users]);
    
    
  const addPostHandle = (e) => {
    e.preventDefault();
    addPostHandler(
      JSON.stringify({
        title:e.target.title.value ,
        body: e.target.body.value,
        userId: 1,
      })
    );
  };
  const updatePostHandle = (e) => {
    e.preventDefault();
    // updatePostHandler(e.target.id)
    // let filter = posts.filter(post => post.id !== Number(e.target.id));
    // console.log("🚀 ~ file: posts.js ~ line 37 ~ removePostHandle ~ filter", filter)
    // setPosts(filter);
  };
  const removePostHandle = (e) => {
    e.preventDefault();
    removePostHandler(e.target.id)
    console.log("🚀 ~ file: posts.js ~ line 39 ~ removePostHandle ~ e.target.id", e.target.id)
    let filter = posts.filter(post => post.id !== Number(e.target.id));
    console.log("🚀 ~ file: posts.js ~ line 37 ~ removePostHandle ~ filter", filter)
    setPosts(filter);
  };
  return (
    <>
      <div className="grid grid-cols-3 gap-4 bg-slate-200	">
        {/* <div className="bg-slate-200" > */}
        <section className="p-6 dark:bg-gray-800 dark:text-gray-50 bg-slate-200">
          <form
            onSubmit={addPostHandle}
            className=" container flex flex-col mx-auto space-y-12 ng-untouched ng-pristine ng-valid"
          >
            <fieldset className="bg-slate-100 grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm dark:bg-gray-900">
              <div className="space-y-2 col-span-full lg:col-span-1 ">
                <p className="font-medium">Add Post</p>
              </div>
              <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                <div className="col-span-full sm:col-span-3">
                  <label className="text-sm">Title</label>
                  <input
                    id="title"
                    type="text"
                    placeholder="title"
                    className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 dark:border-gray-700 dark:text-gray-900"
                  />
                </div>
                <div className="col-span-full">
                  <label className="text-sm">Body</label>
                  <textarea
                    id="body"
                    placeholder={`What's on your mind, ?`}
                    className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 dark:border-gray-700 dark:text-gray-900"
                  ></textarea>
                </div>
              </div>

             
            </fieldset>
            <button
              type="submit"
              className="items-center bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            >
              Post
            </button>
          </form>
        </section>
        {/* </div>     */}

        {posts &&
          posts.map((post) => (
            <>
              <div
                key={post.id}
                className="bg-slate-100 max-w-lg p-4 m-4 space-y-6 overflow-hidden rounded-lg shadow-md dark:bg-gray-900 dark:text-gray-100"
              >
                <div>
                  
                <div className="flex space-x-2 text-sm dark:text-gray-400">
                <button
                type="button"
                className="flex items-center p-1 space-x-1.5"
                >
                <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                aria-label="Number of comments"
                className="w-4 h-4 fill-current dark:text-violet-400"
                >
                
                </svg>
                <span>update</span>
                </button>
                <button onClick={removePostHandle}
                type="button"
                className="flex items-center p-1 space-x-1.5"
               
                >
                <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                aria-label="Number of likes"
                className="w-4 h-4 fill-current dark:text-violet-400"
                >
                
                </svg>
                <span  id={post.id} value={post.id}>X</span>
                </button>
                </div>
                  <div className="flex space-x-4">
                    <img
                      alt=""
                      src="https://source.unsplash.com/100x100/?portrait"
                      className="object-cover w-12 h-12 rounded-full shadow dark:bg-gray-500"
                    />
                    <div className="flex flex-col space-y-1">
                      <h2 className="text-sm font-semibold">{post.title}</h2>
                    </div>
                  </div>
                  
                  <div key={post.id}>
                    <p className="text-sm dark:text-gray-400">{post.body}</p>
                  </div>

                  <div className="">
                    <h4 className="text-sm font-semibold pt-2 pb-0">
                      Comments(
                      {comments &&
                        comments.filter((comment) => comment.postId === post.id)
                          .length}
                      )
                    </h4>
                    {comments &&
                      comments
                        .filter((comment) => comment.postId === post.id)
                        .map((comment) => (
                          <>
                            <div key={comment.postId}>
                              <ul className="list-none pl-0.5" key={comment.id}>
                                <li className="dark:bg-gray-800 dark:text-gray-50 p-2 space-x-4 border">
                                  <h2 className="text-sm font-semibold">
                                    {comment.name}
                                  </h2>
                                  <p> {comment.body}</p>
                                </li>
                              </ul>
                            </div>
                          </>
                        ))}
                  </div>
                   <div className="flex flex-wrap justify-between">
                 <div className="space-x-2">
               
                </div> 
                
            </div> 
                </div>
              </div>
            </>
          ))}
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  postData: state.users ? state.users : null,
});
const mapDispatchToProps = { postHandler, addPostHandler,removePostHandler };
export default connect(mapStateToProps, mapDispatchToProps)(Posts);
