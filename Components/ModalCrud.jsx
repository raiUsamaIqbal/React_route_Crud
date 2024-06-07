
import React, { useState, useEffect, memo, useContext } from 'react';
import InputFields from './InputFields';
import ModalOutput from './ModalOutput';
import Navbar from '../Components/Navbar'
import Swal from 'sweetalert2';
import Footer from './Footer';
import { AppContext } from '../Context/AppContext';


const ModalCrud = () => {
const {loggedIn} = useContext(AppContext)
const [isOpen, setIsOpen] = useState(false);
const [action, setAction] = useState('add');
const [edit, setEdit] = useState(null);


const onOpenModal = () => {
  if (loggedIn) {

    setIsOpen(true);
  } else {
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Please first login then add",
      showConfirmButton: false,
      timer: 2000
    });
  }
};


const onCloseModal = () => {
  setIsOpen(false);
  setError({});
  if (action === 'edit') {
    setForm({
      name: '',
      email: '',
      password: '',
      address: '',
      city: '',
      role: ''
    });
    setAction('add'); // add because when we cancel the edit then show update button in add model 
  }
};
   
  // inputs initialization for model of add , edit and delete 
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
    city: '',
    role:''
  });

  

  // Initialize data as an array from local storage
  const [data, setData] = useState(JSON.parse(localStorage.getItem('formData')) || []);
 const[error, setError] = useState({})

  // Save data to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('formData', JSON.stringify(data));
  }, [data]);

 
const handleSubmit = (e) => {
  e.preventDefault();
  
  // Form validation
  const ValidationErrors = {};
  if (!form.name.trim()) {
    ValidationErrors.name = "Name is required";
  }
  if (!form.email.trim()) {
    ValidationErrors.email = "Email is required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(form.email)) {
    ValidationErrors.email = "Invalid email address";
  }
  if (!form.password.trim()) {
    ValidationErrors.password = "Password is required";
  } else if (form.password.length < 6) {
    ValidationErrors.password = "Password should be at least 6 chara";
  }
  if (!form.address.trim()) {
    ValidationErrors.address = "Address is required";
  }
  if (!form.city.trim()) {
    ValidationErrors.city = "City is required";
  }

  if (!form.role.trim()) {
    ValidationErrors.role = "Role is required";
  }
  
  
  setError(ValidationErrors);

  if (Object.keys(ValidationErrors).length === 0) {
    // No validation errors, proceed with form submission
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Successfully Submit the form",
      showConfirmButton: false,
      timer: 1500
    });

    // Push the new form data to the data array
    setData([...data, form]);
    setForm({
      name: "",
      email: "",
      password: "",
      address: "",
      city: "",
      role:""
    });
    onCloseModal();
    setAction('add');
  } else {
    // Validation errors present, do not submit the form
     
  }
};



const handleDelete = (index) => {
  if (loggedIn) {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "confirm"
    }).then((result) => {
      if (result.isConfirmed) {
        // If user confirms, delete the item
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Successfully deleted the record",
          showConfirmButton: false,
          timer: 1500
        });
        let arr = [...data];
        arr.splice(index, 1);
        setData(arr);
      }
    });
  } else {
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Please first login then edit",
      showConfirmButton: false,
      timer: 2000
    });
  }
};


// edit the model fields value 
const editModal = (index) => {
  if (loggedIn) {
    setAction('edit');
    const selectedItem = data[index];
    setForm(selectedItem);
    setEdit(index);
    onOpenModal();
  } else {
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Please first login then edit",
      showConfirmButton: false,
      timer: 2000
    });

  }
};   


const update = () => {
  Swal.fire({
    position: "center",
    icon: "success",
    title: "Successfully Update the record",
    showConfirmButton: false,
    timer: 1500
  });
  const updatedData = [...data]; // Create a copy of the data array
  updatedData[edit] = form; // Update the specific user's data with the form data
  setData(updatedData); // Update the state with the updated data
  onCloseModal(); // Close the modal after updating
  setEdit(null); // Reset the edit state
  setAction('add'); // Reset the action state to 'add'
  setForm({ // Reset the form state
    name: '',
    email: '',
    password: '',
    address: '',
    city: '',
    role:''
  });
};

 const removeUser = (index) => {
    setData(prevData => {
      const newData = [...prevData];
      newData.splice(index, 1);
      return newData;
    });
  };
  
  return (
    <div>
      <Navbar  data = {data} setData = {setData} />
      
  <div className="container   my-5 d-flex justify-content-between" >
          <h1>User Management</h1>
        <button style= {{width:'100px',height:'40px'}} className='bg-dark text-white  rounded' onClick={onOpenModal}>
           Add
        </button>
      </div>
      {/* input  fields */}
  <InputFields 
  form={form}
  setForm={setForm}
  action={action}
  setAction={setAction}
  isOpen={isOpen}
  setIsOpen={setIsOpen}
  data={data}
  setData={setData}
  update={update}
  handleSubmit={handleSubmit}
  onCloseModal = {onCloseModal}
  error = {error}
  setError = {setError}
     />
     
      <ModalOutput 
      data = {data}
      editModal = {editModal}
      handleDelete = {handleDelete}
      handleRemoveUser={removeUser}
      />
      <Footer />
    </div>
  )
}

export default memo(ModalCrud);