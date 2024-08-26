import './App.css';
import LandingView from './components/Landing/LandingView';
import Login from './components/Login/Login';
import UserView from './components/User/UserView';
import PageNotFound from './components/PageNotFound/PageNotFound';
import { BrowserRouter, Routes, Route, Navigate, useNavigate, } from 'react-router-dom';
import { activeUserAtom} from './state/Atoms';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { handleSession } from "./services/authConfig";
function App() {
  const [activeUser, setActiveUser] = useAtom(activeUserAtom);  //email of active user || null
  // const navigate = useNavigate();
  // useEffect(() => {
  //   const fetchUser = async () => {
  //     const user = await handleSession();
  //     if (user) {
  //       setActiveUser(user);
  //     } else {
  //       navigate("/");
  //     }
  //   };

  //   fetchUser();
  // }, []);
//useEffect gets called
//useEffect calls the activeUser endpoint in backend
//if response.ok send them somewhere (ative user=true)
//if not login
//activeUser endpoint returns either true or an error
//frontend then deals and redirects based on the response

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingView />} />
        <Route path="/login" element={activeUser ? <Navigate to={'/dashboard'} /> : <Login />} />
        <Route path="/dashboard" element={activeUser ?<UserView /> : <Navigate to={'/login'} />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
