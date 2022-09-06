import React from "react";
import { Delete, MoreVert, ThumbUp, ThumbUpOutlined } from "@material-ui/icons";
import moment from "moment";
import { useDispatch } from "react-redux";
import { deletePost, likePost } from "../../../actions/post";

const user = JSON.parse(localStorage.getItem("profile"));

const Post = ({ post, setId }) => {
  const dispatch = useDispatch();

  const Likes = () => {
    if (post.likes.length > 0) {
      return post.likes.find(
        (like) => like === user?.result?._id || like === user?.result?.googleId
      ) ? (
        <>
          <ThumbUp className="text-like" />
          &nbsp;
          {post.likes.length > 2
            ? `You and ${post.likes.length - 1} others`
            : `${post.likes.length} Like${post.likes.length > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          <ThumbUpOutlined className="text-unlike" />
          &nbsp;
          {post.likes.length}
          &nbsp;
          {post.likes.length === 1 ? "Like" : "Likes"}
        </>
      );
    }
    return (
      <>
        <ThumbUpOutlined className="text-unlike" />
        Like
      </>
    );
  };

  const handleDelete = (id) => {
    var data = window
      .prompt('Please Enter "Confirm"')
      ?.toLocaleLowerCase()
      .trim();

    if (data === "confirm") {
      dispatch(deletePost(id));
    }
  };
  return (
    <div className="col-12 col-lg-4">
      <div className="card my-2">
        <div className="img__box">
          <img
            className="card-img-top card__img"
            src={post.selectedFile}
            alt="img"
          />
          <div className="header__wrapper">
            <div className="auth__date">
              <h5 className="mb-0">{post.name}</h5>
              <span>{moment(post.createdAt).fromNow()}</span>
            </div>
            <div className="dots">
              <MoreVert className="pointer" onClick={() => setId(post._id)} />
            </div>
          </div>
        </div>
        <div className="card-body">
          <p className="mb-0">{post.tags.map((tag) => `#${tag} `)}</p>
          <h5>{post.title}</h5>
          <p>{post.message}</p>
        </div>
        <div className="card-footer d-flex justify-content-between align-items-center">
          <div className="like__box d-flex">
            <p
              className="mb-0 ms-2 d-flex justify-content-between align-items-center "
              onClick={() => dispatch(likePost(post._id))}
            >
              <Likes />
            </p>
          </div>

          <Delete
            className="pointer text-danger"
            onClick={() => handleDelete(post._id)}
          />
        </div>
      </div>
    </div>
  );
};

export default Post;
