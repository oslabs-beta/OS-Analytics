import LandingView from './components/Landing/LandingView';
import Login from './components/Login/Login';
import UserView from './components/User/UserView';
import PageNotFound from './components/PageNotFound/PageNotFound';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { activeUserAtom } from './state/Atoms';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { handleSession } from "./services/authConfig";
import Signup from './components/Login/Signup';
import Documentation from './components/Documentation/Documentation';
import Settings from './components/Settings/Settings';
import ForgotPassword from './components/User/ForgotPassword';
import PlaygroundDisplay from './components/Playground/playgroundDisplay';


function App() {
  const [activeUser, setActiveUser] = useAtom(activeUserAtom); //email of active user || null
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await handleSession();
      if (user) {
        setActiveUser(user);
      }
      setLoading(false);
    };

    fetchUser(); 
  }, []);

  if (loading) return;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingView />} />
        <Route 
          path="/login" 
          element={activeUser ? <Navigate to={window.location.pathname !== '/login' ? window.location.pathname : '/dashboard/overview'} /> : <Login />} 
        />
        <Route path="/signup" element={activeUser ? <Navigate to={window.location.pathname !== '/signup' ? window.location.pathname : '/dashboard/overview'} /> : <Signup />} />
        <Route path="/dashboard" element={activeUser ? <Navigate to="/dashboard/overview" /> : <Navigate to="/login" />} />
        <Route path="/dashboard/:id" element={activeUser ? <UserView /> : <Navigate to="/login" />} />
        <Route path="/docs" element={<Documentation />} />
        <Route path="/settings" element={activeUser ? <Settings /> : <Navigate to="/login" />} />
        <Route path="/playground" element={activeUser ? <PlaygroundDisplay /> : <Navigate to="/login" />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
