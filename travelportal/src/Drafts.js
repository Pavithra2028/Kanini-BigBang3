import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Payment from './Payment';
import { Modal, Button } from 'react-bootstrap';

export default function Drafts() {
  const [bookingData, setBookingData] = useState(null);
  const [tourPackage, setTourPackage] = useState(null);
  const [travellerData, setTravellerData] = useState(null); // State to store traveler's data
  
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  useEffect(() => {
    // Fetch the traveler's data using the TravellerId from Session Storage
    const storedTravellerId = sessionStorage.getItem('TravellerId');
    if (storedTravellerId) {
      axios
        .get(`https://localhost:7132/api/Travellers/${storedTravellerId}`)
        .then((response) => {
          setTravellerData(response.data);
        })
        .catch((error) => {
          console.error('Error fetching traveler data:', error);
        });
    }
  }, []);


  useEffect(() => {
    const storedBookingId = sessionStorage.getItem('BookingId');
    const storedPackageId = sessionStorage.getItem('PackageId');

    if (storedBookingId && storedPackageId) {
      fetch(`https://localhost:7132/api/Booking/${storedBookingId}`)
        .then((response) => response.json())
        .then((data) => {
          setBookingData(data);
        })
        .catch((error) => {
          console.error('Error fetching booking data from API:', error);
        });

      axios.get(`https://localhost:7087/api/TourPackage/${storedPackageId}`)
        .then(response => {
          setTourPackage(response.data);
        })
        .catch(error => {
          console.error('Error fetching tour package:', error);
        });
    } else {
      console.error('BookingId or PackageId not found in Session Storage');
    }
  }, []);

  const location = useLocation();
  
  const numberOfPeople = location.state?.numberOfPeople || 1; // Get the number of persons from the state, default to 1 if not available.
  
  const getBookingStatus = (isConfirmed) => {
    return isConfirmed === 0 ? 'Requested' : 'Successful';
  };

  const handlePayNowClick = () => {
    setShowPaymentModal(true);
  };

  const handleCloseModal = () => {
    setShowPaymentModal(false);
  };

  return (
    <div style={{marginTop: '8%'}} className="container">
        
    <div className="row">
    <div className="col-md-4 offset-md-2">
        <h1>Booking Status</h1>
        {bookingData ? (
          <>
            <p>Booking Id: {bookingData.bookingId}</p>
            <p>Booking Status: {getBookingStatus(bookingData.isConfirmed)}</p>
            <p>Number of People: {bookingData.numberOfPeople}</p>
          </>
        ) : (
          <p>Loading booking data...</p>
        )}
        {travellerData ? (
            <>
              <h2>Traveler Details</h2>
              <p>Name: {travellerData.travelerName}</p>
              <p>Email: {travellerData.travelerEmail}</p>
            </>
          ) : (
            <p>Loading traveler details...</p>
          )}
        </div>
      

        <div className="col-md-3 offset-md-1">
        {tourPackage ? (
          <div className="card">
            <img
        src={`https://localhost:7087/Uploads/${tourPackage.image}`}
        alt="Tour Package"
              className="card-img-top"
              style={{ height: '200px', objectFit: 'cover' }}
            />
            <div className="card-body">
              <h2 className="card-title">{tourPackage.packageName}</h2>
              <p className="card-text">Price: {tourPackage.price}</p>
              <p className="card-text">Duration: {tourPackage.duration}</p>
              <p className="card-text">Hotel: {tourPackage.hotelName}</p>
              <hr/>
              <center><p>Total Price: {tourPackage.price * numberOfPeople}</p></center>
              
<div className="text-center">
  {bookingData && bookingData.isConfirmed === 1 ? (
    <button className="btn btn-danger" disabled>
      Paid
    </button>
  ) : (
    <button
      className="btn btn-primary"
      onClick={handlePayNowClick}
      disabled={!bookingData || !tourPackage} // Disable button if data is not loaded
    >
      Pay Now
    </button>
  )}
</div>


            </div>
          </div>
        ) : (
          <p>Loading tour package data...</p>
        )}
      </div>
    </div>
    <Modal show={showPaymentModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Payment Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Payment onCloseModal={handleCloseModal} />
        </Modal.Body>
      </Modal>
  </div>
  );
}