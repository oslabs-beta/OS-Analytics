import "./App.css";
import Landing from "./components/Landing/Landing";
import Login from "./components/Login/Login";
import UserView from "./components/User/UserView";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  Navigate,
} from "react-router-dom";
import { activeUserAtom } from "./state/Atoms";
import { useAtom } from "jotai";
import { useState, useEffect } from "react";
import axios from "axios";
import { handleSession } from "./services/authConfig";

function App() {
  const [activeUser, setActiveUser] = useAtom(activeUserAtom);
   //email of active user || null
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUser = async () => {
      const user = await handleSession();
      if (user) {
        setActiveUser(user);
      } else {
        navigate("/");
      }
    };

    fetchUser();
  }, []);

  //useEffect gets called
  //useEffect calls the activeUser endpoint in backend
  //if response.ok send them somewhere (ative user=true)
  //if not login
  //activeUser endpoint returns either true or an error
  //frontend then deals and redirects based on the response

  function handleServer() {
    const URL: string = "http://localhost:8080/api";
    fetch(URL)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  }

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route
        path="/login"
        element={activeUser ? <Navigate to={"/dashboard"} /> : <Login />}
      />
      <Route path="/dashboard" element={<UserView />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
