import { useState } from "react";
import { theme } from "../../styles/theme";
import { Header } from "../../components/header";
import {
  Heading,
  Text,
  FormControl,
  FormErrorMessage,
  Input,
  Button,
  Checkbox,
  Highlight,
} from "@chakra-ui/react";
import { SignupStyled } from "./styled";
import { goToCommentary } from "../../routes/coordinator";
import { useNavigate } from "react-router-dom";

export const SignupPage = () => {
  const [form, setForm] = useState({ nickname: "", email: "", password: "" });
  const [checkbox, setCheckbox] = useState(false);
  const navigate = useNavigate()

  const onchange = (e) => {
    setCheckbox(e);
  };

  const onChangeInputs = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const isError = form === "";

  const onSubmit = () => {
    checkbox === true ? 
    goToCommentary(navigate) 
    : 
    console.log("num pode");
  };
  return (
    <>
      <Header />
      <SignupStyled>
        <Heading mt="29px" mb="194px" fontSize={theme.fontSizes.h1WelcomeMessage}>
          Olá, boas vindas ao LabEddit ;&#41;
        </Heading>

        <FormControl isInvalid={isError} onSubmit={onSubmit}>
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
          />
          {!isError ? (
            <></>
          ) : (
            <FormErrorMessage>É necessário um Apelido.</FormErrorMessage>
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
          />
          {!isError ? (
            <></>
          ) : (
            <FormErrorMessage>É necessário o E-mail.</FormErrorMessage>
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
          />
          {!isError ? (
            <></>
          ) : (
            <FormErrorMessage>É necessário o password.</FormErrorMessage>
          )}

          <Text
            mt="65px"
            mb="17px"
            fontWeight={theme.fontWeights.normal}
            fontSize={theme.fontSizes.checkboxText}
          >
            <Highlight query={["Contrato de usuário", "política de Privacidade"]} styles={{ color: `${theme.color.highlight}`}}>
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
            w={theme.sizes.width.buttonWidth}
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
