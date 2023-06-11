import { Router } from "./routes";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "./styles/theme";
import { GlobalState } from "./context/GlobalState";

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
