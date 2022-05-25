import {
    Box,
    Container,
    Stack,
    Text,
    Image,
    Flex,
    VStack,
    Button,
    Heading,
    SimpleGrid,
    StackDivider,
    List,
    ListItem,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Badge,
    leftIcon,
  } from "@chakra-ui/react";
  import { HiStar, HiOutlineStar, HiHome } from "react-icons/hi";
  import SendEnquiery from "../form-components/SendEnquiery";
  
  export default function AccomodationDetail({ accom }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const stars = [1, 2, 3, 4, 5];
    return (
      <>
        <Container maxW={"7xl"}>
          <Heading
            lineHeight={1.1}
            fontWeight={600}
            fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
          >
            {accom.attributes.name}
          </Heading>
          <Stack direction={"row"} my="0.5em" spacing={"1"} fontSize={"xl"}>
            {stars.map((star) =>
              accom.rating >= star ? (
                <HiStar key={star} color="yellow.500" />
              ) : (
                <HiOutlineStar key={star} />
              )
            )}
          </Stack>
          <SimpleGrid
            columns={{ base: 1, lg: 2 }}
            spacing={{ base: 8, md: 10 }}
            py={{ base: 6, md: 12 }}
          >
            <Flex>
              <Image
                rounded={"md"}
                alt={"product image"}
                src={
                  accom.attributes.image.data
                    ? accom.attributes.image.data.attributes.url
                    : "/images/default.jpg"
                }
                fit={"cover"}
                align={"center"}
                w={"100%"}
                h={{ base: "100%", sm: "400px", lg: "500px" }}
              />
            </Flex>
            <Stack spacing={{ base: 6, md: 10 }}>
              <Box>
                <Text fontWeight={300} fontSize={"2xl"}>
                  {accom.attributes.price} / per night
                </Text>
              </Box>
              <Stack
                spacing={{ base: 4, sm: 6 }}
                direction={"column"}
                divider={<StackDivider />}
              >
                <VStack spacing={{ base: 4, sm: 6 }}>
                  <Text fontSize={"2xl"} fontWeight={"300"}>
                    {accom.attributes.description}
                  </Text>
                  <Text fontSize={"lg"}>{accom.attributes.description}</Text>
                </VStack>
                <Box>
                  <Text
                    fontSize={{ base: "16px", lg: "18px" }}
                    fontWeight={"500"}
                    textTransform={"uppercase"}
                    mb={"4"}
                  >
                    Amenities
                  </Text>
                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                    <List spacing={2}>
                      <ListItem>Chronograph</ListItem>
                      <ListItem>Master Chronometer Certified</ListItem>{" "}
                      <ListItem>Tachymeter</ListItem>
                    </List>
                    <List spacing={2}>
                      <ListItem>Anti‑magnetic</ListItem>
                      <ListItem>Chronometer</ListItem>
                      <ListItem>Small seconds</ListItem>
                    </List>
                  </SimpleGrid>
                </Box>
                <Box>
                  <Text
                    fontSize={{ base: "16px", lg: "18px" }}
                    fontWeight={"500"}
                    textTransform={"uppercase"}
                    mb={"4"}
                  >
                    Room Details
                  </Text>
                  <List spacing={2}>
                    <ListItem>
                      <Text as={"span"} fontWeight={"bold"}>
                        Beds:
                      </Text>{" "}
                      2
                    </ListItem>
                    <ListItem>
                      <Text as={"span"} fontWeight={"bold"}>
                        Breakfast:
                      </Text>{" "}
                      No
                    </ListItem>
                    <ListItem>
                      <Text as={"span"} fontWeight={"bold"}>
                        Case:
                      </Text>{" "}
                      Steel
                    </ListItem>
                    <ListItem>
                      <Text as={"span"} fontWeight={"bold"}>
                        Case diameter:
                      </Text>{" "}
                      42 mm
                    </ListItem>
                    <ListItem>
                      <Box display="flex" mt="2" alignItems="center">
                        <Text as={"span"} fontWeight={"bold"} fontSize={"lg"}>
                          <HiHome /> 
                        </Text>{" "} 
                        <Text as={"span"} marginLeft={2}>
                          {accom.attributes.category.data.attributes.name}
                        </Text>
                      </Box>
                    </ListItem>
                  </List>
                </Box>
                <Box>
                  <Text
                    fontSize={{ base: "16px", lg: "18px" }}
                    fontWeight={"500"}
                    textTransform={"uppercase"}
                    mb={"4"}
                  >
                    Location
                  </Text>
                  <Text fontSize={"lg"}>{accom.attributes.address}</Text>
                </Box>
                <Box> </Box>
              </Stack>
              <Button
                rounded={"none"}
                w={"full"}
                mt={8}
                size={"lg"}
                py={"7"}
                textTransform={"uppercase"}
                _hover={{
                  transform: "translateY(2px)",
                  boxShadow: "lg",
                }}
                onClick={onOpen}
              >
                Send an Enquiry
              </Button>
              <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                  <ModalCloseButton />
                  <ModalBody>
                    <SendEnquiery />
                  </ModalBody>
                </ModalContent>
              </Modal>
            </Stack>
          </SimpleGrid>
        </Container>
      </>
    );
  }
  