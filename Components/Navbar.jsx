import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Swal from "sweetalert2";
import { AppContext } from "../Context/AppContext";


const Navbar = () => {
  const {loggedIn,setLoggedIn,auth, setAuth} = useContext(AppContext);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState({});
  const [isLogin, setIsLogin] = useState(true); // State to track whether it's login or signup

  const [input, setInput] = useState({
    email: "",
    password: "",
    name: "", // New field for signup
    city: "",
    address:"" // New field for signup
  });

  // Login functionality
  const handleLogin = (e) => {
    e.preventDefault();
  
    // Form validation
    const validationErrors = {};
    if (!input.email.trim()) {
      validationErrors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(input.email)) {
      validationErrors.email = "Invalid email address";
    }
    if (!input.password.trim()) {
      validationErrors.password = "Password is required";
    } else if (input.password.length < 6) {
      validationErrors.password = "Password should be at least 6 characters long";
    }
  
    setError(validationErrors);
  
    if (Object.keys(validationErrors).length === 0) {
      // Check if the email and password match any item in the data list
      const users = JSON.parse(localStorage.getItem("formData")) || [];
      const user = users.find(user => user.email === input.email && user.password === input.password);
   
      if (user) {
        localStorage.setItem("loggedin", true);
        localStorage.setItem("user", JSON.stringify(user));
        setLoggedIn(true)
        setAuth(user)
        setShowModal(false);
        navigate("/model");
        setInput({ email: "", password: "", name: "", city: "",address:"" }); 
  
        // Display SweetAlert for successful login
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });
        Toast.fire({
          icon: "success",
          title: "Login successful",
        });
      } else {
        setError({ email: "Invalid email or password" });
      }
    }
  };
  

  const handleSignup = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    
    // Form validation
    const validationErrors = {};
    if (!input.email.trim()) {
      validationErrors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(input.email)) {
      validationErrors.email = "Invalid email address";
    }
    if (!input.password.trim()) {
      validationErrors.password = "Password is required";
    } else if (input.password.length < 6) {
      validationErrors.password = "Password should be at least 6 characters long";
    }
    if (!input.name.trim()) {
      validationErrors.name = "Name is required";
    }
    if (!input.city.trim()) {
      validationErrors.city = "City is required";
    }
    if (!input.address.trim()) {
      validationErrors.address = "Address is required";
    }
    
    setError(validationErrors);
    
    // Check if any field is empty
    const isEmpty = Object.values(input).some(value => value.trim() === '');
    if (isEmpty) {
      return; // If any field is empty, return without signing up
    }
    
    // Check if the email is valid
    if (validationErrors.email) {
      return; // If email is invalid, return without signing up
    }
    
    // Check if the email already exists in local storage
    const existingUsers = JSON.parse(localStorage.getItem("formData")) || [];
    const existingUser = existingUsers.find(user => user.email === input.email);
    if (existingUser) {
      setError({ email: "This email is already registered. Please login instead." });
      return;
    }
    
    // If validation passes, proceed with signup
    const newUser = { email: input.email, password: input.password, name: input.name, city: input.city, address: input.address, role: "user" };
    const updatedUsers = [...existingUsers, newUser];
    localStorage.setItem("formData", JSON.stringify(updatedUsers)); // Save updated user array to local storage
    
    // Update loggedIn state and auth context
    setLoggedIn(true);
    setAuth(newUser);
    localStorage.setItem("loggedin", true);
    localStorage.setItem("user", JSON.stringify(newUser));
    
    // Reset input fields and close modal
    setInput({ email: "", password: "", name: "", city: "", address: "" });
    setShowModal(false);
    
    // Navigate to desired page
    navigate("/model");
    
    // Display success message
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
    Toast.fire({
      icon: "success",
      title: "Signed up successfully",
    });
  };
  

  const handleLogout = () => {
    localStorage.removeItem("loggedin");
    localStorage.removeItem("user");
    navigate("/model");
    setLoggedIn(false)
    setAuth(null)
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
    Toast.fire({
      icon: "success",
      title: "Logout successful",
    });
  };

  const handleLoginClick = () => {
    setIsLogin(true);
    setShowModal(true);
    setError({}); // Reset validation errors
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setError({}); // Reset validation errors
    setInput({ email: "", password: "", name: "", city: "", address: "" }); // Reset input fields
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          {loggedIn
            ? auth?.name
            : "Navbar"}
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/about">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/contact">
                Contact
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/model">
                Model
              </Link>
            </li>
          </ul>
          <div>
            {localStorage.getItem("loggedin") ? (
              <button
                type="button"
                onClick={handleLogout}
                className="btn btn-outline-primary"
              >
                Logout
              </button>
            ) : (
              <>
                <button
                  onClick={handleLoginClick}
                  className="btn btn-outline-success me-2"
                >
                  Login
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      {showModal && (
        <div
          className="modal fade show"
          style={{ display: "block" }}
          tabIndex="-1"
          role="dialog"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalToggleLabel">
                  {isLogin ? "Login" : "Sign Up"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCloseModal}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body p-0 m-0">
                <form action="">
                  <div className="container w-100  px-5 pb-4 m-auto mt-3 rounded">
                    <div className="row">
                      <div className="col-12">
                        <TextField
                          sx={{
                            width: 500,
                            maxWidth: "100%",
                          }}
                          placeholder="Email"
                          type="email"
                          size="small"
                          value={input.email}
                          onChange={(e) =>
                            setInput({ ...input, email: e.target.value })
                          }
                        />
                        <p className="text-danger">{error.email}</p>
                      </div>
                      <div className="col-12">
                        <TextField
                          sx={{
                            width: 500,
                            maxWidth: "100%",
                          }}
                          placeholder="Password"
                          type="password"
                          size="small"
                          value={input.password}
                          onChange={(e) =>
                            setInput({ ...input, password: e.target.value })
                          }
                        />
                        <p className="text-danger">{error.password}</p>
                      </div>
                      {!isLogin && (
                        <>
                          <div className="col-12 ">
                            <TextField
                              sx={{
                                width: 500,
                                maxWidth: "100%",
                              }}
                              placeholder="Name"
                              type="text"
                              size="small"
                              value={input.name}
                              onChange={(e) =>
                                setInput({ ...input, name: e.target.value })
                              }
                            />
                            <p className="text-danger">{error.name}</p>
                          </div>
                          <div className="col-12">
                            <TextField
                              sx={{
                                width: 500,
                                maxWidth: "100%",
                              }}
                              placeholder="City"
                              type="text"
                              size="small"
                              value={input.city}
                              onChange={(e) =>
                                setInput({ ...input, city: e.target.value })
                              }
                            />
                            <p className="text-danger">{error.city}</p>
                           <div className="col-12">
                           <TextField
                              sx={{
                                width: 500,
                                maxWidth: "100%",
                              }}
                              placeholder="Address"
                              type="text"
                              size="small"
                              value={input.address}
                              onChange={(e) =>
                                setInput({ ...input, address: e.target.value })
                              }
                            />
                                 <p className="text-danger">{error.address}</p>
                           </div>
                          </div>
                        </>
                      )}
                    </div>
                    <button
                      type="submit"
                      onClick={isLogin ? handleLogin : handleSignup}
                      className="btn btn-primary mt-3"
                    >
                      {isLogin ? "Login" : "Sign Up"}
                    </button>

                    {isLogin && (
                      <p className="mt-3">
                        Don't have an account?{" "}
                        <span
                          style={{ color: "blue", textDecoration: "underline" }}
                          onClick={() => {
                            setIsLogin(false);
                            setError({}); // Reset validation errors when switching to signup mode
                          }}
                        >
                          Sign Up
                        </span>
                      </p>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
