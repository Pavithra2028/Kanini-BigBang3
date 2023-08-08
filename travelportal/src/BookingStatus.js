import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function BookingStatus() {
  const [bookingData, setBookingData] = useState(null);
  const [tourPackage, setTourPackage] = useState(null);
  const [travellerData, setTravellerData] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedTravellerId = localStorage.getItem('travellers_id');
    if (storedTravellerId) {
      axios
        .get(`https://localhost:7084/api/Travellers/${storedTravellerId}`)
        .then((response) => {
          setTravellerData(response.data);
        })
        .catch((error) => {
          console.error('Error fetching traveler data:', error);
        });
    }
  }, []);

  useEffect(() => {
    const storedBookingId = localStorage.getItem('booking_id');
    const storedPackageId = localStorage.getItem('package_id');
    if (storedBookingId && storedPackageId) {
      fetch(`https://localhost:7084/api/Booking/${storedBookingId}`)
        .then((response) => response.json())
        .then((data) => {
          setBookingData(data);
        })
        .catch((error) => {
          console.error('Error fetching booking data from API:', error);
        });

      axios
        .get(`https://localhost:7234/api/Tourpackage/${storedPackageId}`)
        .then((response) => {
          setTourPackage(response.data);
        })
        .catch((error) => {
          console.error('Error fetching tour package:', error);
        });
    } else {
      console.error('BookingId or PackageId not found in Session Storage');
    }
  }, []);

  const location = useLocation();

  const numberOfPeople = location.state?.no_of_people || 1;

  const getBookingStatus = (isConfirmed) => {
    return isConfirmed === 0 ? 'Requested' : 'Successful';
  };

  const handlePayNowClick = () => {
    setShowPaymentModal(true);
  };

  const handleCloseModal = () => {
    setShowPaymentModal(false);
    navigate('/pay');
  };

  return (
    <div style={{ marginTop: '8%' }} className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card mb-4">
            {bookingData && (
              <div className="card-header">
                <h1 className="card-title">Booking Status</h1>
                <p className="card-text">
                  <strong>Booking Id:</strong> {bookingData.booking_id}
                </p>
                <p className="card-text">
                  <strong>Booking Status:</strong>{' '}
                  {getBookingStatus(bookingData.isConfirmed)}
                </p>
                <p className="card-text">
                  <strong>Number of People:</strong> {bookingData.no_of_people}
                </p>
              </div>
            )}

            {travellerData && (
              <div className="card-body">
                <h2 className="card-title">Traveler Details</h2>
                <p className="card-text">
                  <strong>Name:</strong> {travellerData.travellers_name}
                </p>
              </div>
            )}

            {tourPackage && (
              <div className="card-footer">
                <img
                  src={`https://localhost:7234/uploads/${tourPackage.image}`}
                  alt="Tour Package"
                  className="card-img-top"
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <div className="card-body">
                  <h2 className="card-title">{tourPackage.packageName}</h2>
                  <p className="card-text">
                    <strong>Price:</strong> {tourPackage.price}
                  </p>
                  <p className="card-text">
                    <strong>Duration:</strong> {tourPackage.duration}
                  </p>
                  <p className="card-text">
                    <strong>Hotel:</strong> {tourPackage.hotel_name}
                  </p>
                  <hr />
                  <center>
                    <p>
                      <strong>Total Price:</strong>{' '}
                      {tourPackage.price * numberOfPeople}
                    </p>
                  </center>
                  <div className="text-center">
                    {bookingData && bookingData.isConfirmed === 1 ? (
                      <button className="btn btn-danger" disabled>
                        Paid
                      </button>
                    ) : (
                      <a href="/pay" className="btn btn-primary">
                      Pay Now
                    </a>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
