import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
const Imagegallery = () => {
  const [imagegallery, setImagegallery] = useState([]);
  const [cardStyle, setCardStyle] = useState({
    transition: "box-shadow 0.3s",
  });
  const navigate = useNavigate();
  useEffect(() => {
    fetchImagegallery();
  }, []);
  const handleHover = () => {
    setCardStyle({
      ...cardStyle,
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      cursor: "pointer",
    });
  };
  const handleLeave = () => {
    setCardStyle({
      ...cardStyle,
      boxShadow: "none",
      cursor: "default",
    });
  };
  const handleView = (image) => {
    localStorage.setItem('TourId', image.tourId);
    console.log("View button clicked for:", image.tourName);
    navigate('/tour');
  };
  const fetchImagegallery = () => {
    axios.get('https://localhost:7203/api/Imagegallery')
      .then((response) => {
        const data = response.data;
        setImagegallery(data);
        toast.success('Imagegallery Details', {
          style: {
            background: '#5792FC',
            color: 'white'
          }
        });
      })
      .catch((error) => {
        console.error('Error fetching Imagegallery:', error);
      });
  };
return (
    <div className="container">
      <h2 className="col-lg-4 col-md-6 mb-4">Image Gallery</h2>
      <div className="row">
        {imagegallery.map((image, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <div className="destination-item position-relative overflow-hidden mb-2" style={cardStyle} onMouseEnter={handleHover} onMouseLeave={handleLeave}>
              <img src={`https://localhost:7203/uploads/${image.locationImage}`} alt={image.tourName} className="card-img-top img-fluid" />
              <div className="card-body">
                <a className="destination-overlay text-white text-decoration-none" onClick={() => handleView(image)}>View Packages
                <span className="text-white">{image.tourName}</span></a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Imagegallery;
