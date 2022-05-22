import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import cookie from "react-cookies";
import { getProfile, updateProfileHandler } from "../../store/users";
import { useNavigate } from "react-router-dom";
const Profile = (props) => {
  const navigate = useNavigate();
  const [update, setUpdate] = useState(false);

  const { usersData, getProfile, updateProfileHandler } = props;
  let [user, setUser] = useState();
  useEffect(() => {
    getProfile(
      Number(
        window.location.pathname.split("")[
          window.location.pathname.split("").length - 1
        ]
      )
    );
    setUser(usersData.user);
  }, []);
  useEffect(() => {
    setUser(usersData.user);
  }, [usersData.user]);
  useEffect(() => {
    if (cookie.load("loggedIn") === "false") {
      navigate("./P404");
    }
  }, [navigate]);

  const updateProfileHandle = (e, data) => {
    e.preventDefault();
    setUpdate(false);
    let newData = {
      name: e.target.name.value,
      username: e.target.username.value,
      email: e.target.email.value,
      phone: e.target.phone.value,
    };
    updateProfileHandler({ ...data, ...newData });
  };

  return (
    <>
      <div className="max-w-md p-8 sm:flex sm:space-x-6 dark:bg-gray-900 dark:text-gray-100 ">
        <div className="flex-shrink-0 w-full mb-6 h-44 sm:h-32 sm:w-32 sm:mb-0">
          <img
            src="https://source.unsplash.com/100x100/?portrait?1"
            alt=""
            className="object-cover object-center w-full h-full rounded dark:bg-gray-500"
          />
        </div>
        <div  className="flex flex-col space-y-4">
          <div>
            <h2 className="text-2xl font-semibold">{user && user.name}</h2>
            <span className="text-sm dark:text-gray-400">
              {user && user.username}
            </span>
          </div>
          <div className="space-y-1">
            <span className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                aria-label="Email address"
                className="w-4 h-4"
              >
                <path
                  fill="currentColor"
                  d="M274.6,25.623a32.006,32.006,0,0,0-37.2,0L16,183.766V496H496V183.766ZM464,402.693,339.97,322.96,464,226.492ZM256,51.662,454.429,193.4,311.434,304.615,256,268.979l-55.434,35.636L57.571,193.4ZM48,226.492,172.03,322.96,48,402.693ZM464,464H48V440.735L256,307.021,464,440.735Z"
                ></path>
              </svg>
              <span className="dark:text-gray-400">{user && user.email}</span>
            </span>
            <span className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                aria-label="Phonenumber"
                className="w-4 h-4"
              >
                <path
                  fill="currentColor"
                  d="M449.366,89.648l-.685-.428L362.088,46.559,268.625,171.176l43,57.337a88.529,88.529,0,0,1-83.115,83.114l-57.336-43L46.558,362.088l42.306,85.869.356.725.429.684a25.085,25.085,0,0,0,21.393,11.857h22.344A327.836,327.836,0,0,0,461.222,133.386V111.041A25.084,25.084,0,0,0,449.366,89.648Zm-20.144,43.738c0,163.125-132.712,295.837-295.836,295.837h-18.08L87,371.76l84.18-63.135,46.867,35.149h5.333a120.535,120.535,0,0,0,120.4-120.4v-5.333l-35.149-46.866L371.759,87l57.463,28.311Z"
                ></path>
              </svg>
              <span className="dark:text-gray-400">{user && user.phone}</span>
            </span>
          </div>
        </div>
        <button
          onClick={() => setUpdate(user)}
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

        {update ? (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                <div className="bg-red-400 border-0 rounded-lg shadow-lg relative flex flex-col w-full  outline-none focus:outline-none">
                  <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    <h3 className="text-3xl font-semibold">Update Profile</h3>
                    <button
                      className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => setUpdate(false)}
                    >
                      <span className="bg-red-500 text-white-200 "> X</span>
                    </button>
                  </div>

                  <form onSubmit={(e) => updateProfileHandle(e, user)}>
                    <div className="relative p-6 flex-auto bg-red flex flex-row">
                      <div>
                        <label className="text-sm text-red-200 p-5">Name</label>
                        <input
                          type="text"
                          id={user.id}
                          defaultValue={user.name}
                          name="name"
                          className="bg-red-200 border-2 border-rose-600 rounded-lg mb-5 ml-7"
                        ></input>
                        <label className="text-sm text-red-200 p-5">
                          UserName
                        </label>
                        <input
                          type="text"
                          defaultValue={user.username}
                          name="username"
                          className="bg-red-200 border-2 border-rose-600 rounded-lg "
                        ></input>
                      </div>

                      <div>
                        <label className="text-sm text-red-200 p-5">
                          Email
                        </label>
                        <input
                          type="text"
                          defaultValue={user.email}
                          name="email"
                          className="bg-red-200 border-2 border-rose-600 rounded-lg ml-1 "
                        ></input>

                        <label className="text-sm text-red-200 p-5">
                          Phone
                        </label>
                        <input
                          type="text"
                          defaultValue={user.phone}
                          name="phone"
                          className="bg-red-200 border-2 border-rose-600 rounded-lg mt-5 "
                        ></input>
                        <p className="my-4 text-slate-500 text-lg leading-relaxed text-red-200">
                          Are you sure want to update your profile ?
                        </p>
                      </div>
                    </div>
                    {/*footer*/}
                    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                      <button
                        className="text-red-200 background-transparent  uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setUpdate(false)}
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
                        <span>Update</span>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  usersData: state.users ? state.users : null,
});
const mapDispatchToProps = { getProfile, updateProfileHandler };
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
