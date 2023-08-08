import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FeedbackForm = () => {
  const navigate = useNavigate(); // Initialize the useNavigate hook
  
  const [feedbackData, setFeedbackData] = useState({
    travellers_id: localStorage.getItem("travellers_id"),
    package_id: localStorage.getItem("package_id"),
    rating: "",
    comments: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFeedbackData((prevFeedbackData) => ({ ...prevFeedbackData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post("https://localhost:7084/api/Feedback", feedbackData);
      console.log("Feedback submitted successfully:", response.data);
      
      // Use navigate to move to another route, e.g., "/thank-you" after successful feedback submission
      navigate("/main");
    } catch (error) {
      console.error("Error submitting feedback:", error);
      // You can handle the error here, such as displaying an error message to the user.
    }
  };

  return (
    <div
      className="container-fluid bg-image"
      style={{
        backgroundImage: "url('https://www.candorblog.com/wp-content/uploads/2017/05/travel-022.jpg')",
        minHeight: "100vh",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="card bg-light-transparent" style={{ width: "400px", padding: "20px", borderRadius: "10px", opacity: "0.8" }}>
        <h2 className="card-title mb-4">Feedback Form</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="rating" className="form-label">
              Rating:
            </label>
            <input
              type="number"
              className="form-control"
              id="rating"
              name="rating"
              value={feedbackData.rating}
              onChange={handleChange}
              required
              min="1"
              max="5"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="comments" className="form-label">
              Comments:
            </label>
            <textarea
              className="form-control"
              id="comments"
              name="comments"
              value={feedbackData.comments}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit Feedback
          </button>
        </form>
      </div>
    </div>
  );
};

export default FeedbackForm;
