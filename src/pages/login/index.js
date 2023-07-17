import { useContext, useState } from "react";
import { logo } from "../../assets";
import { theme } from "../../styles/theme";
import { LoginStyled } from "./styled";
import { useNavigate } from "react-router-dom";
import { ErrorMessage } from "../../components/errorMessage";
import { goToSignup, goToPosts } from "../../routes/coordinator";
import {
  Heading,
  Text,
  FormControl,
  Input,
  Button,
  Divider,
  Slide,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import { BASE_URL } from "../../constants/url";
import { GlobalContext } from "../../context/GlobalContext";

export const LoginPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errorEmail, setErrorEmail] = useState(true);
  const [errorPassword, setErrorPassword] = useState(true);

  const { isOpen, onToggle } = useDisclosure();

 const context = useContext(GlobalContext)

  const { setPopUp, popUp, setAlert } = context;

  const onChangeInputs = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const onSubmit = async () => {
    form.email === "" ? setErrorEmail(false) : setErrorEmail(true);
    form.password === "" ? setErrorPassword(false) : setErrorPassword(true);

    if (form.email !== "" && form.password !== "") {
      await axios
        .post(`${BASE_URL}/users/login`, form)
        .then((res) => {
          localStorage.setItem("token", res.data.token);
          goToPosts(navigate);
        })
        .catch((error) => {
          onToggle();
          setPopUp(false);
          setAlert(error.response.data);
        });
    }
  };

  const handleKeyPress = (e) => {
    if (e.code === "Enter") {
      onSubmit();
    }
  };

  if (!popUp) {
    setTimeout(() => {
      onToggle();
      setPopUp(true);
    }, 2000);
  }

  return (
    <>
      <Slide direction="left" in={isOpen}>
        <ErrorMessage />
      </Slide>
      <LoginStyled>
        <img src={logo} alt="" />
        <Heading fontSize={["1.875rem", "2.25rem"]}>LabEddit</Heading>
        <Text
          fontWeight={theme.fontWeights.normal}
          fontSize={theme.fontSizes.text}
        >
          O projeto de rede social da Labenu
        </Text>

        <FormControl onSubmit={onSubmit}>
          <Input
            focusBorderColor="none"
            _placeholder={{ color: theme.color.placeHolder }}
            borderColor={errorEmail ? `${theme.color.inputBorderColor}` : "red"}
            w={theme.sizes.width.inputWidth}
            h={theme.sizes.heigth.inputHeight}
            mb="8px"
            placeholder="E-mail"
            type="email"
            name="email"
            value={form.email}
            onKeyDown={handleKeyPress}
            onChange={onChangeInputs}
          />
          {errorEmail ? (
            <></>
          ) : (
            <Text mb="10px" color="red" fontWeight={theme.fontWeights.bold}>
              É necessário o email.
            </Text>
          )}

          <Input
            focusBorderColor="none"
            _placeholder={{ color: theme.color.placeHolder }}
            borderColor={
              errorPassword ? `${theme.color.inputBorderColor}` : "red"
            }
            w={theme.sizes.width.inputWidth}
            h={theme.sizes.heigth.inputHeight}
            placeholder="Password"
            type="password"
            name="password"
            value={form.password}
            onChange={onChangeInputs}
            onKeyDown={handleKeyPress}
          />
          {errorPassword ? (
            <></>
          ) : (
            <Text color="red" fontWeight={theme.fontWeights.bold}>
              É necessário o password.
            </Text>
          )}
          <Button
            mt="56px"
            w={[theme.sizes.width.buttonWidth, "70vw", "50vw"]}
            h={theme.sizes.heigth.buttonHeight}
            borderRadius={theme.sizes.width.buttonBorderRadius}
            color="white"
            bgGradient={theme.color.buttonGradient}
            type="submit"
            onClick={() => onSubmit()}
          >
            Continuar
          </Button>
        </FormControl>
        <Divider
          h="1.5px"
          w={["100%", "70vw", "50vw"]}
          mt="18px"
          mb="18px"
          bgGradient={theme.color.buttonGradient}
        />
        <Button
          w={[theme.sizes.width.buttonWidth, "70vw", "50vw"]}
          h={theme.sizes.heigth.buttonHeight}
          variant="outline"
          borderRadius={theme.sizes.width.buttonBorderRadius}
          color={theme.color.buttonCreateAccount}
          borderColor={theme.color.buttonCreateAccount}
          type="submit"
          onClick={() => goToSignup(navigate)}
        >
          Crie uma conta!
        </Button>
      </LoginStyled>
    </>
  );
};
