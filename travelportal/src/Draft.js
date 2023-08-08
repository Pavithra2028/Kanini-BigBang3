import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

export default function Draft() {
  const isLoggedIn = sessionStorage.getItem('TravellerId') && localStorage.getItem('token');

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    travellerId: isLoggedIn ? localStorage.getItem('TravellerId') : '',
    packageId: isLoggedIn ? localStorage.getItem('PackageId') : '',
    residence: '',
    numberOfPeople: 1, 
    bookingDate: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleNumberOfPeopleChange = (event) => {
    const { value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, numberOfPeople: parseInt(value, 15) }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (isLoggedIn) {
      axios
        .post('https://localhost:7084/api/Booking', formData)
        .then((response) => {
          const bookingId = response.data.bookingId;
          localStorage.setItem('BookingId', bookingId);

          console.log('Booking created successfully:', response.data);
          setFormData({
            travellerId: localStorage.getItem('TravellerId'),
            packageId: localStorage.getItem('PackageId'),
            residence: '',
            numberOfPeople: 1,
            bookingDate: '',
          });
          navigate('/bookstatus', { state: { numberOfPeople: formData.numberOfPeople } });
        })
        .catch((error) => {
          console.error('Error creating booking:', error);
        });
    } else {
      alert('Login first to book the details.');
    }
  };

  return (
    <div className="container mt-5">
          <form onSubmit={handleSubmit} className="shadow p-4 rounded">
            <div className="mb-3">
              <label htmlFor="residence" className="form-label">Residence:</label>
              <input
                type="text"
                name="city_of_residence"
                value={formData.city_of_residence}
                onChange={handleInputChange}
                required
                className="form-control"
                placeholder="Enter Residence"
              />
              <label htmlFor="email" className="form-label">Email:</label>
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="form-control"
                placeholder="Enter Residence"
              />
              <label htmlFor="phone_number" className="form-label">Email:</label>
              <input
                type="number"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleInputChange}
                required
                className="form-control"
                placeholder="Enter Residence"
              />
              <label htmlFor="price" className="form-label">Email:</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                required
                className="form-control"
                placeholder="Enter Residence"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="numberOfPeople" className="form-label">Number of People:</label>
              <select
                name="numberOfPeople"
                value={formData.no_of_people}
                onChange={handleNumberOfPeopleChange}
                required
                className="form-select"
              >
                
                {Array.from({ length: 10 }, (_, index) => index + 1).map((count) => (
                  <option key={count} value={count}>
                    {count}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="bookingDate" className="form-label">Booking Date:</label>
              <input
                type="date"
                name="bookingDate"
                value={formData.bookingDate}
                onChange={handleInputChange}
                required
                className="form-control"
              />
            </div>
            <div className="d-grid gap-2">
              <button type="submit" className="btn btn-primary btn-block">Book Now</button>
            </div>
          </form>
        </div>
  );
}