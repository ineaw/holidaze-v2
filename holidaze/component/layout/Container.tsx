// import { FC } from "react";
import { Box, useColorMode } from "@chakra-ui/react";

const Container = ({ children }) => {
  const { colorMode } = useColorMode();
  const bgColor = { light: "pink.100", dark: "gray.900" };
  const heightOfNavbar = "74px";

  return (
    <Box minH={`calc(100vh - ${heightOfNavbar})`} p={4} fontSize="sm" bg={bgColor[colorMode]}>
      <Box maxW="100vw" mx="auto">
        {children}
      </Box>
    </Box>
  );
};

export default Container;
