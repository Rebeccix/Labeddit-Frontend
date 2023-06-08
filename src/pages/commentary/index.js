import { useState } from "react";
import { Header } from "../../components/header";
import { Textarea, Button, Divider } from '@chakra-ui/react'
import { theme } from "../../styles/theme"

export const CommentaryPage = ()=> {
    let [post, setPost] = useState('')

    const onChangeInputs = (e) => {
        setPost(e.target.value);
    }

    const onSubmit = () => {
        
    }

    return (
        <>
            <Header/>
            <Textarea value={post} onChange={onChangeInputs} placeholder='Escreva seu post...' />
            <Button
              mt="28px"
            w={theme.sizes.width.buttonWidth}
            h={theme.sizes.heigth.buttonHeight}
            borderRadius={theme.sizes.width.buttoBorderRadiusMinor}
            color="white"
            bgGradient={theme.color.buttonGradient}
            type="submit"
            onClick={() => onSubmit()}
            >
                Postar
            </Button>
            <Divider
        h="1.5px"
        w="100%"
        mt="18px"
        mb="18px"
        bgGradient={theme.color.buttonGradient}
      />

        </>
    )
}