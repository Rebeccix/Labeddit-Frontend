import { useState } from "react";
import logo from "../../assets/logo.svg";
import { theme } from "../../styles/theme";
import { LoginStyled } from "./styled";
import { useNavigate } from "react-router-dom";
import { goToSignup, goToCommentary } from "../../routes/coordinator";
import {
  Heading,
  Text,
  FormControl,
  FormErrorMessage,
  Input,
  Button,
  Divider,
} from "@chakra-ui/react";

export const LoginPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const onChangeInputs = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const isError = form === "";

  const onSubmit = () => {
    console.log(form);
    goToCommentary(navigate);
  };

  return (
    <LoginStyled>
      <img src={logo} alt="" />
      <Heading>LabEddit</Heading>
      <Text
        fontWeight={theme.fontWeights.normal}
        fontSize={theme.fontSizes.text}
      >
        O projeto de rede social da Labenu
      </Text>

      <FormControl isInvalid={isError} onSubmit={onSubmit}>
        <Input
          focusBorderColor="none"
          _placeholder={{ color: theme.color.placeHolder }}
          borderColor={theme.color.inputBorderColor}
          w={theme.sizes.width.inputWidth}
          h={theme.sizes.heigth.inputHeight}
          mb="8px"
          placeholder="E-mail"
          type="email"
          name="email"
          value={form.email}
          onChange={onChangeInputs}
        />
        {!isError ? (
          <></>
        ) : (
          <FormErrorMessage>É necessário o email.</FormErrorMessage>
        )}

        <Input
          focusBorderColor="none"
          _placeholder={{ color: theme.color.placeHolder }}
          borderColor={theme.color.inputBorderColor}
          w={theme.sizes.width.inputWidth}
          h={theme.sizes.heigth.inputHeight}
          placeholder="Password"
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
        <Button
          mt="56px"
          w={theme.sizes.width.buttonWidth}
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
        w="100%"
        mt="18px"
        mb="18px"
        bgGradient={theme.color.buttonGradient}
      />
      <Button
        w={theme.sizes.width.buttonWidth}
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
  );
};
