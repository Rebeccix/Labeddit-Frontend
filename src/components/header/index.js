import { HeaderStyled } from "./styled";
import { logo, exit } from "../../assets";
import { Button, Image, Spacer, Box } from "@chakra-ui/react";
import { theme } from "../../styles/theme";
import { goToLogin, goToPosts } from "../../routes/coordinator";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const href = window.location.href;
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    goToLogin(navigate);
  };
  return (
    <HeaderStyled>
      {href.includes("commentary") ? (
        <Box w="55px">
          <Button variant="link">
          <Image boxSize="25px" src={exit} alt="" 
          onClick={() => goToPosts(navigate)}
          />
          </Button>
        </Box>
      ) : (
        <Box w="55px" />
      )}
      <Spacer />
      <Button variant="link">
        <Image
          boxSize="28px"
          cursor="cursor"
          src={logo}
          alt=""
          onClick={() => goToPosts(navigate)}
        />
      </Button>
      <Spacer />
      {href.includes("Signup") ? (
        <Button
          fontSize={theme.fontSizes.button}
          w="55px"
          h="25px"
          color={theme.color.headerButton}
          variant="link"
          onClick={() => goToLogin(navigate)}
        >
          Entrar
        </Button>
      ) : (
        <Button
          fontSize={theme.fontSizes.button}
          w="55px"
          h="25px"
          color={theme.color.headerButton}
          variant="link"
          onClick={logout}
        >
          Logout
        </Button>
      )}
    </HeaderStyled>
  );
};
