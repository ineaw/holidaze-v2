import {
    Stack,
    Flex,
    Button,
    Heading,
    Text,
    VStack,
    Box,
    useBreakpointValue,
    Input,
    InputGroup,
    InputLeftElement,
    FormLabel,
    Link,
    useColorModeValue,
  } from "@chakra-ui/react";
  // import Link from "next/link";
  import NextLink from "next/link";
  
  export default function Hero() {
    return (
      <>
        <Flex
          maxW={"full"}
          h={"60ch"}
          backgroundImage={
            "url(/images/hero-main.jpg)"}
          backgroundSize={"cover"}
          backgroundPosition={"center top"}
        >
          <VStack
            w={"full"}
            justify={"center"}
            px={useBreakpointValue({ base: 4, md: 8 })}
            bgGradient={"linear(to-r, blackAlpha.600, transparent)"}
          >
            <Heading
              as={"h1"}
              color={"white"}
              fontWeight={700}
              lineHeight={1.2}
              textAlign={"center"}
              fontFamily={"sans"}
              fontSize={useBreakpointValue({ base: "3xl", md: "5xl" })}
            >
              Take your next Holidaze to Bergen
            </Heading>
            <Stack maxW={"6xl"} spacing={6} my={18}>
              <Box
                bg={"white"}
                p={6}
                rounded={"10"}
                my={12}
              >
                <FormLabel textAlign={"center"}> Find your accommodation in Bergen</FormLabel>
                <Stack
                  align={"center"}
                  spacing={4}
                  direction={useBreakpointValue({ base: "column", md: "row" })}
                  px={useBreakpointValue({ base: 4, md: 4 })}
                >
                  <InputGroup direction={"column"}>
                    <Input placeholder="Find your stay" fontSize={"sm"} />
                  </InputGroup>
                  <InputGroup>
                    <Input px={2} py={4} fontSize={"sm"} type="date" />
                  </InputGroup>
                  <InputGroup>
                    <Input px={2} py={4} fontSize={"sm"} type="date" />
                  </InputGroup>{" "}
                  <Box display="inline-flex" rounded="md" shadow="md">
                    <NextLink href="/accomodations">
                      <Link
                        w="150px"
                        display="inline-flex"
                        alignItems="center"
                        justifyContent="center"
                        px={2}
                        py={1.5}
                        border="solid transparent"
                        fontWeight="bold"
                        fontSize={"sm"}
                        rounded="md"
                        color={"body.light"}
                        bg={"brand.dark"}
                        _hover={{
                          bg: ("brand.darkhover"),
                        }}
                      >
                        Get started
                      </Link>
                    </NextLink>
                  </Box>
                </Stack>
              </Box>
            </Stack>
          </VStack>
        </Flex>
      </>
    );
  }
  