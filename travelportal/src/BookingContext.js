import { createContext, useState } from 'react';
const BookingContext = createContext();
const BookingProvider = ({ children }) => {
  const [bookingDetails, setBookingDetails] = useState(null);
  return (
    <BookingContext.Provider value={{ bookingDetails, setBookingDetails }}>
      {children}
    </BookingContext.Provider>
  );
};
export { BookingContext, BookingProvider };
