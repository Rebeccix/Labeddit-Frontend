import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { ErrorStyled } from "./styled";
import { Box, Badge } from "@chakra-ui/react";

export const ErrorMessage = () => {
  const context = useContext(GlobalContext);

  const { alert } = context;

  return (
    <ErrorStyled>
        {alert.map((erro) => {
          return (
            <Badge colorScheme='red'
            key={erro.message}
              borderRadius="md"
              px={4}
              h="40px"
              w="80%"
              p="10px 10px 10px 10px"
              m="10px 10px 10px 10px"
            >
              <h1>{erro.message}</h1>
              </Badge>
          );
        })}
    </ErrorStyled>
  );
};
