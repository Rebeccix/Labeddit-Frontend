import { useState } from "react";
import { theme } from "../../styles/theme";
import { Header } from "../../components/header";
import {
  Heading,
  Text,
  FormControl,
  Input,
  Button,
  Checkbox,
  Highlight,
} from "@chakra-ui/react";
import { SignupStyled } from "./styled";
import { goToPosts } from "../../routes/coordinator";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../constants/url";

export const SignupPage = () => {
  const [form, setForm] = useState({ nickname: "", email: "", password: "" });
  const [errorEmptyNickname, setErrorEmptyNickname] = useState(true);
  const [errorEmptyEmail, setErrorEmptyEmail] = useState(true);
  const [errorEmptyPassword, setErrorEmptyPassword] = useState(true);
  const [checkbox, setCheckbox] = useState(false);
  const navigate = useNavigate();

  const onchange = (e) => {
    setCheckbox(e);
  };

  const onChangeInputs = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const onSubmit = async () => {
    form.nickname === ""
      ? setErrorEmptyNickname(false)
      : setErrorEmptyNickname(true);
    form.email === "" ? setErrorEmptyEmail(false) : setErrorEmptyEmail(true);
    form.password === ""
      ? setErrorEmptyPassword(false)
      : setErrorEmptyPassword(true);

    if (
      form.email !== "" &&
      form.password !== "" &&
      form.nickname !== "" &&
      checkbox === true
    ) {
      try {
        const response = await axios.post(`${BASE_URL}/users/signup`, {
          name: form.nickname,
          email: form.email,
          password: form.password,
        });

        localStorage.setItem("token", response.data.token);
        goToPosts(navigate);
      } catch (error) {
        alert(error.response.data.message);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.code === "Enter") {
      onSubmit();
    }
  };

  return (
    <>
      <Header />
      <SignupStyled>
        <Heading
          w={"300px"}
          mt="29px"
          mb="194px"
          fontSize={theme.fontSizes.h1WelcomeMessage}
        >
          Olá, boas vindas ao LabEddit ;&#41;
        </Heading>

        <FormControl onSubmit={onSubmit}>
          <Input
            focusBorderColor="none"
            _placeholder={{ color: theme.color.placeHolder }}
            borderColor={theme.color.inputBorderColor}
            w={theme.sizes.width.inputWidth}
            h={theme.sizes.heigth.inputHeight}
            mb="8px"
            placeholder="Apelido"
            type="text"
            name="nickname"
            value={form.nickname}
            onChange={onChangeInputs}
            onKeyDown={handleKeyPress}
          />
          {errorEmptyNickname ? (
            <></>
          ) : (
            <Text mb="10px" color="red" fontWeight={theme.fontWeights.bold}>
              É necessário um nickname.
            </Text>
          )}

          <Input
            focusBorderColor="none"
            _placeholder={{ color: theme.color.placeHolder }}
            borderColor={theme.color.inputBorderColor}
            w={theme.sizes.width.inputWidth}
            h={theme.sizes.heigth.inputHeight}
            placeholder="E-mail"
            mb="8px"
            type="email"
            name="email"
            value={form.email}
            onChange={onChangeInputs}
            onKeyDown={handleKeyPress}
          />
          {errorEmptyEmail ? (
            <></>
          ) : (
            <Text mb="10px" color="red" fontWeight={theme.fontWeights.bold}>
              É necessário um E-mail.
            </Text>
          )}

          <Input
            focusBorderColor="none"
            _placeholder={{ color: theme.color.placeHolder }}
            borderColor={theme.color.inputBorderColor}
            w={theme.sizes.width.inputWidth}
            h={theme.sizes.heigth.inputHeight}
            placeholder="Senha"
            type="password"
            name="password"
            value={form.password}
            onChange={onChangeInputs}
            onKeyDown={handleKeyPress}
          />
          {errorEmptyPassword ? (
            <></>
          ) : (
            <Text color="red" fontWeight={theme.fontWeights.bold}>
              É necessário um Password.
            </Text>
          )}

          <Text
            w="400px"
            mt="65px"
            mb="17px"
            fontWeight={theme.fontWeights.normal}
            fontSize={theme.fontSizes.checkboxText}
          >
            <Highlight
              query={["Contrato de usuário", "política de Privacidade"]}
              styles={{ color: `${theme.color.highlight}` }}
            >
              Ao continuar, você concorda com o nosso Contrato de usuário e
              nossa política de Privacidade
            </Highlight>
          </Text>
          <Checkbox
            fontSize={theme.fontSizes.checkboxText}
            isRequired
            onChange={(e) => onchange(e.target.checked)}
          >
            <Text
              fontWeight={theme.fontWeights.normal}
              fontSize={theme.fontSizes.checkboxText}
            >
              Eu concordo em receber emails sobre coisas legais no Labeddit
            </Text>
          </Checkbox>

          <Button
            mt="28px"
            w={[theme.sizes.width.buttonWidth, "70vw", "50vw"]}
            h={theme.sizes.heigth.buttonHeight}
            borderRadius={theme.sizes.width.buttonBorderRadius}
            color="white"
            bgGradient={theme.color.buttonGradient}
            type="submit"
            onClick={() => onSubmit()}
          >
            Cadastrar
          </Button>
        </FormControl>
      </SignupStyled>
    </>
  );
};
