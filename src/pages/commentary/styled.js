import styled from "styled-components";
import { theme } from "../../styles/theme"

export const CommentaryStyled = styled.div`
    padding: 32px 30px 0 30px;

    .Container-posts {
        margin-bottom: 10px;

        display: flex;
        flex-direction: column;
        background-color: ${theme.color.postBg};
        border: 1px solid ${theme.color.postBorderColor};
        border-radius: 12px;
        padding: 9px 19px 9px 10px;

        div {
            display: flex;

            div {
                display: flex;
                align-items: center;
                justify-content: space-around;
                border: 0.793333px solid #ECECEC;
                border-radius: 28px;
            }
        }

    }
`