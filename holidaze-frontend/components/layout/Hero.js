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
  import { GrLocation } from "react-icons/gr";
  import CustomLink from "./CustomLink";
  import NextLink from "next/link";
  
  export default function Hero() {
    return (
      <>
        <Flex
          maxW={"full"}
          h={"60ch"}
          backgroundImage={
            "url(https://images.unsplash.com/photo-1569417921961-edf9477063de?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1571&q=80)"
          }
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
              fontSize={useBreakpointValue({ base: "3xl", md: "5xl" })}
            >
              Take your next Holdidaze to Bergen
            </Heading>
            <Stack maxW={"6xl"} spacing={6} my={18}>
              <Box
                bg={"white"}
                p={6}
                rounded={"10"}
              
                // maxW={"90vw"}
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
                    {/* <InputLeftElement color="gray.300"><GrLocation /></InputLeftElement> */}
                    <Input placeholder="Location" fontSize={"sm"} />
                  </InputGroup>
                  <InputGroup>
                    <Input px={2} py={4} fontSize={"sm"} type="date" />
                  </InputGroup>
                  <InputGroup>
                    <Input px={2} py={4} fontSize={"sm"} type="date" />
                  </InputGroup>{" "}
                  <Box display="inline-flex" rounded="md" shadow="md">
                    <NextLink href="/accomodations" passHref>
                      <Link
                        w="150px"
                        display="inline-flex"
                        alignItems="center"
                        justifyContent="center"
                        px={4}
                        py={2}
                        border="solid transparent"
                        fontWeight="bold"
                        rounded="md"
                        color={useColorModeValue("white")}
                        bg={useColorModeValue("green.600", "green.500")}
                        _hover={{
                          bg: useColorModeValue("brand.700", "brand.600"),
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
  