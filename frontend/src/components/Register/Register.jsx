import React from 'react'
import { useState ,useEffect } from 'react'
import './Register.css'
import { useNavigate } from "react-router-dom";

import Swal from 'sweetalert2'




export default function Register() {
    const [firstName, setFirstName] = useState('') // useState to store First Name
    const [email, setEmail] = useState('') // useState to store Email address of the user
    const [password, setPassword] = useState('') // useState to store Password
    const [passwordConfirmation, setpasswordConfirmation] = useState('') 
    const [errors, setErrors] = useState('') 
    const navigate = useNavigate();


    useEffect(() => {
      if ( localStorage.getItem('access_token')) {
          
          navigate('/Home')
        }
     }, []);

    const handleSubmit = (e) => {
      e.preventDefault();
      let errorsObject = {};

      if (password !== passwordConfirmation) {
          errorsObject.passwordConfirmation = 'Passwords do not match';
      }
      if (firstName === '') {
          errorsObject.firstName = 'First Name is required';
      }
      if (email === '') {
          errorsObject.email = 'Email is required';
      }
      if (password === '') {
          errorsObject.password = 'Password is required';
      }

      setErrors(errorsObject);

            if (Object.keys(errorsObject).length === 0) {
        fetch('http://127.0.0.1:8000/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: firstName,
            email: email,
            password: password
          })
        })
       .then(res => res.json())
       .then(data => {
            // console.log(data.access_token.access_token )
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Your work has been saved",
              showConfirmButton: false,
              timer: 1500
            });
        })
       .catch(err => console.log(err))
      }
  
  };
  

    return (
      <form onSubmit={handleSubmit} className=' container  mt-5 pt-5 w-50  m-auto   '>
      <div className="mb-3">
          <label htmlFor="exampleInputtext" className="form-label">name address</label>
          <input type='text' className="form-control" id="exampleInputtext" aria-describedby="emailHelp" onChange={(e) => setFirstName(e.target.value)}/>
          {errors.firstName && (
                    
                    <div id="emailHelp" className="form-text text-danger">{errors.firstName}</div>

                )}
      </div>
      <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e) => setEmail(e.target.value)}/>
          {errors.email && (
                    
                    <div id="emailHelp" className="form-text text-danger">{errors.email}</div>

                )}      </div>
      <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1"  onChange={(e) => setPassword(e.target.value)} />
          {errors.password && (
                    
                    <div id="emailHelp" className="form-text text-danger">{errors.password}</div>

                )}
      </div>
      <div className="mb-3">
          <label htmlFor="Passwordconfirmation" className="form-label">Password confirmation </label>
          <input type="password" className="form-control" id="Passwordconfirmation"   onChange={(e) => setpasswordConfirmation(e.target.value)} />
          {errors.passwordConfirmation && (
                    
                    <div id="emailHelp" className="form-text text-danger">{errors.passwordConfirmation}</div>

                )}
      </div>

      <button type="submit" className="btn btn-primary">Submit</button>
      </form>


       
      )
}
