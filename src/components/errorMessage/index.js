import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { ErrorStyled } from "./styled";
import { Badge } from "@chakra-ui/react";

export const ErrorMessage = () => {
  const context = useContext(GlobalContext);

  const { alert } = context;

  return (
    <ErrorStyled>
      {typeof alert === "string" ? (
        <>
          <Badge
            colorScheme="red"
            display="block"
            key=""
            borderRadius="md"
            px={4}
            h="40px"
            w="auto"
            p="10px 30px 10px 10px"
            m="10px 10px 10px 10px"
          >
            <h1>`{alert}`</h1>
          </Badge>
        </>
      ) : (
        alert.map((erro) => {
          return (
            <Badge
              colorScheme="red"
              display="block"
              key={erro.message}
              borderRadius="md"
              px={4}
              h="40px"
              w="auto"
              p="10px 30px 10px 10px"
              m="10px 10px 10px 10px"
            >
              <h1>{erro.message}</h1>
            </Badge>
          );
        })
      )}
    </ErrorStyled>
  );
};
