import React, { useState, useEffect } from "react";
import { Avatar } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

const Header = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const token = user?.token;

    // JWT...
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  // handle logout
  const handleLogOut = (e) => {
    e.preventDefault();
    dispatch({
      type: "LOGOUT",
    });

    setUser(null);
    navigate("/auth");
  };

  return (
    <div className="d-flex bg-info py-3 px-5 rounded-pill align-items-center justify-content-between text-white mb-4">
      <h4 className="mb-0">
        <Link className="text-decoration-none text-white" to={"/"}>
          My Memories
        </Link>
      </h4>
      <div className="toolbar">
        {user ? (
          <div className="d-flex align-items-center">
            <Avatar src={user.result.imageUrl} alt={user.result.name}>
              {user.result.name.charAt(0)}
            </Avatar>

            <h6 className="ms-2">{user.result.name}</h6>
            <button
              className="btn btn-danger btn-sm ms-3"
              onClick={handleLogOut}
            >
              Logout
            </button>
          </div>
        ) : (
          <div>
            <Link to={"/auth"}>
              <button className="btn btn-primary btn-sm">Login</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
