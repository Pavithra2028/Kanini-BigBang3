import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import C2 from './Images/C2.avif'
import d2 from './Images/d2.avif'
import d3 from './Images/d3.jpg'
import g1 from './Images/g1.jpg'
import ca2 from './Images/ca1.avif'
import Ca1 from './Images/carousel-1.jpg'
import Ca2 from './Images/carousel-2.jpg'
import Carousel from 'react-bootstrap/Carousel'
import logo from './Images/logo.avif'
import log from './Images/logo1.avif'
import anne from './Images/anne.jpeg'
import paris from './Images/paris.jpeg'
import statue from './Images/statue.jpeg'
import louvre from './Images/louvre.jpeg'
import vatican from './Images/vatican.jpeg'
import grand from './Images/grand canal.jpeg'
import { faMapMarkerAlt, faPhoneAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Carouse, NavDropdown } from 'react-bootstrap';
import './App.css'
import "bootstrap/dist/css/bootstrap.min.css";
import { FaTwitter, FaFacebookF, FaInstagram, FaLinkedinIn ,FaYoutube} from 'react-icons/fa';
import { FaMapMarkerAlt, FaCalendarAlt, FaUser } from 'react-icons/fa';

function Main() {
    const carouselStyle = {
        maxWidth: "700px",
      };
        return (
    <div>
           <ul class="nav-links">
           <li class="logo">
    <img src={log} alt="Logo" />
  </li>
    <li><a href="#">TRAVELGo</a></li>
    <li class="center"><a href="/image">TourPackages</a></li>
    <NavDropdown title="Login" id="basic-nav-dropdown"  style={{ color: 'black' ,}}>
              <NavDropdown.Item href="/admin">Admin</NavDropdown.Item>
              <NavDropdown.Item href="/tlogin">Traveller</NavDropdown.Item>
              <NavDropdown.Item href="/agentlogin">Traveller Agent</NavDropdown.Item>
            </NavDropdown>
  </ul>
  <div className="container-fluid p-0 mb-5">
      <div id="header-carousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img className="w-100" src={Ca1} alt="Image" />
            <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
              <div className="p-3" style={carouselStyle}>
                <h6 className="section-title text-white text-uppercase mb-3 animated slideInDown">Luxury Living</h6>
                <h1 className="display-3 text-white mb-4 animated slideInDown">Discover A Brand Luxurious Hotel</h1>
                <a href="/traveler" className="btn btn-primary py-md-3 px-md-5 me-3 animated slideInLeft" style={{backgroundColor: "#fae84b", color: "black"}}>Registration</a>
                <a href="/travelerbook" className="btn btn-light py-md-3 px-md-5 animated slideInRight" style={{backgroundColor: "#fae84b", color: "black"}}>Book A Room</a>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <img className="w-100" src={Ca2} alt="Image" />
            <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
              <div className="p-3" style={carouselStyle}>
                <h6 className="section-title text-white text-uppercase mb-3 animated slideInDown">Luxury Living</h6>
                <h1 className="display-3 text-white mb-4 animated slideInDown">Discover A Brand Luxurious Hotel</h1>
                <a href="" className="btn btn-primary py-md-3 px-md-5 me-3 animated slideInLeft" style={{backgroundColor: "#fae84b", color: "black",}}>Our Rooms</a>
                <a href="" className="btn btn-light py-md-3 px-md-5 animated slideInRight" style={{backgroundColor: "#fae84b", color: "black",}}>Book A Room</a>
              </div>
            </div>
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#header-carousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#header-carousel" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
    <div class="container-fluid py-5">
        <div class="container pt-5 pb-3">
            <div class="text-center mb-3 pb-3">
                <h6 class="text-primary text-uppercase" style={{ letterSpacing: '5px' }}>Places</h6>
                <h1>Best Place To Visit</h1>
            </div>
            <div class="row">
                <div class="col-lg-3 col-md-4 col-sm-6 pb-2">
                    <div class="team-item bg-white mb-4">
                        <div class="team-img position-relative overflow-hidden">
                            <img class="img-fluid w-100" src={C2} alt=""/>
                            <div class="team-social">
                            <a className="btn btn-outline-primary btn-square" href="">
        <FaTwitter />
      </a>
      <a className="btn btn-outline-primary btn-square" href="">
        <FaFacebookF />
      </a>
      <a className="btn btn-outline-primary btn-square" href="">
        <FaInstagram />
      </a>
      <a className="btn btn-outline-primary btn-square" href="">
        <FaLinkedinIn />
      </a>
                            </div>
                        </div>
                        <div class="text-center py-4">
                            <h5 class="text-truncate">Guide Name</h5>
                            <p class="m-0">Designation</p>
                        </div>
                    </div>
                </div>
                <div class="col-lg-3 col-md-4 col-sm-6 pb-2">
                    <div class="team-item bg-white mb-4">
                        <div class="team-img position-relative overflow-hidden">
                            <img class="img-fluid w-100" src={g1} alt=""/>
                            <div class="team-social">
                            <a className="btn btn-outline-primary btn-square" href="">
        <FaTwitter />
      </a>
      <a className="btn btn-outline-primary btn-square" href="">
        <FaFacebookF />
      </a>
      <a className="btn btn-outline-primary btn-square" href="">
        <FaInstagram />
      </a>
      <a className="btn btn-outline-primary btn-square" href="">
        <FaLinkedinIn />
      </a>
                            </div>
                        </div>
                        <div class="text-center py-4">
                            <h5 class="text-truncate">Guide Name</h5>
                            <p class="m-0">Designation</p>
                        </div>
                    </div>
                </div>
                <div class="col-lg-3 col-md-4 col-sm-6 pb-2">
                    <div class="team-item bg-white mb-4">
                        <div class="team-img position-relative overflow-hidden">
                            <img class="img-fluid w-100" src={anne} alt=""/>
                            <div class="team-social">
                            <a className="btn btn-outline-primary btn-square" href="">
        <FaTwitter />
      </a>
      <a className="btn btn-outline-primary btn-square" href="">
        <FaFacebookF />
      </a>
      <a className="btn btn-outline-primary btn-square" href="">
        <FaInstagram />
      </a>
      <a className="btn btn-outline-primary btn-square" href="">
        <FaLinkedinIn />
      </a>
                            </div>
                        </div>
                        <div class="text-center py-4">
                            <h5 class="text-truncate">Grand Canal</h5>
                            <p class="m-0">Destination</p>
                        </div>
                    </div>
                </div>
                <div class="col-lg-3 col-md-4 col-sm-6 pb-2">
                    <div class="team-item bg-white mb-4">
                        <div class="team-img position-relative overflow-hidden">
                            <img class="img-fluid w-100" src={grand} alt=""/>
                            <div class="team-social">
                            <a className="btn btn-outline-primary btn-square" href="">
        <FaTwitter />
      </a>
      <a className="btn btn-outline-primary btn-square" href="">
        <FaFacebookF />
      </a>
      <a className="btn btn-outline-primary btn-square" href="">
        <FaInstagram />
      </a>
      <a className="btn btn-outline-primary btn-square" href="">
        <FaLinkedinIn />
      </a>
                            </div>
                        </div>
                        <div class="text-center py-4">
                            <h5 class="text-truncate">Statue</h5>
                            <p class="m-0">Destination</p>
                        </div>
                    </div>
                </div>
                <div class="col-lg-3 col-md-4 col-sm-6 pb-2">
                    <div class="team-item bg-white mb-4">
                        <div class="team-img position-relative overflow-hidden">
                            <img class="img-fluid w-100" src={statue} alt=""/>
                            <div class="team-social">
                            <a className="btn btn-outline-primary btn-square" href="">
        <FaTwitter />
      </a>
      <a className="btn btn-outline-primary btn-square" href="">
        <FaFacebookF />
      </a>
      <a className="btn btn-outline-primary btn-square" href="">
        <FaInstagram />
      </a>
      <a className="btn btn-outline-primary btn-square" href="">
        <FaLinkedinIn />
      </a>
                            </div>
                        </div>
                        <div class="text-center py-4">
                            <h5 class="text-truncate">Paris</h5>
                            <p class="m-0">Destination</p>
                        </div>
                    </div>
                </div>
                <div class="col-lg-3 col-md-4 col-sm-6 pb-2">
                    <div class="team-item bg-white mb-4">
                        <div class="team-img position-relative overflow-hidden">
                            <img class="img-fluid w-100" src={paris} alt=""/>
                            <div class="team-social">
                            <a className="btn btn-outline-primary btn-square" href="">
        <FaTwitter />
      </a>
      <a className="btn btn-outline-primary btn-square" href="">
        <FaFacebookF />
      </a>
      <a className="btn btn-outline-primary btn-square" href="">
        <FaInstagram />
      </a>
      <a className="btn btn-outline-primary btn-square" href="">
        <FaLinkedinIn />
      </a>
                            </div>
                        </div>
                        <div class="text-center py-4">
                            <h5 class="text-truncate">Louvre</h5>
                            <p class="m-0">Destination</p>
                        </div>
                    </div>
                </div>
                <div class="col-lg-3 col-md-4 col-sm-6 pb-2">
                    <div class="team-item bg-white mb-4">
                        <div class="team-img position-relative overflow-hidden">
                            <img class="img-fluid w-100" src={louvre} alt=""/>
                            <div class="team-social">
                            <a className="btn btn-outline-primary btn-square" href="">
        <FaTwitter />
      </a>
      <a className="btn btn-outline-primary btn-square" href="">
        <FaFacebookF />
      </a>
      <a className="btn btn-outline-primary btn-square" href="">
        <FaInstagram />
      </a>
      <a className="btn btn-outline-primary btn-square" href="">
        <FaLinkedinIn />
      </a>
                            </div>
                        </div>
                        <div class="text-center py-4">
                            <h5 class="text-truncate">Vatican</h5>
                            <p class="m-0">Destination</p>
                        </div>
                    </div>
                </div>
                <div class="col-lg-3 col-md-4 col-sm-6 pb-2">
                    <div class="team-item bg-white mb-4">
                        <div class="team-img position-relative overflow-hidden">
                            <img class="img-fluid w-100" src={vatican} alt=""/>
                            <div class="team-social">
                            <a className="btn btn-outline-primary btn-square" href="">
        <FaTwitter />
      </a>
      <a className="btn btn-outline-primary btn-square" href="">
        <FaFacebookF />
      </a>
      <a className="btn btn-outline-primary btn-square" href="">
        <FaInstagram />
      </a>
      <a className="btn btn-outline-primary btn-square" href="">
        <FaLinkedinIn />
      </a>
                            </div>
                        </div>
                        <div class="text-center py-4">
                            <h5 class="text-truncate">Vatican</h5>
                            <p class="m-0">Destination</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>



  
    <div className="container-fluid container-service py-5">
      <div className="container py-5">
        <div className="text-center mx-auto wow fadeInUp" data-wow-delay="0.1s" style={{ maxWidth: '600px' }}>
          <h1 className="display-6 mb-3">Reliable & High-Quality Speciality</h1>
          <p className="mb-5">When a person has a medical concern, they may turn to a doctor for help. There are many types of doctor, and a person’s specific concern will usually determine the type of doctor they choose.</p>
        </div>
        <div className="row g-4">
          <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
            <div className="service-item">
              <div className="icon-box-primary mb-4">
                <i className="bi bi-heart-pulse text-dark"></i>
              </div>
              <h5 className="mb-3">Anesthesiologists</h5>
              <p className="mb-4">These doctors give you drugs to numb your pain or to put you under during surgery, childbirth, or other procedures. They monitor your vital signs while you’re under anesthesia.</p>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
            <div className="service-item">
              <div className="icon-box-primary mb-4">
                <i className="bi bi-lungs text-dark"></i>
              </div>
              <h5 className="mb-3">Cardiologists</h5>
              <p className="mb-4">They’re experts on the heart and blood vessels. You might see them for heart failure, a heart attack, high blood pressure, or an irregular heartbeat.</p>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.5s">
            <div className="service-item">
              <div className="icon-box-primary mb-4">
                <i className="bi bi-virus text-dark"></i>
              </div>
              <h5 className="mb-3">Dermatologists</h5>
              <p className="mb-4">Have problems with your skin, hair, nails? Do you have moles, scars, acne, or skin allergies? Dermatologists can help.</p>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.7s">
            <div className="service-item">
              <div className="icon-box-primary mb-4">
                <i className="bi bi-capsule-pill text-dark"></i>
              </div>
              <h5 className="mb-3">Family Physicians</h5>
              <p className="mb-4">They care for the whole family, including children, adults, and the elderly. They do routine checkups and screening tests, give you flu and immunization shots, and manage diabetes and other ongoing medical conditions.</p>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
            <div className="service-item">
              <div className="icon-box-primary mb-4">
                <i className="bi bi-capsule text-dark"></i>
              </div>
              <h5 className="mb-3">Neurologists</h5>
              <p className="mb-4">These are specialists in the nervous system, which includes the brain, spinal cord, and nerves. They treat strokes, brain and spinal tumors, epilepsy, Parkinson's disease, and Alzheimer's disease.</p>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
            <div className="service-item">
              <div className="icon-box-primary mb-4">
                <i className="bi bi-prescription2 text-dark"></i>
              </div>
              <h5 className="mb-3">Psychiatrists</h5>
              <p className="mb-4">These doctors work with people with mental, emotional, or addictive disorders. They can diagnose and treat depression, schizophrenia, substance abuse, anxiety disorders, and sexual and gender identity issues. Some psychiatrists focus on children, adolescents, or the elderly.</p>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.5s">
            <div className="service-item">
              <div className="icon-box-primary mb-4">
                <i className="bi bi-clipboard2-pulse text-dark"></i>
              </div>
              <h5 className="mb-3">Rheumatologists</h5>
              <p className="mb-4">They specialize in arthritis and other diseases in your joints, muscles, bones, and tendons. You might see them for your osteoporosis (weak bones), back pain, gout, tendinitis from sports or repetitive injuries, and fibromyalgia.</p>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.7s">
            <div className="service-item">
              <div className="icon-box-primary mb-4">
                <i className="bi bi-file-medical text-dark"></i>
              </div>
              <h5 className="mb-3">General Surgeons</h5>
              <p className="mb-4">These doctors can operate on all parts of your body. They can take out tumors, appendices, or gallbladders and repair hernias. Many surgeons have subspecialties, like cancer, hand, or vascular surgery.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container-fluid bg-dark text-light footer wow fadeIn" data-wow-delay="0.1s">
            <div class="container pb-5">
                <div class="row g-5">
                    
                    <div class="col-md-6 col-lg-3">
                        <h6 class="section-title text-start text-primary text-uppercase mb-4">Contact</h6>
                        <p className="mb-2">
        <FontAwesomeIcon icon={faMapMarkerAlt} className="me-3" />
        123 Street, New York, USA
      </p>
      <p className="mb-2">
        <FontAwesomeIcon icon={faPhoneAlt} className="me-3" />
        +012 345 67890
      </p>
      <p className="mb-2">
        <FontAwesomeIcon icon={faEnvelope} className="me-3" />
        info@example.com
      </p>
                        <div class="d-flex pt-2">
                        <a className="btn btn-outline-light btn-social" href="">
        <FaTwitter />
      </a>
      <a className="btn btn-outline-light btn-social" href="">
        <FaFacebookF />
      </a>
      <a className="btn btn-outline-light btn-social" href="">
        <FaYoutube />
      </a>
      <a className="btn btn-outline-light btn-social" href="">
        <FaLinkedinIn />
      </a>
                        </div>
                    </div>
                    <div class="col-lg-5 col-md-12">
                        <div class="row gy-5 g-4">
                            <div class="col-md-6">
                                <h6 class="section-title text-start text-primary text-uppercase mb-4">Company</h6>
                                <a className="btn btn-link" href="#">About Us</a>
      <a className="btn btn-link" href="#">Contact Us</a>
      <a className="btn btn-link" href="#">Privacy Policy</a>
      <a className="btn btn-link" href="#">Terms & Condition</a>
      <a className="btn btn-link" href="#">Support</a>
                            </div>
                            <div class="col-md-6">
                                <h6 class="section-title text-start text-primary text-uppercase mb-4">Services</h6>
                                <a class="btn btn-link" href="">Food & Restaurant</a>
                                <a class="btn btn-link" href="">Spa & Fitness</a>
                                <a class="btn btn-link" href="">Sports & Gaming</a>
                                <a class="btn btn-link" href="">Event & Party</a>
                                <a class="btn btn-link" href="">GYM & Yoga</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container">
                <div class="copyright">
                    <div class="row">
                        <div class="col-md-6 text-center text-md-start mb-3 mb-md-0">
                            &copy; <a class="border-bottom" href="#">Your Site Name</a>, All Right Reserved. 
							
							*** This template is free as long as you keep the footer author’s credit link/attribution link/backlink. If you'd like to use the template without the footer author’s credit link/attribution link/backlink, you can purchase the Credit Removal License from "https://htmlcodex.com/credit-removal". Thank you for your support. ***
							Designed By <a class="border-bottom" href="https://htmlcodex.com">HTML Codex</a>
                        </div>
                        <div class="col-md-6 text-center text-md-end">
                            <div class="footer-menu">
                                <a href="">Home</a>
                                <a href="">Cookies</a>
                                <a href="">Help</a>
                                <a href="">FQAs</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    
  );
}

export default Main;
