import './App.css';
import Landing from './components/Landing/Landing';
import Login from './components/Login/Login';
import UserView from './components/User/UserView';
import PageNotFound from './components/PageNotFound/PageNotFound';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { activeUserAtom} from './state/Atoms';
import { useAtom } from 'jotai';

function App() {
  const [activeUser] = useAtom(activeUserAtom);  //email of active user || null
//useEffect gets called
//useEffect calls the activeUser endpoint in backend
//if response.ok send them somewhere (ative user=true)
//if not login
//activeUser endpoint returns either true or an error
//frontend then deals and redirects based on the response

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
        <Route path="/login" element={activeUser ? <Navigate to={'/dashboard'} /> : <Login />} />
        <Route path="/dashboard" element={activeUser ?<UserView /> : <Navigate to={'/login'} />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
