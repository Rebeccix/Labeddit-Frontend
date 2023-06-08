import { HeaderStyled } from "./styled"
import logo from "../../assets/logo.svg"
import { Button, Image, Spacer, Box } from "@chakra-ui/react"
import { theme } from "../../styles/theme"

export const Header = () => {
    const href = window.location.href;
    return(
        <HeaderStyled>
            <Box w="55px"/>
            <Spacer />
            <Image boxSize="28px" src={logo} alt="" />
            <Spacer />
            {href.includes("Signup") ? (
                <Button fontSize={theme.fontSizes.button} w="55px" h="25px" color={theme.color.headerButton} variant='link'>Entrar</Button>
            ) : (
                <Button fontSize={theme.fontSizes.button} w="55px" h="25px" color={theme.color.headerButton} variant='link'>Logout</Button>
            )  
        }
        </HeaderStyled>
    )
}