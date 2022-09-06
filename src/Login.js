import React, { useState, useEffect } from "react";
import { GoogleLogin } from "react-google-login";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { signin, signup } from "./actions/auth";

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("profile")) {
      navigate("/");
    }
  }, [navigate]);

  //   handle submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignUp) {
      dispatch(signup(formData, navigate));
    } else {
      dispatch(signin(formData, navigate));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setIsSignUp((prevState) => {
      setIsSignUp(!prevState);
    });
  };

  // Google login
  const googleFailure = () => {
    console.log("Something Wrong!");
  };

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch({
        type: "AUTH",
        data: {
          result,
          token,
        },
      });

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="form__wrapper col-5 mx-auto">
      <h4 className="mb-3">{isSignUp ? "Sign Up" : "Sign in"}</h4>
      <form onSubmit={handleSubmit}>
        {isSignUp && (
          <>
            <input
              onChange={handleChange}
              name="firstName"
              value={formData.firstName}
              className="form-control mt-2"
              type="text"
              placeholder="First name *"
            />
            <input
              onChange={handleChange}
              name="lastName"
              value={formData.lastName}
              className="form-control mt-2"
              type="text"
              placeholder="Last name *"
            />
          </>
        )}
        <input
          onChange={handleChange}
          name="email"
          value={formData.email}
          className="form-control mt-2"
          type="text"
          placeholder="Email address *"
        />
        <input
          onChange={handleChange}
          name="password"
          value={formData.password}
          className="form-control mt-2"
          type="text"
          placeholder="Password *"
        />
        {isSignUp && (
          <input
            onChange={handleChange}
            name="confirmPassword"
            value={formData.confirmPassword}
            className="form-control mt-2"
            type="text"
            placeholder="Retype password *"
          />
        )}
        <div className="d-grid">
          <button className="btn btn-success mt-4">
            {isSignUp ? "Sign Up" : "Sign In"}
          </button>
        </div>
        <GoogleLogin
          className="google mt-2 pointer"
          clientId="255641062792-eq67sotbhfi87j9illdo2rai8esjn127.apps.googleusercontent.com"
          buttonText={isSignUp ? "Sign Up with Google" : "Sign in with Google"}
          onSuccess={googleSuccess}
          onFailure={googleFailure}
          cookiePolicy={"single_host_origin"}
        />
        <p onClick={handleLogin} className="pt-2 text-center pointer">
          {isSignUp
            ? "Already have an account ? sign in"
            : "Dont't have an account ? sign up"}
        </p>
      </form>
    </div>
  );
};

export default Login;
