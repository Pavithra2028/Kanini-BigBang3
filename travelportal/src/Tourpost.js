import React, { useState } from 'react';
import axios from 'axios';

const Tourpost = () => {
  const [newPackage, setNewPackage] = useState({
    packagename: '',
    hotel_name: '',
    food_details: '',
    speciality_of_the_place: '',
    iternary_details: '',
    image: null, 
    price: 0,
    vacation_type: '',
    duration: '',
  });
  const apiUrl = 'https://localhost:7234/api/Tourpackage'; 

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('packagename', newPackage.packagename);
      formData.append('hotel_name', newPackage.hotel_name);
      formData.append('food_details', newPackage.food_details);
      formData.append('speciality_of_the_place', newPackage.speciality_of_the_place);
      formData.append('iternary_details', newPackage.iternary_details);
      formData.append('imageFile', newPackage.image);
      formData.append('price', newPackage.price);
      formData.append('vacation_type', newPackage.vacation_type);
      formData.append('duration', newPackage.duration);
      const response = await axios.post(apiUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('New tour package added successfully:', response.data);
      setNewPackage({
        packagename: '',
        hotel_name: '',
        food_details: '',
        speciality_of_the_place: '',
        iternary_details: '',
        image: null, 
        price: 0,
        vacation_type: '',
        duration: '',
      });
    } catch (error) {
      console.error('Error adding new tour package:', error);
    }
  };
  const handleImageChange = (event) => {
    const file = event.target.files[0]; 
    setNewPackage({ ...newPackage, image: file }); 
  };
  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <div className="mb-3">
          <label htmlFor="packagename" className="form-label">Package Name</label>
          <input
            type="text"
            id="packagename"
            value={newPackage.packagename}
            onChange={(e) => setNewPackage({ ...newPackage, packagename: e.target.value })}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="hotel_name" className="form-label">Hotel Name</label>
          <input
            type="text"
            id="hotel_name"
            value={newPackage.hotel_name}
            onChange={(e) => setNewPackage({ ...newPackage, hotel_name: e.target.value })}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="food_details" className="form-label">Food Details</label>
          <input
            type="text"
            id="food_details"
            value={newPackage.food_details}
            onChange={(e) => setNewPackage({ ...newPackage, food_details: e.target.value })}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="speciality_of_the_place" className="form-label">Speciality of the Place</label>
          <input
            type="text"
            id="speciality_of_the_place"
            value={newPackage.speciality_of_the_place}
            onChange={(e) => setNewPackage({ ...newPackage, speciality_of_the_place: e.target.value })}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="iternary_details" className="form-label">Itinerary Details</label>
          <input
            type="text"
            id="iternary_details"
            value={newPackage.iternary_details}
            onChange={(e) => setNewPackage({ ...newPackage, iternary_details: e.target.value })}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">Image</label>
          <input
            type="file"
            id="image"
            onChange={handleImageChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">Price</label>
          <input
            type="number"
            id="price"
            value={newPackage.price}
            onChange={(e) => setNewPackage({ ...newPackage, price: e.target.value })}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="vacation_type" className="form-label">Vacation Type</label>
          <input
            type="text"
            id="vacation_type"
            value={newPackage.vacation_type}
            onChange={(e) => setNewPackage({ ...newPackage, vacation_type: e.target.value })}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="duration" className="form-label">Duration</label>
          <input
            type="text"
            id="duration"
            value={newPackage.duration}
            onChange={(e) => setNewPackage({ ...newPackage, duration: e.target.value })}
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Add New Tour Package</button>
      </form>
    </div>
  );
};

export default Tourpost;
