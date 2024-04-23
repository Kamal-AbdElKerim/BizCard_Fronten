import React, { useState , useEffect } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";

export default function CreateCard({ setIsCrrated }) {
  const [Name, setName] = useState('') 
  const [Company, setCompany] = useState('') 
  const [Title, setTitle] = useState('') 
  const [errors, setErrors] = useState('') 
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  useEffect(() => {
    if ( localStorage.getItem('access_token')) {
      navigate('/Home')
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    let errorsObject = {};

    if (Name === '') {
      errorsObject.Name = 'Name is required';
    }
    if (Company === '') {
      errorsObject.Company = 'Company is required';
    }
    if (Title === '') {
      errorsObject.Title = 'Title is required';
    }

    setErrors(errorsObject);

    if (Object.keys(errorsObject).length === 0) {
      setLoading(true); // Set loading to true when submitting

      fetch('http://127.0.0.1:8000/api/createBusinessCard', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        },
        body: JSON.stringify({
          name: Name,
          company: Company,
          title: Title
        })
      })
      .then(res => res.json())
      .then(data => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Card has been saved",
          showConfirmButton: false,
          timer: 1500
        });
        setIsCrrated(prevState => !prevState);

        setName('');
        setCompany('');
        setTitle('');
        setLoading(false); // Set loading to false after the card is added
      })
      .catch(err => {
        console.log(err);
        setLoading(false); // Set loading to false in case of an error
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className='w-50 mt-4 pb-3'>
      <div className="mb-3">
        <label htmlFor="exampleInputName" className="form-label">Name</label>
        <input type="text" className="form-control" id="exampleInputName" aria-describedby="emailHelp" value={Name} onChange={(e) => setName(e.target.value)} />
        {errors.Name && (
          <div id="emailHelp" className="form-text text-danger">{errors.Name}</div>
        )}    
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputCompany" className="form-label">Company</label>
        <input type="text" className="form-control" id="exampleInputCompany" value={Company}  onChange={(e) => setCompany(e.target.value)} />
        {errors.Company && (
          <div id="emailHelp" className="form-text text-danger">{errors.Company}</div>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputtitle" className="form-label">Title</label>
        <input type="text" className="form-control" id="exampleInputtitle" aria-describedby="emailHelp" value={Title} onChange={(e) => setTitle(e.target.value)} />
        {errors.Title && (
          <div id="emailHelp" className="form-text text-danger">{errors.Title}</div>
        )}    
      </div>
      {loading ? (
       <button class="btn btn-primary" type="button" disabled>
       <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
       <span role="status"> Loading...</span>
     </button>
      ) : (
        <button type="submit" className="btn btn-primary">Submit</button>
      )}
    </form>
  );
}
