import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
export default function Payment() {
  const navigate = useNavigate();
  const [paymentData, setPaymentData] = useState({
    booking_id: localStorage.getItem('booking_id'),
    card_number: 0,
    expirymonth: 0,
    expiryyear: 0,
    name: '',
    cvv_number: 0,
  });
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPaymentData((prevPaymentData) => ({ ...prevPaymentData, [name]: value }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
      const bookingId = localStorage.getItem('booking_id');
      const paymentDataWithBookingId = {
      ...paymentData,
      booking_id: bookingId
    };
    axios.post('https://localhost:7084/api/Payment', paymentDataWithBookingId)
      .then((response) => {
        console.log('Payment created successfully:', response.data);
        navigate('/pdf', { state: { payment_id: response.data.payment_id } });
      })
      .catch((error) => {
        console.error('Error creating payment:', error);
      });
  };
  return(
    <div>
      <br/><br/><br/>
      <h2>Payment Form</h2>
      <div className="container mt-5">
        <form onSubmit={handleSubmit} className="shadow p-4 rounded">
          <div className="mb-3">
            <label htmlFor="card_number" className="form-label">Card Number:</label>
            <input
              type="number"
              name="card_number"
              value={paymentData.card_number}
              onChange={handleInputChange}
              required
              className="form-control"
              placeholder="Enter Card Number"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="expirymonth" className="form-label">Expiry Month:</label>
            <input
              type="number"
              name="expirymonth"
              value={paymentData.expirymonth}
              onChange={handleInputChange}
              required
              className="form-control"
              placeholder="Enter Expiry Month"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="expiryyear" className="form-label">Expiry Year:</label>
            <input
              type="number"
              name="expiryyear"
              value={paymentData.expiryyear}
              onChange={handleInputChange}
              required
              className="form-control"
              placeholder="Enter Expiry Year"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name:</label>
            <input
              type="text"
              name="name"
              value={paymentData.name}
              onChange={handleInputChange}
              required
              className="form-control"
              placeholder="Enter Name"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="cvv_number" className="form-label">CVV Number:</label>
            <input
              type="number"
              name="cvv_number"
              value={paymentData.cvv_number}
              onChange={handleInputChange}
              required
              className="form-control"
              placeholder="Enter CVV Number"
            />
          </div>
          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-primary btn-block">Make Payment</button>
          </div>
        </form>
      </div>
    </div>
  );
}
