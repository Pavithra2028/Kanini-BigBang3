import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook

export default function Admin() {
  const [admin_password, passwordupdate] = useState('');
  const [admin_name, userNameupdate] = useState('');
  useEffect(() => {
    sessionStorage.clear();
  }, []);
  const navigate = useNavigate();

  const ProceedLoginusingAPI = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log('proceed');
      let inputobj = {
        admin_name: admin_name,
        admin_password: admin_password,
      };
      console.log(JSON.stringify(inputobj));
      fetch('https://localhost:7203/api/Token/Admin', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(inputobj),
      })
        .then((res) => {
          return res.text();
        })
        .then((resp) => {
          console.log(resp);
          toast.success('Success');
          localStorage.setItem('token', resp);
          navigate('/adminpage'); // Change '/dashboard' to your desired route

        })
        .catch((err) => {
          toast.error('Login Failed due to :' + err.message);
        });
    }
  };

  const validate = () => {
    let result = true;
    if (admin_name.trim() === '') {
      result = false;
      toast.warning('Please Enter Username');
    }
    if (admin_password.trim() === '') {
      result = false;
      toast.warning('Please Enter Password');
    }
    return result;
  };

  return (
    <div className="row" >
      <style>
        {`
/* admin.css */
.login-button1 {
    background-color: #007bff;
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
  }
  
  .login-button1:hover {
    background-color: #0069d9;
  }
  .card12 {
    background: linear-gradient(to bottom, #67a3e3, #0069d9) ;
    border: 1px solid #dee2e6;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 20px;
  }
  .card-body1 {
    margin-top: 20px;
  }
  .login-heading1 {
    text-align: center;
    color: #fff;
    font-size: 24px;
    margin-top: 10px;
  }
  .form-group1{
   
    color: #fff;
    font-size: 14px;
    margin-top: 10px;
  }
`}
</style>
      <div className="col-12  d-flex justify-content-center align-items-center" style={{ minHeight: '50vh' }}>
        <div className="col-3">
          <form onSubmit={ProceedLoginusingAPI}>
            <div className="card12">
              <h2 className="login-heading1">Admin Login</h2>
              <div className="card-body1">
                <div className="form-group1">
                  <label>User Name<span className="errmsg">*</span></label>
                  <input
                    value={admin_name}
                    onChange={(e) => userNameupdate(e.target.value)}
                    className="form-control"
                  />
                </div>
                <div className="form-group1">
                  <label>Password <span className="errmsg">*</span></label>
                  <input
                    type="password"
                    value={admin_password}
                    onChange={(e) => passwordupdate(e.target.value)}
                    className="form-control"
                  />
                </div>
                <div className="text-center">
                  <button type="submit" className="login-button1">
                    Login
                  </button>

                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
