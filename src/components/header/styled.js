import styled from "styled-components";
import { theme } from "../../styles/theme"

export const HeaderStyled = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: ${theme.color.bgHeader};
    height: 50px;
    width: 100vw;
    padding: 0 29px 0 29px;
`