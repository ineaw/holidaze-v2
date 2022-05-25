import {
    Box,
    chakra,
    Container,
    Heading,
    Stack,
    Text,
    useColorModeValue,
    VisuallyHidden,
  } from "@chakra-ui/react";
  // import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
  import { ReactNode } from "react";
  import Link from "next/link";
  
  const Logo = (props) => {
    return <Heading>Holidaze</Heading>;
  };
  
  export default function Footer() {
    return (
      <Box
        bg={useColorModeValue("gray.50", "gray.900")}
        color={useColorModeValue("gray.700", "gray.200")}
      >
        <Container
          as={Stack}
          maxW={"6xl"}
          py={4}
          spacing={4}
          justify={"center"}
          align={"center"}
        >
          <Logo />
          <Stack direction={"row"} spacing={6}>
            <Link href={`/`}>Home</Link>
            <Link href={`/accomodations`}>Accomodations</Link>
            <Link href={`/contact`}>Contact</Link>
          </Stack>
        </Container>
        <Box
          borderTopWidth={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
        >
          <Container
            as={Stack}
            maxW={"6xl"}
            py={4}
            direction={{ base: "column", md: "row" }}
            spacing={4}
            justify={{ base: "center", md: "space-between" }}
            align={{ base: "center", md: "center" }}
          >
            <Text>© 2022 Ineaw. All rights reserved</Text>
            <Stack direction={"row"} spacing={6}></Stack>
          </Container>
        </Box>
      </Box>
    );
  }
  