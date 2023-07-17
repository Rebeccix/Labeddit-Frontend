import axios from "axios";
import { GlobalContext } from "./GlobalContext"
import { useState } from "react";
import { BASE_URL } from "../constants/url";

export const GlobalState = (props) => {
  const [posts, setPosts] = useState([]);
  const [postCommentPage, setPostCommentPage] = useState([])
  const [alert, setAlert] = useState([])
  const [popUp, setPopUp] = useState(true)

  // const setAlertInfo = (text, type) => {
  //   setAlert({
  //     text,
  //     type
  //   })
  // }

  const getPosts = () => {
    axios.get(`${BASE_URL}/posts`, {
      headers: {
        Authorization: localStorage.getItem("token")
      }
    }) 
    .then((res) => {
      setPosts(res.data)
    })
    .catch((error) => {
      console.log(error)
    })
  }

  const getCommentaries = (id) => {
    axios
      .get(`${BASE_URL}/commentary/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => setPostCommentPage(response.data))
      .catch((error) => console.log(error));
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

      window.location.href.includes("commentary") ? 
      getCommentaries(id)
      :
      getPosts();
    } catch (error) {
      console.log(error);
    }
  };

  let data = { posts, setPosts, postCommentPage, setPostCommentPage, getPosts, getCommentaries, likeDislikePostButton, alert ,setAlert, popUp, setPopUp};

  return (
    <GlobalContext.Provider value={data}>
      {props.children}
    </GlobalContext.Provider>
  );
};