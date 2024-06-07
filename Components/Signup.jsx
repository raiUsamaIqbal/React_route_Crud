// import React,{useState} from 'react'
// import TextField from "@mui/material/TextField";
// import {useNavigate} from "react-router-dom";


// const Signup = () => {
//   const navigate = useNavigate();
//   const [input, setInput] = useState({
//     name:'',
//     email: '',
//     password: '',
//     address: ''
//   });

//    // to store the value in local storage 
//    const handleSignUp = (e) =>{
//     e.preventDefault();
//     console.log("submitted")
//     localStorage.setItem("user", JSON.stringify(input));  // we do not store the object in local storage
//     navigate("/model") 
//    }
//   return (
//     <div>
   
//    <form action="">
//         <div className="container w-25 pt-5 bg-light rounded p-3 m-auto mt-5" >
//           <div className="row">
//             <div className="col-12 mb-3">
//               <TextField
//                 sx={{
//                   width: 500,
//                   maxWidth: "100%",
//                 }}
//                 value={input.name}
//                 placeholder="Name"
//                 type="text"
//                 size="small"
//                 onChange={(e) => setInput({ ...input, name: e.target.value })}
//               />
//             </div>
//             <div class="col-12 mb-3">
//           <TextField
//             sx={{
//               width: 500,
//               maxWidth: "100%",
//             }}
//             placeholder="Email"
//             type="email"
//             size="small"
//             value={input.email}
//             onChange={(e) => setInput({ ...input, email: e.target.value })}
//           />
//         </div>
//         <div class="col-12 mb-3">
//           <TextField
//             sx={{
//               width: 500,
//               maxWidth: "100%",
//             }}
//             placeholder="Password"
//             type="Password"
//             size="small"
//             value={input.password}
//             onChange={(e) => setInput({ ...input, password: e.target.value })}
//           />
//         </div>
//         <div class="col-12 mb-3">
//           <TextField
//             sx={{
//               width: 500,
//               maxWidth: "100%",
//             }}
//             placeholder="Address"
//             type="text"
//             size="small"
//             value={input.address}
//             onChange={(e) => setInput({ ...input, address: e.target.value })}
//           />
//         </div>
      
//           </div>
          
//           <button type="submit" onClick={handleSignUp}  class="btn btn-primary w-100 my-2">Sign Up</button>
//           <p>Already have an Account <span>  </span></p>
//         </div>
//       </form>
 



 



//     </div>
//   )
// }

// export default Signup
