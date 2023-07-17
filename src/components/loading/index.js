import { CircularProgress, Flex } from "@chakra-ui/react";

export const Loading = () => {
  return (
    <>
      <Flex justify="center" align="center">
        <CircularProgress isIndeterminate color="green.300" />
      </Flex>
    </>
  );
};
