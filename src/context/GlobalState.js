import axios from "axios";
import { GlobalContext } from "./GlobalContext"
import { useState } from "react";
import { BASE_URL } from "../constants/url";

export const GlobalState = (props) => {
  let [posts, setPosts] = useState([]);
  let [comments, setComments] = useState([])

  const getPosts = () => {
    axios.get(`${BASE_URL}/posts`, {
      headers: {
        Authorization: localStorage.getItem("token")
      }
    }) 
    .then((res) => {
      setPosts(res.data)
    })
    .catch((err) => {
      alert(err.response.data.message)
    })
  }

  const getCommentaries = (id) => {
    axios
      .get(`${BASE_URL}/commentary/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => setComments(response.data))
      .catch((error) => alert(error.response.data.message));
  };

  const likeDislikePostButton = async (id, like) => {
    try {
      await axios.put(
        `${BASE_URL}/posts/${id}/like`,
        { like: like ? true : false },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      getPosts();
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  let data = {posts, setPosts, comments, setComments, getPosts, getCommentaries, likeDislikePostButton};

  return (
    <GlobalContext.Provider value={data}>
      {props.children}
    </GlobalContext.Provider>
  );
};