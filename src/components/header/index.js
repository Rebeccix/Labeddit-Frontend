import { HeaderStyled } from "./styled"
import logo from "../../assets/logo.svg"
import exit from "../../assets/exit.svg"
import { Button, Image, Spacer, Box } from "@chakra-ui/react"
import { theme } from "../../styles/theme"
import { goToLogin } from "../../routes/coordinator"
import { useNavigate } from "react-router-dom"

export const Header = () => {
    const href = window.location.href;
    const navigate = useNavigate()
    return(
        <HeaderStyled>
            {href.includes("commentary") ? (
                <Image boxSize="25px" src={exit} alt=""/>
            ) :
            (
                <Box w="55px"/>
            )}
            <Spacer />
            <Image boxSize="28px" src={logo} alt="" />
            <Spacer />
            {href.includes("Signup") ? (
                <Button fontSize={theme.fontSizes.button} w="55px" h="25px" color={theme.color.headerButton} variant='link' onClick={() => goToLogin(navigate)}>Entrar</Button>
            ) : (
                <Button fontSize={theme.fontSizes.button} w="55px" h="25px" color={theme.color.headerButton} variant='link' onClick={() => goToLogin(navigate)}>Logout</Button>
            )  
        }
        </HeaderStyled>
    )
}