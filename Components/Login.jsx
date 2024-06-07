// import React,{useState} from "react";
// import TextField from "@mui/material/TextField";
// import {useNavigate} from "react-router-dom";
// import {Link} from "react-router-dom"
// import Swal from 'sweetalert2';


// const Login = () => {
//   // create object of navigate 
//   const navigate = useNavigate();
//   const [input, setInput] = useState({
//     email: '',
//     password: '',
//   });
//   // to store the value in local storage 
//   const handleLogin = (e) =>{
//     Swal.fire({
//       text: "Successfully logined",
//       icon: "success",
//       showConfirmButton: false
//     });
//    e.preventDefault();
//    const loggedUser  = JSON.parse(localStorage.getItem("user"));   //create object json.parse
//    if(input.email === loggedUser.email  && input.password ===loggedUser.password ){
//     localStorage.setItem("loggedin", true);
//     navigate("/logi")
//    }else
//    Swal.fire({
//     text: "Please Add correct the Email and Password",
//     icon: "success",
//     showConfirmButton: false
//   });
//   }
//   return (
//     <div>



// <div class="modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabindex="-1">
//   <div class="modal-dialog modal-dialog-centered">
//     <div class="modal-content">
//       <div class="modal-header">
//         <h5 class="modal-title" id="exampleModalToggleLabel">Modal 1</h5>
//         <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//       </div>
//       <div class="modal-body">
      
//       </div>

//     </div>
//   </div>
// </div>


         
      
 
//     </div>
//   );
// };

// export default Login;
