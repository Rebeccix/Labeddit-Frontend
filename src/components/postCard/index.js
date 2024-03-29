import { GlobalContext } from "../../context/GlobalContext";
import {
  Text,
  Flex,
  Image,
  Slide,
  useDisclosure,
  Fade,
} from "@chakra-ui/react";
import { goToCommentary } from "../../routes/coordinator";
import { like, dislike, comment } from "../../assets";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../constants/url";
import { ErrorMessage } from "../errorMessage";
import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { PostsCardStyled } from "./styled";
import { theme } from "../../styles/theme";
import { exit } from "../../assets";
import { Loading } from "../loading";
import axios from "axios";

export const PostCard = () => {
  const { isOpen, onToggle } = useDisclosure();
  const context = useContext(GlobalContext);
  const {
    posts,
    postCommentPage,
    getPosts,
    getCommentaries,
    likeDislikePostButton,
    popUp,
    setPopUp,
    setAlert,
  } = context;
  const { id } = useParams();
  const idParams = id;
  const navigate = useNavigate();
  const href = window.location.href;

  useEffect(() => {
    getPosts();
  }, []);

  const likeDislikeCommentaryButton = async (id, like) => {
    try {
      await axios.put(
        `${BASE_URL}/commentary/${id}/like`,
        {
          like: like ? true : false,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      getCommentaries(postCommentPage.id);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const DeletePostOrCommentary = async (id, data) => {
    try {
      await axios.delete(`${BASE_URL}/${data}/${id}`, {
        headers: { Authorization: localStorage.getItem("token") },
      });
      data === "posts" ? getPosts() : getCommentaries(idParams);
    } catch (error) {
      onToggle();
      setPopUp(false);
      setAlert(error.response.data);
    }
  };

  if (!popUp) {
    setTimeout(() => {
      onToggle();
      setPopUp(true);
    }, 7000);
  }

  return (
    <>
      <Slide direction="left" in={isOpen}>
        <ErrorMessage />
      </Slide>
      <PostsCardStyled>
        {href.includes("posts") ? (
          posts.length === 0 ? (
            <Loading />
          ) : (
            posts.map((data) => {
              return (
                <Fade in={true}>
                  <div className="Container-posts" key={data.id}>
                    <Flex 
                    align="center"
                    justify="space-between">
                      <Text
                        fontSize={theme.fontSizes.sendedby}
                        color={theme.color.postTextColor}
                      >
                        Enviado por: {data.name}
                      </Text>
                      <Image
                        cursor="pointer"
                        boxSize="18px"
                        src={exit}
                        alt=""
                        onClick={() => DeletePostOrCommentary(data.id, "posts")}
                      />
                    </Flex>
                    <Text mt="18px" mb="18px" fontSize={theme.fontSizes.post}>
                      {data.content}
                    </Text>
                    <div>
                      <Flex
                        align="space-between"
                        w="98px"
                        h="27.89px"
                        mr="10px"
                      >
                        <Image
                          cursor="pointer"
                          src={like}
                          alt="botão de like"
                          borderRadius='full'
                          onClick={() => likeDislikePostButton(data.id, true)}
                        />
                        <Text
                          color={theme.color.likeDislikeCommentButtonColor}
                          fontSize={theme.fontSizes.likeDislikeCommentButton}
                        >
                          {data.like - data.dislike}
                        </Text>
                        <Image
                          cursor="pointer"
                          src={dislike}
                          alt="botão de dislike"
                          onClick={() => likeDislikePostButton(data.id, false)}
                        />
                      </Flex>
                      <Flex
                        w="65.33px"
                        h="27.89px"
                        cursor="pointer"
                        onClick={() => goToCommentary(navigate, data.id)}
                      >
                        <Image src={comment} alt="botão de comentario" />
                        <Text
                          color={theme.color.likeDislikeCommentButtonColor}
                          fontSize={theme.fontSizes.likeDislikeCommentButton}
                        >
                          {data.comments}
                        </Text>
                      </Flex>
                    </div>
                  </div>
                </Fade>
              );
            })
          )
        ) : postCommentPage.commentaries.length === 0 ? (
          <Loading />
        ) : (
          postCommentPage.commentaries.map((data) => {
            return (
              <Fade in={true}>
                <div className="Container-posts" key={data.idCommentary}>
                  <Flex justify="space-between">
                    <Text
                      fontSize={theme.fontSizes.sendedby}
                      color={theme.color.postTextColor}
                    >
                      Enviado por: {data.creatorName}
                    </Text>
                    <Image
                      cursor="pointer"
                      boxSize="18px"
                      src={exit}
                      alt=""
                      onClick={() =>
                        DeletePostOrCommentary(data.idCommentary, "commentary")
                      }
                    />
                  </Flex>
                  <Text mt="18px" mb="18px" fontSize={theme.fontSizes.post}>
                    {data.contentCommentary}
                  </Text>
                  <div>
                    <Flex align="space-between" w="98px" h="27.89px" mr="10px">
                      <Image
                        cursor="pointer"
                        src={like}
                        alt="botão de like"
                        onClick={() =>
                          likeDislikeCommentaryButton(data.idCommentary, true)
                        }
                      />
                      <Text
                        color={theme.color.likeDislikeCommentButtonColor}
                        fontSize={theme.fontSizes.likeDislikeCommentButton}
                      >
                        {data.likeCommentary - data.dislikeCommentary}
                      </Text>
                      <Image
                        cursor="pointer"
                        src={dislike}
                        alt="botão de dislike"
                        onClick={() =>
                          likeDislikeCommentaryButton(data.idCommentary, false)
                        }
                      />
                    </Flex>
                  </div>
                </div>
              </Fade>
            );
          })
        )}
      </PostsCardStyled>
    </>
  );
};
