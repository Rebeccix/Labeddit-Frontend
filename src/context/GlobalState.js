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
        Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijg2NmYwMmFiLTdkZjAtNDFmNC1hY2QxLWZiY2M4NzBiNDNiNCIsIm5hbWUiOiJ0ZXN0Iiwicm9sZSI6Ik5PUk1BTCIsImlhdCI6MTY4NzY2MjE1NCwiZXhwIjoxNjg4MjY2OTU0fQ.7n27b4V2do9SYNHCBL-Et1wZnwLGy35Bb9THJjNVtGk"
      }
    }) 
    .then((res) => {
      setPosts(res.data)
    })
    .catch((err) => {
      alert(err.response.data.message)
    })
  }

  let data = {posts, setPosts, comments, setComments, getPosts};

  return (
    <GlobalContext.Provider value={data}>
      {props.children}
    </GlobalContext.Provider>
  );
};

// [
//   {
//     id: 1,
//     sendedBy: "labeuno83",
//     post: "Porque a maioria dos desenvolvedores usam Linux? ou as empresas de tecnologia usam Linux ?",
//     likes: 164,
//     commentary: 61,
//   },
//   {
//     id: 2,
//     sendedBy: "labeuno2",
//     post: "Qual super poder vc gostaria de ter?",
//     likes: 12,
//     commentary: 10,
//   },
//   {
//     id: 3,
//     sendedBy: "labeuno23",
//     post: "Se você pudesser ter qualquer tipo de pet, qual você escolheria?",
//     likes: 1211,
//     commentary: 6317,
//   },
// ]

// ----------------------------------------

// [
//   {
//     id: 1,
//     sendedBy: "labeuno12",
//     comment: "teste 1",
//     likes: 164,
//   },    {
//     id: 2,
//     sendedBy: "labeuno1999",
//     comment: "teste 2",
//     likes: 2521,
//   },    {
//     id: 3,
//     sendedBy: "labeuno6443",
//     comment: "teste 3",
//     likes: 12,
//   }
// ]