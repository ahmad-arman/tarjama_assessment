import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import cookie from "react-cookies";
import { useNavigate } from "react-router-dom";

import {
  postHandler,
  addPostHandler,
  removePostHandler,
  updatePostHandler,
} from "../../store/users";
const Posts = (props) => {
  const navigate = useNavigate();
  let [comments, setComment] = useState([]);
  let [posts, setPosts] = useState([]);
  let [users, setUsers] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [update, setUpdate] = useState();
  const {
    postData,
    postHandler,
    addPostHandler,
    removePostHandler,
    updatePostHandler,
  } = props;
  useEffect(() => {
    postHandler();
  }, []);
  useEffect(() => {
    setComment(postData.comments);
    setPosts(postData.posts);
    setUsers(postData.users);
  }, [postData.comments, postData.posts, postData.users]);

  useEffect(() => {
    if (cookie.load("loggedIn") === "false") {
      navigate("./P404");
    }
  }, [navigate]);

  const addPostHandle = (e) => {
    e.preventDefault();
    addPostHandler(
      JSON.stringify({
        title: e.target.title.value,
        body: e.target.body.value,
        userId: 1,
      })
    );
  };

  const updatePostHandle = (e, data) => {
    e.preventDefault();
    updatePostHandler({
      id: data.id,
      userId: data.userId,
      title: e.target.title.value,
      body: e.target.body.value,
    });
    setUpdate(null);
  };
  const removePostHandle = (id) => {
    setShowModal(null);
    removePostHandler(id);
  };
  return (
    <>
      <div className="grid grid-cols-3 gap-4 bg-slate-200	">
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

        {posts &&
          posts.map((post, index) => (
            <>
              <div
                key={post.id + index}
                className="bg-slate-100 max-w-lg p-4 m-4 space-y-6 overflow-hidden rounded-lg shadow-md dark:bg-gray-900 dark:text-gray-100"
              >
                {cookie.load("user") &&
                cookie.load("user")[0].id === post.userId ? (
                  <>
                    <div className="flex space-x-2 text-sm dark:text-gray-400">
                      <button
                        onClick={() => setUpdate(post.id)}
                        type="button"
                        className="flex items-center p-1 space-x-1.5"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                          aria-label="Number of comments"
                          className="w-4 h-4 fill-current dark:text-violet-400"
                        ></svg>
                        <span>update</span>
                      </button>

                      <button
                        className="flex items-center p-1 space-x-1.5"
                        type="button"
                        onClick={() => setShowModal(post.id)}
                      >
                        X
                      </button>
                      {update === post.id ? (
                        <>
                          <div
                            id={post.id}
                            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                          >
                            <div className="relative w-auto my-6 mx-auto max-w-3xl">
                              {/*content*/}
                              <div className="bg-red-400 border-0 rounded-lg shadow-lg relative flex flex-col w-full  outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                  <h3 className="text-3xl font-semibold text-red-200">
                                    Update Post
                                  </h3>
                                  <button
                                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                    onClick={() => setUpdate(null)}
                                  >
                                    <span className="bg-red-500 text-white-200 ">
                                      X
                                    </span>
                                  </button>
                                </div>
                                {/*body*/}
                                <form
                                  onSubmit={(e) => updatePostHandle(e, post)}
                                >
                                  <div className="relative p-6 flex-auto bg-red">
                                    <label className="text-sm text-red-200 p-5">Title</label>
                                    <input
                                      type="text"
                                      id={post.id}
                                      defaultValue={post.title}
                                      name="title"
                                      className="bg-red-200 border-2 border-rose-600 rounded-lg"
                                    ></input>
                                    <label className="text-sm text-red-200 p-5">Body</label>
                                    <input
                                      type="text"
                                      defaultValue={post.body}
                                      name="body"
                                      className="bg-red-200 border-2 border-rose-600 rounded-lg"
                                    ></input>
                                    <p className="my-4 text-slate-500 text-lg leading-relaxed text-red-200">
                                      Are you sure want to update this post ?
                                    </p>
                                  </div>
                                  {/*footer*/}
                                  <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                    <button
                                      className="text-red-200 background-transparent  uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                      type="button"
                                      onClick={() => setUpdate(null)}
                                    >
                                      Close
                                    </button>

                                    <button
                                      type="submit"
                                      className="flex items-center p-1 space-x-1.5  text-red-100"
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 512 512"
                                        aria-label="Number of likes"
                                        className="w-4 h-4 fill-current text-red-200 uppercase"
                                      ></svg>
                                      <span id={post.id} value={post.id}>
                                        UPDATE
                                      </span>
                                    </button>
                                  </div>
                                </form>
                              </div>
                            </div>
                          </div>
                          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                        </>
                      ) : null}
                      {showModal === post.id ? (
                        <>
                          <div
                            id={post.id}
                            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                          >
                            <div className="relative w-auto my-6 mx-auto max-w-3xl">
                              {/*content*/}
                              <div className="bg-red-400 border-0 rounded-lg shadow-lg relative flex flex-col w-full  outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                  <h3 className="text-3xl font-semibold text-red-200">
                                    Delete Post
                                  </h3>
                                  <button
                                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                    onClick={() => setShowModal(null)}
                                  >
                                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                      ×
                                    </span>
                                  </button>
                                </div>
                                {/*body*/}
                                <div className="relative p-6 flex-auto">
                                  <p className="my-4 text-slate-500 text-lg leading-relaxed text-red-200">
                                    Are you sure want to delete this post ?
                                  </p>
                                </div>
                                {/*footer*/}
                                <div className="  flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                  <button
                                    className=" background-transparent uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 text-red-200 text-sm"
                                    type="button"
                                    onClick={() => setShowModal(null)}
                                  >
                                    Close
                                  </button>

                                  <button
                                    onClick={() => removePostHandle(post.id)}
                                    type="button"
                                    className="flex items-center p-1 space-x-1.5  text-red-100"
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 512 512"
                                      aria-label="Number of likes"
                                      className="w-4 h-4 fill-current text-red-200 text-sm "
                                    ></svg>
                                    <span id={post.id} value={post.id}>
                                      DELETE
                                    </span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                        </>
                      ) : null}
                    </div>
                  </>
                ) : null}
                <div>
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
                    <div className="space-x-2"></div>
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
const mapDispatchToProps = {
  postHandler,
  addPostHandler,
  removePostHandler,
  updatePostHandler,
};
export default connect(mapStateToProps, mapDispatchToProps)(Posts);
