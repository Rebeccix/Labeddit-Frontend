import { extendTheme  } from '@chakra-ui/react'

export const theme = extendTheme({
  fonts: {
    heading: "IBM Plex Sans",
    button: "Noto Sans",
  },
  fontSizes: {
    likeDislikeCommentButton: "0.625rem",
    sendedby: "0.75rem",
    checkboxText: "0.875rem",
    text: "1rem",
    button: "1.125rem",
    post: "1.125rem",
    h1WelcomeMessage: "2.063rem",
    header: "2.25rem"
  },
  fontWeights: {
    normal: 400,
    bold: 700
  },
  color: {
    headerButton: "#4088CB",
    highlight: "#4088CB",
    inputBorderColor: "#D5D8DE",
    placeHolder: "#323941",
    buttonCreateAccount: "#FE7E02",
    buttonGradient: "linear(to-l, #FF6489, #F9B24E)",
    bgHeader: "#EDEDED",
    postBg: "#FBFBFB",
    postBorderColor: "#E0E0E0",
    postTextColor: "#6F6F6F",
    likeDislikeCommentButtonColor : "#6F6F6F"
  },
  sizes: {
    width: {
      inputWidth: "363px",
      buttonWidth: "100%",
      buttonBorderRadius: "27px",
      buttoBorderRadiusMinor: "12px"
    },
    heigth: {
      inputHeight: "60px",
      buttonHeight: "51px"
    }
  }
});