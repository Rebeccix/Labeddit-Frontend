import { Router } from "./routes";
import { ChakraProvider } from "@chakra-ui/react";
import { GlobalState } from "./context/GlobalState";
import { theme } from "./styles/theme";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <GlobalState>
        <Router />
      </GlobalState>
    </ChakraProvider>
  );
}

export default App;
