import React from 'react'
import { useState , useEffect } from 'react';
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";



export default function Login() {
    const [email, setEmail] = useState('') // useState to store Email address of the user
    const [password, setPassword] = useState('') // useState to store Password
    const [errors, setErrors] = useState('') 
    const navigate = useNavigate();
   
      
   useEffect(() => {
    if ( localStorage.getItem('access_token')) {
        
        navigate('/home')
      }
   }, []);
  
    const handleSubmit = (e) => {
      e.preventDefault();
      let errorsObject = {};

      if (email === '') {
          errorsObject.email = 'Email is required';
      }
      if (password === '') {
          errorsObject.password = 'Password is required';
      }

      setErrors(errorsObject);

            if (Object.keys(errorsObject).length === 0) {
        fetch('http://127.0.0.1:8000/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: email,
            password: password
          })
        })
       .then(res => res.json())
       .then(data => {
          console.log(data.access_token)
          localStorage.setItem('access_token', data.access_token);
            navigate("/home");
        
        })
       .catch(err => console.log(err))
      }
  
  };
  
    console.log(errors)

    return (
      <form onSubmit={handleSubmit} className=' container  mt-5 pt-5 w-50  m-auto   '>
 
      <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e) => setEmail(e.target.value)}/>
          {errors.email && (
                    
                    <div id="emailHelp" className="form-text text-danger">{errors.email}</div>

                )}    
        </div>
      <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1"  onChange={(e) => setPassword(e.target.value)} />
          {errors.password && (
                    
                    <div id="emailHelp" className="form-text text-danger">{errors.password}</div>

                )}
      </div>
 

      <button type="submit" className="btn btn-primary">Submit</button>
      </form>

    )


}
