import React, { useState, useEffect } from "react";
import "./Form.css";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { newPost, upgradePost } from "../../actions/post";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";
import { GitHub, FaceOutlined } from "@material-ui/icons";

const Form = ({ id, setId }) => {
  const [google, setGoogle] = useState("");
  const [facebook, setFacebook] = useState("");
  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });

  const user = JSON.parse(localStorage.getItem("profile"));

  const dispatch = useDispatch();

  const data = useSelector((state) =>
    id ? state.post.find((p) => p._id === id) : ""
  );

  useEffect(() => {
    if (data) {
      setPostData(data);
    }
  }, [data]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (id) {
      dispatch(upgradePost({ ...postData, name: user?.result?.name }, id));
      setId(null);
    } else {
      dispatch(newPost({ ...postData, name: user?.result?.name }));
    }

    // clear
    setPostData({
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };

  // Facebook login

  const responseFacebook = (e) => {
    setFacebook(e.picture.data.url);
  };

  const componentClicked = () => {
    console.log("Clicked!!!");
  };

  if (!user?.result?.name) {
    return <h4>Please sign in</h4>;
  }

  return (
    <>
      <form
        className="border border-2 p-3 rounded-1 sticky-top overflow-hidden"
        onSubmit={handleSubmit}
      >
        <h5>{id ? "Updating a Memory" : "Creating a Memory"}</h5>

        <label htmlFor="title" className="mb-1">
          Title:
        </label>
        <input
          required
          className="form-control mb-2"
          type="text"
          id="title"
          placeholder="Enter title"
          name="title"
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />

        <label htmlFor="message" className="mb-1">
          Message:
        </label>
        <input
          required
          className="form-control mb-2"
          type="text"
          id="message"
          placeholder="Enter a message"
          name="message"
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />

        <label htmlFor="tags" className="mb-1">
          Tags:
        </label>
        <input
          required
          className="form-control mb-2"
          type="text"
          id="tags"
          placeholder="Enter tags"
          name="tags"
          value={postData.tags}
          onChange={(e) =>
            setPostData({ ...postData, tags: e.target.value.split(",") })
          }
        />

        <label htmlFor="fie" className="mb-1">
          Upload file:
        </label>

        <FileBase
          required
          className="d-none"
          type="file"
          multiple={false}
          onDone={({ base64 }) =>
            setPostData({
              ...postData,
              selectedFile: base64,
            })
          }
        />

        <button className="btn btn-success mt-3" type="submit">
          {id ? "UPDATE" : "SUBMIT"}
        </button>
      </form>
      <br />
      <br />
      {/* {google && (
        <img
          src={google}
          alt="google"
          height={50}
          width={50}
          className="rounded-pill"
        />
      )} */}
      <br />
      {/* <GoogleLogin
        clientId="255641062792-eq67sotbhfi87j9illdo2rai8esjn127.apps.googleusercontent.com"
        buttonText="Login with Google"
        onSuccess={googleSuccess}
        onFailure={googleFailure}
        cookiePolicy={"single_host_origin"}
      /> */}
      <br />
      <br />
      {/* {facebook && (
        <img
          src={facebook}
          height={50}
          width={50}
          className="rounded-pill"
          alt="facebook"
        />
      )} */}
      <br />
      {/* <FacebookLogin
        appId="311184241035338"
        autoLoad={true}
        fields="name,email,picture"
        // onClick={}
        callback={responseFacebook}
      /> */}
      <br />
    </>
  );
};

export default Form;
