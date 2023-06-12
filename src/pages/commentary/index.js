import { Header, PostCard } from "../../components";
import { Divider, Textarea, Button, Flex, Text, Image } from "@chakra-ui/react";
import { like, dislike, comment } from "../../assets";
import { theme } from "../../styles/theme";
import { CommentaryStyled } from "./styled";
import { useContext, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { useNavigate } from "react-router-dom";
import { goToCommentary } from "../../routes/coordinator";
import { useParams } from "react-router"

export const CommentaryPage = () => {
  const { id } = useParams()

  let [textBox, setTextBox] = useState("");
  let [isValidTextarea, setIsValidTextarea] = useState(false);

  const navigate = useNavigate();

  const context = useContext(GlobalContext);
  const { posts, comments ,setComments } = context;

  const onChangeInputs = (e) => {
    setTextBox(e.target.value);
  };

  const onSubmit = () => {
    if (textBox === "") {
      setIsValidTextarea(true);
    } else {
      setIsValidTextarea(false)
      setComments([...comments, {
        id: Date.now(),
        sendedBy: 'Casquinha doce',
        comment: textBox,
        likes: '12k',
      }])
      setTextBox("");
    }
  };
  
  const data = posts.find((post) => post.id === +id);

  return (
    <>
      <Header />
      <CommentaryStyled>
        <div className="Container-posts" key={data.id}>
          <Text
            fontSize={theme.fontSizes.sendedby}
            color={theme.color.postTextColor}
          >
            Enviado por: {data.sendedBy}
          </Text>
          <Text mt="18px" mb="18px" fontSize={theme.fontSizes.post}>
            {data.post}
          </Text>
          <div>
            <Flex align="space-between" w="98px" h="27.89px" mr="10px">
              <Image cursor="pointer" src={like} alt="botão de like" />
              <Text
                color={theme.color.likeDislikeCommentButtonColor}
                fontSize={theme.fontSizes.likeDislikeCommentButton}
              >
                {data.likes}
              </Text>
              <Image cursor="pointer" src={dislike} alt="botão de dislike" />
            </Flex>
            <Flex
              w="65.33px"
              h="27.89px"
              onClick={() => goToCommentary(navigate, data.id)}
            >
              <Image cursor="pointer" src={comment} alt="botão de comentario" />
              <Text
                color={theme.color.likeDislikeCommentButtonColor}
                fontSize={theme.fontSizes.likeDislikeCommentButton}
              >
                {data.commentary}
              </Text>
            </Flex>
          </div>
        </div>
        <Textarea
          h="131px"
          isInvalid={isValidTextarea}
          value={textBox}
          onChange={onChangeInputs}
          placeholder="Adicionar um comentário"
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
          Responder
        </Button>
        <Divider
          mt="32px"
          mb="26px"
          h="1.5px"
          w="100%"
          bgGradient={theme.color.buttonGradient}
        />
        <PostCard />
      </CommentaryStyled>
    </>
  );
};
