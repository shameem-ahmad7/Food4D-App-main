import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Signup() {

  let navigate = useNavigate()

  const [credentials, setcredentials] = useState({
    name: "",
    email: "",
    password: "",
    geolocation: "",
  });

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(JSON.stringify({name:credentials.name, email:credentials.email, password:credentials.password,location:credentials.geolocation}))
    const response = await fetch("http://localhost:5000/api/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({name:credentials.name, email:credentials.email, password:credentials.password,location:credentials.geolocation}),
    })
    const json = await response.json();
    console.log(json);

    if (json.success) {
      //save the auth toke to local storage and redirect
      localStorage.setItem('token', json.authToken)
      navigate("/login") 

    }

    if(!json.success) alert("Enter Valid Credentials");
  };

  const onChange = (e) => {
    setcredentials({...credentials, [e.target.name]: e.target.value})
  }

  return (
    <div style={{backgroundImage: 'url("https://images.pexels.com/photos/326278/pexels-photo-326278.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")', height: '100vh', backgroundSize: 'cover' }} >
      <div>
      <Navbar />
      </div>
      <div className="container"> 
        <form onSubmit={handleSubmit} className='w-70% m-auto mt-5 p-5 border bg-dark border-success rounded'>
          <div className="mb-3">
            <label htmlFor="name" className="form-label" style={{color: "white"}}> 
              Name
            </label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={credentials.name}
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label" style={{color: "white"}}>
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={credentials.email}
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label" style={{color: "white"}}>
              Password
            </label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={credentials.password}
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="address" className="form-label" style={{color: "white"}}>
              Address
            </label>
            <input
              type="text"
              className="form-control"
              name="geolocation"
              value={credentials.geolocation}
              onChange={onChange}
            />
          </div>
          <button type="submit" className="m-3 btn btn-primary">
            Submit
          </button>
          <Link to="/login" className="m-3 btn btn-danger">
            Already a user?
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Signup;
