import { Box } from "@chakra-ui/react";

const Container = ({ children }) => {
  const heightOfNav = "240px";

  return (
    <Box minH={`calc(100vh - ${heightOfNav})`} p={{ base: 8, md: 30 }}>
      {children}
    </Box>
  );
};

export default Container;
