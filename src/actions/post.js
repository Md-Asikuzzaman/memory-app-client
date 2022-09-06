import * as api from "./../api";

export const allPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts();

    dispatch({
      type: "FETCH",
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const newPost = (postData) => async (dispatch) => {
  try {
    const { data } = await api.createPost(postData);

    dispatch({
      type: "CREATE",
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.removePost(id);

    dispatch({
      type: "DELETE",
      payload: id,
    });
  } catch (error) {
    console.log(error);
  }
};

export const upgradePost = (newData, id) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(newData, id);

    dispatch({
      type: "UPDATE",
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);

    dispatch({
      type: "LIKE",
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};
