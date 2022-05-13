import { Stack, Flex, Button, Text, VStack, Box, useBreakpointValue, Input, InputGroup, InputLeftElement, InputRightElement } from "@chakra-ui/react";
import { CheckIcon, CalendarIcon } from "@chakra-ui/icons";
export default function Hero() {
  return (
    <>
      <Flex w={"full"} h={"100vh"} backgroundImage={"url(https://images.unsplash.com/photo-1569417921961-edf9477063de?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1571&q=80)"} backgroundSize={"cover"} backgroundPosition={"center center"}>
        <VStack w={"full"} justifyContent={"space-between"} py={16} px={useBreakpointValue({ base: 4, md: 8 })} bgGradient={"linear(to-r, blackAlpha.600, transparent)"}>
          <Stack maxW={"2xl"} align={"flex-start"} spacing={6}>
            <Text color={"white"} fontWeight={700} lineHeight={1.2} fontSize={useBreakpointValue({ base: "3xl", md: "4xl" })}>
              Book your Holiday Accomodation in Bergen
            </Text>
            <Stack direction={"row"}>
              <Button bg={"orange.400"} rounded={"10"} color={"white"} _hover={{ bg: "orange.500" }}>
                Show me more
              </Button>
              <Button bg={"whiteAlpha.300"} rounded={"10"} color={"white"} _hover={{ bg: "whiteAlpha.500" }}>
                Show me more
              </Button>
            </Stack>
          </Stack>
          <Box bg={"white"} p={8} rounded={"10"} textAlign={"center"} maxW={"90vw"}>
            <Text color={"black"} lineHeight={1.2} fontSize={useBreakpointValue({ base: "sm", md: "sm" })}>
              Find your accomodation
            </Text>
            <Stack align={"center"} spacing={6} direction={useBreakpointValue({ base: "column", md: "row" })} px={useBreakpointValue({ base: 4, md: 8 })}>
              <InputGroup>
                <InputLeftElement pointerEvents="none" color="gray.300" fontSize="1.2em" />
                <Input placeholder="Where" />
              </InputGroup>
              <InputGroup>
                <InputLeftElement pointerEvents="none" children={<CalendarIcon color="gray.500" />} />
                <Input type="date" />
                <InputLeftElement pointerEvents="none" children={<CalendarIcon color="gray.500" />} />
                <Input type="date" />
              </InputGroup>
              <Button bg={"orange.400"} px={8} rounded={"5"} color={"white"} _hover={{ bg: "orange.500" }}>
                Find
              </Button>
            </Stack>
          </Box>
        </VStack>
      </Flex>
    </>
  );
}
