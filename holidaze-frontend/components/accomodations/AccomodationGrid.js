import { SimpleGrid, Container } from "@chakra-ui/react";
import * as React from "react";

export const AccomodationGrid = (props) => {
  const columns = React.useMemo(() => {
    const count = React.Children.toArray(props.children).filter(
      React.isValidElement
    ).length;
    return {
      sm: Math.min(1, count),
      base: Math.min(2, count),
      md: Math.min(3, count),
      lg: Math.min(4, count),
      xl: Math.min(5, count),
    };
  }, [props.children]);

  return (
    <>
      <Container maxW={"7xl"} py={{ sm: "8", md: "10" }}>
        <SimpleGrid
          columns={columns}
          columnGap={{ base: "4", md: "6" }}
          rowGap={{ base: "8", md: "10" }}
          {...props}
        />
      </Container>
    </>
  );
};
