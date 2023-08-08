import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";

const SpotDetails = () => {
  const [spots, setSpots] = useState([]);
  const [newSpot, setNewSpot] = useState({
    spot_id: '',
    image1: null, 
    package_id: 0,
  });

  const apiUrl = 'https://localhost:7234/api/Spot';

  useEffect(() => {
    fetchSpotData();
  }, []);

  const fetchSpotData = async () => {
    try {
      const response = await axios.get(apiUrl);
      setSpots(response.data);
    } catch (error) {
      console.error('Error fetching spot data:', error);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0]; 
    setNewSpot({ ...newSpot, image1: file }); 
  };

  return (
    <div>
      <h3>Spot List</h3>
      <div className="row">
        {spots.map((spot) => (
          <div className="col-md-4 mb-4" key={spot.id}>
            <img src={`https://localhost:7234/uploads/${spot.image1}`} className="img-fluid" />
            <div className="card-body">
              <div className="card card-small">
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpotDetails;
