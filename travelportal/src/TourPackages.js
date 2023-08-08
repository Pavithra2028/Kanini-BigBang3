import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export default function Packages() {
  const [tourPackageData, setTourPackageData] = useState([]);
  const [selectedTour, setSelectedTour] = useState(null);
  const [searchText, setSearchText] = useState('');
  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };
  const navigate = useNavigate();
  useEffect(() => {
    fetchTourPackageData();
  }, []);
  const fetchTourPackageData = async () => {
    try {
      const TourId = parseInt(localStorage.getItem('TourId'))
      if (TourId) {
        const response = await axios.get(`https://localhost:7234/api/Tourpackage/TourId/${TourId}`);
        setSelectedTour(response.data);
        setTourPackageData(response.data);  
      }
    } catch (error) {
      console.error('Error fetching tour package data:', error);
    }
  };
  const handlePackageButtonClick = (package_id) => {
    console.log(package_id);
    localStorage.setItem('package_id', package_id); 
    navigate(`/travelerbook`);
  };
  const filteredTourPackageData = tourPackageData.filter((tourPackage) =>
  tourPackage.hotel_name.includes(searchText) || tourPackage.speciality_of_the_place.includes(searchText)
);
  return (      
    <section className="my-background-radial-gradient overflow-hidden" style={{ marginTop: '50px' }}>
      <style>
        {`
      .nav-links li.search {
  margin-left: auto; /* Push the search input to the right */
  display: flex;
  align-items: center;
}

.nav-links li.search input {
  border: 1px solid #ccc;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 16px;
  width: 200px; /* Adjust the width as needed */
}

@media screen and (max-width: 768px) {
  .nav-links li.search {
    margin-left: 10px; /* Adjust the margin for smaller screens */
    width: auto;
  }

  .nav-links li.search input {
    width: 100%; /* Make the search input take full width on smaller screens */
  }
}

`}
</style>
      <ul class="nav-links">
        
    <li><a href="#">TRAVELGo</a></li>
    <li class="center"><a href="/image">TourPackages</a></li>
    <li class="upward"><a href="#">Services</a></li>
    <li class="forward"><a href="/feedback">Feedback</a></li>
    <li className="search">
    <input
          type="text"
          placeholder="Search by Hotel Name or Speciality of Place"
          value={searchText}
          onChange={handleSearchChange}
        />
        </li>
    </ul>
      <div className="container">
        <div className="row row-cols-1 row-cols-md-4 g-4">
          {filteredTourPackageData.map(tourPackages => (
            <div key={tourPackages.TourId} className="col mb-4">
              <div className="card my-bg-glass h-100">
                <img
                  src={`https://localhost:7234/uploads/${tourPackages.image}`}
                  className="card-img-top"
                  alt=""
                  style={{ width: '100%', height: '300px', objectFit: 'cover' }}
                />
                <div className="card-body">
                  <h5 className="card-title">{tourPackages.packagename}</h5>
                  <p className="card-text">Price: {tourPackages.price}</p>
                  <p className="card-text">Duration: {tourPackages.duration}</p>
                  <p className="card-text">hotel_name: {tourPackages.hotel_name}</p>
                  <p className="card-text">food_details: {tourPackages.food_details}</p>
                  <p className="card-text">speciality_of_the_place: {tourPackages.speciality_of_the_place}</p>
                  <p className="card-text">vacation_type: {tourPackages.vacation_type}</p>

                </div>
                <div className="card-footer">
                  <button
                    className="btn btn-primary w-100"
                    onClick={() => handlePackageButtonClick(tourPackages.package_id)}
                  >
                    View
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}