import React, { useState,useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import './Cardes.css';

const Cardes = ({ card, onDelete, currentUser, setIsCrrated }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedName, setUpdatedName] = useState(card.name);
  const [updatedCompany, setUpdatedCompany] = useState(card.company);
  const [updatedTitle, setUpdatedTitle] = useState(card.title);
  const [isFavorited, setIsFavorited] = useState(card.isFavorited);

  const handleUpdate = () => {
    setIsEditing(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/updateBusinessCard/${card.id}`, {
        name: updatedName,
        company: updatedCompany,
        title: updatedTitle
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          'Content-Type': 'application/json'
        }
      });

      setIsEditing(false);
      setIsCrrated(prevState => !prevState);

      Swal.fire({
        title: "Update!",
        text: "Your file has been Updated.",
        icon: "success"
      });

    } catch (error) {
      console.error('Failed to update card:', error);
    }
  };

  const handleFavoris = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/Favoris/${card.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      const updatedFavoritedStatus = response.data.isFavorited;
      console.log(response)

      // Update the favorite status in the UI
      setIsFavorited(updatedFavoritedStatus);

    } catch (error) {
      console.error('Failed to toggle favorite status:', error);
      // Add error handling logic here
    }
  };


  const handleCancel = () => {
    setIsEditing(false);
    setUpdatedName(card.name);
    setUpdatedCompany(card.company);
    setUpdatedTitle(card.title);
  };

  const handleDelete = () => {
    onDelete(card.id);
  };

  useEffect(() => {
    setIsCrrated(prevState => !prevState);
  }, [isFavorited]);

  return (
    <div className="card col-md-6">
      <h5 className="card-header">Name: {card.name}</h5>
      <div className="card-body">
        {isEditing ? (
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="updatedName" className="form-label">Name</label>
              <input type="text" className="form-control" id="updatedName" value={updatedName} onChange={(e) => setUpdatedName(e.target.value)} />
            </div>
            <div className="mb-3">
              <label htmlFor="updatedCompany" className="form-label">Company</label>
              <input type="text" className="form-control" id="updatedCompany" value={updatedCompany} onChange={(e) => setUpdatedCompany(e.target.value)} />
            </div>
            <div className="mb-3">
              <label htmlFor="updatedTitle" className="form-label">Title</label>
              <input type="text" className="form-control" id="updatedTitle" value={updatedTitle} onChange={(e) => setUpdatedTitle(e.target.value)} />
            </div>
            <button type="submit" className="btn btn-primary">Save</button>
            <button type="button" className="btn btn-secondary mx-2" onClick={handleCancel}>Cancel</button>
          </form>
        ) : (
          <div>
            <div className=' d-flex  justify-content-between '>
            <h5 className="card-title">Company: {card.company}</h5>
            <h2 onClick={handleFavoris} className='icon_Favoris'>
              <i className={!card.favorited ? 'fa-regular fa-heart' : 'fa-solid fa-heart'} style={{ color: '#f40606' }}></i>
              </h2>
            </div>
            <p className="card-text">Title: {card.title}</p>
              {currentUser && card.user_id === currentUser.id && (
                <div>
                    <button className="btn btn-primary me-2" onClick={handleUpdate}>
                    Update
                  </button>
                  <button className="btn btn-danger " onClick={handleDelete}>
                    Delete
                  </button>
                
                </div>
              )}
          
          </div>
        )}
      </div>
    </div>
  );
};

export default Cardes;
