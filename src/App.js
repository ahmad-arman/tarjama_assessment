import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes,Route} from 'react-router-dom'
import Menu from './component/menu/menu';
import Users from './component/users/users';
import Posts from './component/posts/posts';
function App() {
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <h1 className="text-3xl font-bold underline">
    //   Hello world!
    // </h1>

    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
    <> 
    <BrowserRouter>   
    <Routes> 
       
    <Route  path="/" element={<Menu /> } />
    <Route  path="/users" element={<Users /> } />
    <Route  path="/posts" element={<Posts /> } />
      
    </Routes>
     </BrowserRouter>
    </>
  );
}

export default App;
