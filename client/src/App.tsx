import "./App.css";
import Landing from "./components/Landing/Landing";
import Login from "./components/Login/Login";
import UserView from "./components/User/UserView";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { activeUserAtom } from "./state/Atoms";
import { useAtom } from "jotai";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [activeUser, setActiveUser] = useAtom(activeUserAtom); //email of active user || null


  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get("/api/auth/activeUser");
        console.log(response);
        if (response.status === 200) {
   
          setActiveUser(response.data.email);
        } else {
        
          setActiveUser('');
        }
      } catch (err) {
        console.log("hit");

      }
    };
    checkAuth();
  }, [activeUser]);

  console.log(activeUser);
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
  console.log(activeUser);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route
          path="/login"
          element={activeUser ? <Navigate to={"/dashboard"} /> : <Login />}
        />
        <Route
          path="/dashboard"
          element={activeUser ? <UserView /> : <Navigate to={"/login"} />}
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
