import { useContext, useState } from "react";
import { Header, PostCard } from "../../components";
import { Textarea, Button, Divider } from "@chakra-ui/react";
import { theme } from "../../styles/theme";
import { PostsStyled } from "./styled"
import { GlobalContext } from "../../context/GlobalContext";

export const PostsPage = () => {
  let [textBox, setTextBox] = useState("");
  let [isValidTextarea, setIsValidTextarea] = useState(false)
  
  const context = useContext(GlobalContext);
  const { posts, setPosts } = context;

  const onChangeInputs = (e) => {
    setTextBox(e.target.value);
  };

  const onSubmit = () => {
    if( textBox === "" ) {
      setIsValidTextarea(true)
    } else {
      setIsValidTextarea(false)
      setPosts([...posts, {
        id: Date.now(),
        sendedBy: 'Casquinha doce',
        post: textBox,
        likes: '12k',
        commentary: '7k'
      }])
      setTextBox('')
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
      </PostsStyled>
      <PostCard/>
    </>
  );
};
