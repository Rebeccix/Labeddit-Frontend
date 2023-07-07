import { useContext, useState } from "react";
import { Header, PostCard } from "../../components";
import { Textarea, Button, Divider } from "@chakra-ui/react";
import { theme } from "../../styles/theme";
import { PostsStyled } from "./styled";
import { useProtectedPage } from "../../hooks/useProtectedPage";
import { BASE_URL } from "../../constants/url";
import { GlobalContext } from "../../context/GlobalContext";

import axios from "axios";

export const PostsPage = () => {
  useProtectedPage();
  let [textBox, setTextBox] = useState("");
  let [isValidTextarea, setIsValidTextarea] = useState(false);

  const context = useContext(GlobalContext);

  const { getPosts } = context;

  const onChangeInputs = (e) => {
    setTextBox(e.target.value);
  };

  const onSubmit = async () => {
    if (textBox === "") {
      setIsValidTextarea(true);
    } else {
      setIsValidTextarea(false);

      try {
        await axios.post(
          `${BASE_URL}/posts`,
          { content: textBox },
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        setTextBox("");
        getPosts();
      } catch (error) {
        alert(error.response.data);
      }
    }
  };

  return (
    <>
      <Header />
      <PostsStyled>
        <Textarea
          isInvalid={isValidTextarea}
          value={textBox}
          onChange={onChangeInputs}
          placeholder="Escreva seu post..."
        />
        <Button
          mt="12px"
          w={theme.sizes.width.buttonWidth}
          h={theme.sizes.heigth.buttonHeight}
          borderRadius={theme.sizes.width.buttoBorderRadiusMinor}
          color="white"
          bgGradient={theme.color.buttonGradient}
          type="submit"
          onClick={() => onSubmit()}
        >
          Postar
        </Button>
        <Divider
          mt="32px"
          mb="26px"
          h="1.5px"
          w="100%"
          bgGradient={theme.color.buttonGradient}
        />
        <PostCard />
      </PostsStyled>
    </>
  );
};
