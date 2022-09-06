import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { allPosts } from "./actions/post";
import Form from "./components/Form/Form";
import Posts from "./components/Posts/Posts";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [id, setId] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("profile")) {
      navigate("/auth");
    }

    dispatch(allPosts());
  }, [dispatch, id, navigate]);
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12 col-lg-9 col-md-8">
            <Posts setId={setId} />
          </div>
          <div className="col-12 col-lg-3 col-md-4">
            <Form id={id} setId={setId} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
