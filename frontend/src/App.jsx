import React, { useEffect } from "react";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import { useContext } from "react";
import { UserContext } from "./context/UserContext";
import api from "@/lib/api";
import { Group } from "lucide-react";
import Groups from "./pages/Groups";
import Dashboard from "./pages/Dashboard";
import GroupDetails from "./pages/GroupDetails";

const App = () => {
  const { setUser, setIsLogin } = useContext(UserContext);

  useEffect(() => {
    api
      .get("/api/user/me")
      .then((res) => {
        if (res.data.success) {
          setUser(res.data.user);
          setIsLogin(true);
        } else {
          setUser(null);
          setIsLogin(false);
        }
      })
      .catch(() => {
        setUser(null);
        setIsLogin(false);
      });
  }, []);

  return (
    <div className="roboto-100">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/groups" element={<Groups />} />
        <Route path="/group/:id" element={<GroupDetails />} />
      </Routes>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default App;
