import { Header, PostCard } from "../../components";
import { Divider, Textarea, Button, Flex, Text, Image } from "@chakra-ui/react";
import { like, dislike, comment } from "../../assets";
import { theme } from "../../styles/theme";
import { CommentaryStyled } from "./styled";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { useNavigate } from "react-router-dom";
import { goToCommentary } from "../../routes/coordinator";
import { useParams } from "react-router";
import { BASE_URL } from "../../constants/url";
import axios from "axios";
import { useProtectedPage } from "../../hooks/useProtectedPage";

export const CommentaryPage = () => {
  useProtectedPage()
  const { id } = useParams();

  let [textBox, setTextBox] = useState("");
  let [isValidTextarea, setIsValidTextarea] = useState(false);

  const navigate = useNavigate();

  const context = useContext(GlobalContext);
  const { comments, getCommentaries, likeDislikePostButton } = context;

  useEffect(() => {
    getCommentaries(id);
  }, []);

  const onChangeInputs = (e) => {
    setTextBox(e.target.value);
  };

  const onSubmit = async () => {
    if (textBox === "") {
      setIsValidTextarea(true);
    } else {
      try {
        await axios.post(
          `${BASE_URL}/commentary/${comments.id}`,
          { content: textBox },
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        getCommentaries(id);
      } catch (error) {
        alert(error.response.data.message);
      }
    }
  };

  return (
    <>
      <Header />
      {comments.length === 0 ? (
        <></>
      ) : (
        <CommentaryStyled>
          <div className="Container-posts" key={comments.id}>
            <Text
              fontSize={theme.fontSizes.sendedby}
              color={theme.color.postTextColor}
            >
              Enviado por: {comments.creatorName}
            </Text>
            <Text mt="18px" mb="18px" fontSize={theme.fontSizes.post}>
              {comments.content}
            </Text>
            <div>
              <Flex align="space-between" w="98px" h="27.89px" mr="10px">
                <Image cursor="pointer" src={like} alt="botão de like" onClick={() => likeDislikePostButton(comments.id, true)}/>
                <Text
                  color={theme.color.likeDislikeCommentButtonColor}
                  fontSize={theme.fontSizes.likeDislikeCommentButton}
                >
                  {comments.like - comments.dislike}
                </Text>
                <Image cursor="pointer" src={dislike} alt="botão de dislike" onClick={() => likeDislikePostButton(comments.id, false)}/>
              </Flex>
              <Flex
                w="65.33px"
                h="27.89px"
                onClick={() => goToCommentary(navigate, comments.id)}
              >
                <Image
                  cursor="pointer"
                  src={comment}
                  alt="botão de comentario"
                />
                <Text
                  color={theme.color.likeDislikeCommentButtonColor}
                  fontSize={theme.fontSizes.likeDislikeCommentButton}
                >
                  {comments.commentaries.length}
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
      )}
    </>
  );
};
