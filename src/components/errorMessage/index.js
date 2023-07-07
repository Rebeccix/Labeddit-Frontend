import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { ErrorStyled } from "./styled";
import { Box } from "@chakra-ui/react";

export const ErrorMessage = () => {
  const context = useContext(GlobalContext);

  const { alert } = context;

  return (
    <ErrorStyled>
        {alert.map((erro) => {
          return (
            <Box
            key={erro.message}
              borderRadius="5px"
              bg="tomato"
              h="40px"
              w="100%"
              p="10px 10px 10px 10px"
              m="10px 10px 10px 10px"
            >
              <h1>{erro.message}</h1>
            </Box>
          );
        })}
    </ErrorStyled>
  );
};
