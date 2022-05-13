import { Box, Flex, useColorMode } from "@chakra-ui/react";

const Container = ({ children }) => {
  const { colorMode } = useColorMode();
  const bgColor = { light: "orange.100", dark: "gray.900" };
  const heightOfNav = "288px";

  return (
    <Box minH={`calc(100vh - ${heightOfNav})`} fontSize="sm" bg={bgColor[colorMode]}>
      <Flex maxW={"full"} flexDirection={"column"} align="center" justify="center" m="auto">
        {children}
      </Flex>
    </Box>
  );
};

export default Container;
