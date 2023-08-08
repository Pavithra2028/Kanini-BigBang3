import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { Carouse, NavDropdown } from 'react-bootstrap';

export default function Bookings() {
  const isLoggedIn = localStorage.getItem('travellers_id') && localStorage.getItem('token');

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    travellers_id: isLoggedIn ? localStorage.getItem('travellers_id') : '',
    package_id: isLoggedIn ? localStorage.getItem('package_id') : '',
    email:'',
    city_of_residence: '',
    no_of_people: 1, 
    phone_number:'',
    price:'',
    bookingDate: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleNumberOfPeopleChange = (event) => {
    const { value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, no_of_people: parseInt(value, 10) }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  
    if (isLoggedIn) {
      const bookingData = {
        travellers_id: localStorage.getItem('travellers_id'),
        package_id: localStorage.getItem('package_id'),
        email: document.querySelector('[name="email"]').value,
        city_of_residence: document.querySelector('[name="city_of_residence"]').value,
        no_of_people: parseInt(document.querySelector('[name="numberOfPeople"]').value, 10),
        phone_number: document.querySelector('[name="phone_number"]').value,
        price: parseInt(document.querySelector('[name="price"]').value, 10),
        bookingDate: document.querySelector('[name="bookingDate"]').value,
      };
  
      axios
        .post('https://localhost:7084/api/Booking', bookingData)
        .then((response) => {
          const booking_id = response.data.booking_id;
          localStorage.setItem('booking_id', booking_id);
          console.log(localStorage.getItem('package_id'));
          console.log('Booking created successfully:', response.data);
          navigate('/bookstatus', { state: { no_of_people: bookingData.no_of_people } });
        })
        .catch((error) => {
          console.error('Error creating booking:', error);
        });
    } else {
      alert('Login first to book the details.');
    }
  };
  
  return (
    <div>
      <br/><br/><br/>
      <ul class="nav-links">
    <li><a href="#">TRAVELGo</a></li>
    <li class="center"><a href="/image">TourPackages</a></li>
    <li class="forward"><a href="/feedback">Feedback</a></li>
    <NavDropdown title="Login" id="basic-nav-dropdown"  style={{ color: 'black' ,}}>
              <NavDropdown.Item href="/adminpage">Admin</NavDropdown.Item>
              <NavDropdown.Item href="/tlogin">Traveller</NavDropdown.Item>
              <NavDropdown.Item href="/agentlogin">Traveller Agent</NavDropdown.Item>

            </NavDropdown>
  </ul>
      <h2>Booking Form</h2>
      {isLoggedIn ? (
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
              <label htmlFor="phone_number" className="form-label">Phone Number:</label>
              <input
                type="number"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleInputChange}
                required
                className="form-control"
                placeholder="Enter Residence"
              />
              <label htmlFor="price" className="form-label">Price:</label>
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
      ) : (
        <p>Login first to book the details.</p>
      )}
    </div>
  );
}