import styled from "styled-components";
import { theme } from "../../styles/theme";

export const PostsCardStyled = styled.div`
    .Container-posts {
        margin-bottom: 10px;

        display: flex;
        flex-direction: column;
        background-color: ${theme.color.postBg};
        border: 1px solid ${theme.color.postBorderColor};
        border-radius: 12px;
        padding: 9px 9px 9px 10px;

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