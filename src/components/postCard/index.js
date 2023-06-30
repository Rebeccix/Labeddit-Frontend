import { useContext, useEffect } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { Text, Flex, Image } from "@chakra-ui/react";
import { theme } from "../../styles/theme";
import { like, dislike, comment } from "../../assets";
import { goToCommentary } from "../../routes/coordinator";
import { useNavigate } from "react-router-dom";
import { PostsCardStyled } from "./styled";
import { BASE_URL } from "../../constants/url";
import axios from "axios";

export const PostCard = () => {
  const context = useContext(GlobalContext);
  const { posts, comments, getPosts } = context;
  const navigate = useNavigate();
  const href = window.location.href;

  useEffect(() => {
    getPosts();
  }, []);

  const likeDislikeButton = async (id, like) => {
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
      getPosts()
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <>
      <PostsCardStyled>
        {href.includes("posts")
          ? posts.map((data) => {
              return (
                <div className="Container-posts" key={data.id}>
                  <Text
                    fontSize={theme.fontSizes.sendedby}
                    color={theme.color.postTextColor}
                  >
                    Enviado por: {data.name}
                  </Text>
                  <Text mt="18px" mb="18px" fontSize={theme.fontSizes.post}>
                    {data.content}
                  </Text>
                  <div>
                    <Flex align="space-between" w="98px" h="27.89px" mr="10px">
                      <Image
                        cursor="pointer"
                        src={like}
                        alt="botão de like"
                        onClick={() => likeDislikeButton(data.id, true)}
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
                        onClick={() => likeDislikeButton(data.id, false)}
                      />
                    </Flex>
                    <Flex
                      w="65.33px"
                      h="27.89px"
                      onClick={() => goToCommentary(navigate, data.id)}
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
                        {data.comments}
                      </Text>
                    </Flex>
                  </div>
                </div>
              );
            })
          : comments.map((data) => {
              return (
                <div className="Container-posts" key={data.id}>
                  <Text
                    fontSize={theme.fontSizes.sendedby}
                    color={theme.color.postTextColor}
                  >
                    Enviado por: {data.sendedBy}
                  </Text>
                  <Text mt="18px" mb="18px" fontSize={theme.fontSizes.post}>
                    {data.comment}
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
                      <Image
                        cursor="pointer"
                        src={dislike}
                        alt="botão de dislike"
                      />
                    </Flex>
                  </div>
                </div>
              );
            })}
      </PostsCardStyled>
    </>
  );
};
