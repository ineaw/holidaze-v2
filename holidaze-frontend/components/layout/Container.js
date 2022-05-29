import { Box } from "@chakra-ui/react";

const Container = ({ children }) => {
  const heightOfNav = "240px";

  return (
    <Box minH={`calc(100vh - ${heightOfNav})`} >
      {children}
    </Box>
  );
};

export default Container;
