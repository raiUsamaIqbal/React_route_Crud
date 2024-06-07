import "./App.css";
import React, { useState } from "react";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Login from './Components/Login';
// import Signup from "./Components/Signup";
import ModalCrud from "./Components/ModalCrud";
import './App.css'; // Create this CSS file for animation styles
import Footer from "./Components/Footer";
import {AppContext} from "./Context/AppContext"

function App() {
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('loggedin') ?? false)
  const [auth, setAuth] = useState(JSON.parse(localStorage.getItem('user') ??  null))
  return (
    <AppContext.Provider value={{ loggedIn, setLoggedIn, auth, setAuth }}>
      <BrowserRouter>
        {/* <Navbar /> Navbar is always rendered */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/model" element={<ModalCrud />} />
          {/* <Route path="/login" element={<Login />} /> */}
          {/* <Route path="/signup" element={<Signup />} /> */}
          <Route  element={<Footer />} />
        </Routes>

      </BrowserRouter>
      </AppContext.Provider>
  );
}

export default App;
