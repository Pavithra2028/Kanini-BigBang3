import React, { useState,useEffect } from "react";
import { toast } from "react-toastify";
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from 'react-router-dom';

const Imagepost = () => {
  const [tourName, setTourName] = useState("");
  const [locationImage, setLocationImage] = useState(null); 
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("tourName", tourName);
    if (locationImage) {
        formData.append("imageFile", locationImage);
    }
    formData.append("description", description);
    axios.post('https://localhost:7203/api/Imagegallery', formData, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
      enctype: 'multipart/form-data',
    })
      .then((response) => {
        console.log('Image added successfully:', response.data);
        toast.success('Image added successfully');
        setTourName("");
        setLocationImage(null);
        setDescription("");
      })
      .catch((error) => {
        console.error('Error adding image:', error);
        toast.error('Error adding image');
      });
  };
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('token');
    const userRole = localStorage.getItem('role'); 
    if (!isAuthenticated) {
      navigate('/agentlogin'); 
    } else if (userRole !== 'agency') {
      navigate('/agentlogin'); 
    } else {
      handleFormSubmit();
    }
}, []);
  const handleImageChange = (event) => {
    const file = event.target.files[0]; 
    setLocationImage(file);
  };

  return (
    <div className="container">
      <div className="card ">
        <div className="card-header">
          <h2>Image Gallery</h2>
        </div>
        <div className="card-body">
          <form onSubmit={handleFormSubmit} encType="multipart/form-data">
            <div className="mb-3">
              <label htmlFor="tourName" className="form-label">Tour Name</label>
              <input
                type="text"
                id="tourName"
                value={tourName}
                onChange={(e) => setTourName(e.target.value)}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="locationImage" className="form-label">Image</label>
              <input
                type="file"
                id="locationImage"
                onChange={handleImageChange} 
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">Description</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="form-control"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">Add Image</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Imagepost;
