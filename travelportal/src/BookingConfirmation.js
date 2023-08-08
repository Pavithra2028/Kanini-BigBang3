import React, { useContext } from 'react';
import { BookingContext } from './BookingContext';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useLocation } from 'react-router-dom'; // Import the useLocation hook

const BookingConfirmation = () => {
  const { bookingDetails } = useContext(BookingContext);
  const location = useLocation(); // Use the useLocation hook to access location state

  const generatePDF = (numberOfPeople) => {
    const input = document.getElementById('booking-details');
    const pdf = new jsPDF('p', 'px', 'a4');

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      pdf.addImage(imgData, 'PNG', 40, 40, 500, 500);
      pdf.save('booking_details.pdf');
    });
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Booking Confirmation</h2>
      {bookingDetails ? (
        <div id="booking-details" style={styles.details}>
          <p style={styles.detailItem}>Booking ID: {bookingDetails.booking_id}</p>
          <p style={styles.detailItem}>USERNAME: {bookingDetails.travellers_id}</p>
          <p style={styles.detailItem}>EMAIL: {bookingDetails.email}</p>
          <p style={styles.detailItem}>CITY OF RESIDENCE: {bookingDetails.city_of_residence}</p>
          <p style={styles.detailItem}>NUMBER OF PEOPLE: {bookingDetails.no_of_people}</p>
          <p style={styles.detailItem}>PHONE NUMBER: {bookingDetails.phone_number}</p>
          <p style={styles.detailItem}>BOOKING DATE: {bookingDetails.bookingDate}</p>
          <button style={styles.button} onClick={generatePDF}>
            Download PDF
          </button>
        </div>
      ) : (
        <p style={styles.noDetails}>No booking details available.</p>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
  },
  heading: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  details: {
    border: '1px solid #ccc',
    padding: '20px',
    marginBottom: '20px',
  },
  detailItem: {
    fontSize: '16px',
    marginBottom: '10px',
  },
  button: {
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    cursor: 'pointer',
    borderRadius: '4px',
    fontSize: '16px',
  },
  noDetails: {
    fontSize: '18px',
    color: '#888',
  },
};

export default BookingConfirmation;
