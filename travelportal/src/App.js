import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Main from './Main';
import AgentLogin from './AgentLogin';
import Bookings from './TravelerBook';
import Imagegallery from './Imagegallery';
import Imagepost from './Imagepost';
import Spot from './Spot'
import TourPackageDetails from './TourPackages';
import Admin from './Admin';
import AdminPage from './AdminLogin';
import FeedbackForm from './Feedback';
import TravellerLogin from './Traveler';
import BookingStatus from './BookingStatus';
import Tourpost from './Tourpost';
import Dash from './Generatepdf'
import Payment from './Payment';
import ProtectedRoute from './ProtectedRoute';

function App() {
  return (
    <div className="App">
      <ToastContainer theme="colored" />
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/agentlogin" element={<AgentLogin />} />
            <Route path="/travelerbook" element={<ProtectedRoute roles={['Traveller']} component={Bookings}/>} />
            <Route path="/image" element={<Imagegallery />} />
            <Route path ="/imagepost" element={<Imagepost/>}/>
            <Route path ="/spot" element={<Spot/>}/>
            <Route path ="/tour" element={<TourPackageDetails/>}/>
            <Route path ="/admin" element={<Admin/>}/>
            <Route path="/adminpage" element={<ProtectedRoute roles={['Admin']}component={AdminPage}/>}></Route>            
            <Route path ="/feedback" element={<FeedbackForm/>}/>
            <Route path ="/bookstatus" element={<BookingStatus/>}/>
            <Route path ="/tlogin" element={<TravellerLogin/>}/>
            <Route path ="/payment" element={<Payment/>}/>
            <Route path ="/pdf" element={<Dash/>}/>
            <Route path ="/imagepost" element={<Imagepost/>}/>
            <Route path ="/pay" element={<Payment/>}/>
            <Route path ="/tourpost" element={<Tourpost/>}/>
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
