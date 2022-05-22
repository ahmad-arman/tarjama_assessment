import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Error from "./component/error/error";
import Login from "./component/login/login";
import Header from "./component/header/header";
import Menu from "./component/main/main";
import Profile from "./component/profile/profile";
import Users from "./component/users/users";
import Posts from "./component/posts/posts";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={[<Login />]} />
          <Route path="*" element={[<Error />]} />
          <Route path="/main" element={[<Header />, <Menu />]} />
          <Route path="/profile/:id" element={[<Header />, <Profile />]} />
          <Route path="/users" element={[<Header />, <Users />]} />
          <Route path="/posts" element={[<Header />, <Posts />]} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
