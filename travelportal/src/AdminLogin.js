import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
function AdminPage() {

  const [activeSection, setActiveSection] = useState('content');
  const [agency, setagency] = useState([]);
  const [notApprovedagency, setNotApprovedagency] = useState([]);
  useEffect(() => {
    fetchApprovedagency();
    fetchNotApprovedagency();

  }, []);


  const fetchApprovedagency=()=>{
    fetch('https://localhost:7203/api/Travelagent/AcceptedAgents', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      })
      .then(response => response.json())
      .then(
        data => setagency(data),
        console.log(agency))
      .catch(error => console.log(error));
}


const fetchNotApprovedagency=()=>{
    fetch('https://localhost:7203/api/Travelagent/RequestedAgents', {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    })
        .then(response => response.json())
        .then(data => setNotApprovedagency(data))
        .catch(error => console.log(error));
  }
  

  const handleSectionClick = (section) => {
    setActiveSection(section);
  };

  return (
    <>
  
  <header className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: "black" }}>
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-1 mb-lg-0 justify-content-center">
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="agencyDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{ color:'white', fontSize: "16px" }}>
                  Agency
                </a>
                <ul className="dropdown-menu" aria-labelledby="agencyDropdown">
                  <li><a className="dropdown-item" onClick={() => handleSectionClick('agency')}>Requested agency</a></li>
                  <li><a className="dropdown-item" onClick={() => handleSectionClick('getagency')}>Activated agency</a></li>
                </ul>
              </li>
             
              <li className="nav-item">
                <a className="nav-link" href="/imagepost" style={{ color:'white',fontSize: "16px" }}>ImageGallery</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/admin" style={{ color:'white',fontSize: "16px" }}>Login</a>
              </li>
            </ul>
            <span className="navbar-text" style={{ marginLeft: '10px',color:'white', fontSize: '20px' }}>
        <a class="nav-link" onClick={() => { localStorage.removeItem("token") }}  href="/">Logout</a>
      </span>
      </div>
        </div>
      </header>
  {activeSection === 'content' && (
        <div className="content">
          <div className="context">
            <h1>Welcome admin!!</h1>
          </div>
        </div>
      )}
      {activeSection === 'agency' && (
        <div style={{ backgroundImage: 'url("https://pic.clubic.com/v1/images/2113227/raw?fit=max&width=1200&hash=bc88a04709ea9be0735414bdf4c01df0ca9dce35")', backgroundPosition: 'center', backgroundSize: 'cover' , backdropFilter: 'blur(15px)', minHeight: '100vh', minWidth: '100%' }}>
        <div className="agency" >
          <section className="my-background-radial-gradient overflow-hidden">
            <div className="my-agency-container container">
              <div className="my-page-heading">
                <h2>Requested agency</h2>
                <hr/>
              </div>
              <div className="container">
                <div className="row row-cols-1 row-cols-md-4 g-4">
                  {notApprovedagency.map(agency => (
                    <div key={agency.traveller_agent_id} className="col">
                      <div className="card my-bg-glass">
                        <div className="card-body">
                        <div className="flex flex-wrap">
                          <br/>
                        <span className="inline-block w-1/2">
                        {agency.agentimage && <img src={`https://localhost:7203/uploads/${agency.agentimage}`} alt="Agency Image" style={{ maxWidth: '100%', maxHeight: '200px' }} />}
                        <p className="text-sm text-gray-600">Name: {agency.traveller_agent_name}</p>
                          <p className="text-sm text-gray-600">Email: {agency.phonenumber}</p>
                        </span>
                      
                      </div><hr/>
                          
                          <div className="d-flex justify-content-center">
                          
                            <button type="button" className="btn btn-success me-2" onClick={() =>{
                              const requestBody = {
                              "id": agency.traveller_agent_id
                              };
                              console.log(requestBody);

                              fetch("https://localhost:7203/api/Travelagent/UpdateStatus", {
                              method: "PUT",
                              headers: {
                                  "Accept": "application/json",
                                  "Content-Type": "application/json"
                              },
                              body: JSON.stringify(requestBody)
                              })
                              .then(response => response.json())
                              .then(data => {
                              console.log(data); 
                              fetchNotApprovedagency();
                              fetchApprovedagency();
                              })
                              .catch(error => console.log(error));
                          }}>Accept</button>
                            <button type="button" className="btn btn-danger" onClick={() =>{
                              const requestBody = {
                                "id": agency.traveller_agent_id
                              };
                              console.log(requestBody);

                              fetch("https://localhost:7203/api/Travelagent/DeclineAgents ", {
                              method: "PUT",
                              headers: {
                                  "Accept": "application/json",
                                  "Content-Type": "application/json"
                              },
                              body: JSON.stringify(requestBody)
                              })
                              .then(response => response.json())
                              .then(data => {
                              console.log(data); 
                              fetchNotApprovedagency();
                              fetchApprovedagency();
                              })
                              .catch(error => console.log(error));
                          }}>Decline</button>


                          </div>

                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </section>
        </div>
        </div>
      )}
  
      {activeSection === 'getagency' && (
        <div style={{ backgroundImage: 'url("https://img.freepik.com/free-photo/lightbox-beside-traveler-tools_23-2148436367.jpg?w=2000")', backgroundPosition: 'center', backgroundSize: 'cover' , backdropFilter: 'blur(15px)', minHeight: '100vh', minWidth: '100%' }}> 
        <div className="getagency">
          <section className="my-background-radial-gradient overflow-hidden">
            <div className="my-agency-container container">
              <div className="my-page-heading">
                <h2>Activated agency</h2>
                
                <hr />
              </div>
              <div className="row row-cols-1 row-cols-md-3 g-4">
                  {agency.map(agency => (
                    <div key={agency.traveller_agent_id} className="col">
                    
                      <div className="card my-bg-glass">
                      <br/>
                      

                <div className="card-body">
            <h5 className="card-title">{agency.traveller_agent_name}</h5>
            <div className="flex flex-wrap">
              <span className="inline-block w-1/2">
                                        {agency.agentimage && <img src={`https://localhost:7203/uploads/${agency.agentimage}`} alt="Agency Image" style={{ maxWidth: '100%', maxHeight: '200px' }} />}

                          <p className="text-sm text-gray-600">Phone Number: {agency.phonenumber}</p>

              </span>
             
            </div>
          </div>
        </div>
      </div>   
      
  ))}
</div>
            </div>
            
          </section>
        </div>
        </div>
      )}
    </>
  );  
}

export default AdminPage;