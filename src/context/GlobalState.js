import { GlobalContext } from "./GlobalContext"
import { useState } from "react";

export const GlobalState = (props) => {
  let [posts, setPosts] = useState([
    {
      id: 1,
      sendedBy: "labeuno83",
      post: "Porque a maioria dos desenvolvedores usam Linux? ou as empresas de tecnologia usam Linux ?",
      likes: 164,
      commentary: 61,
    },
    {
      id: 2,
      sendedBy: "labeuno2",
      post: "Qual super poder vc gostaria de ter?",
      likes: 12,
      commentary: 10,
    },
    {
      id: 3,
      sendedBy: "labeuno23",
      post: "Se você pudesser ter qualquer tipo de pet, qual você escolheria?",
      likes: 1211,
      commentary: 6317,
    },
  ]);

  let data = {posts, setPosts};

  return (
    <GlobalContext.Provider value={data}>
      {props.children}
    </GlobalContext.Provider>
  );
};
