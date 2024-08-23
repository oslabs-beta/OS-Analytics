import './App.css';
import Landing from './components/Landing/Landing';
import Login from './components/Login/Login';
import User from './components/User/UserView'
import Loading from './components/Loading/Loading';
import PageNotFound from './components/PageNotFound/PageNotFound'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  function handleServer() {
    const URL = 'http://localhost:8080/api';
    fetch(URL)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user/eric" element={<User />} />
        <Route path = "/loading" element ={<Loading/>}/>
        <Route path = "*" element = {<PageNotFound/>}/>
      </Routes>
    </BrowserRouter>
 
  );
}

export default App;
