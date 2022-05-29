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
  Skeleton,
  useBreakpointValue,
} from "@chakra-ui/react";
import { HiStar, HiOutlineStar } from "react-icons/hi";
import EnquieryForm from "../admin/enquiries/EnquieryForm";

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
        <Stack direction={"row"} my="0.5em" spacing={"1"} fontSize={"2xl"}>
          {stars.map((star) =>
            accom.attributes.rating >= star ? (
              <HiStar key={star} color="orange" />
            ) : (
              <HiOutlineStar key={star} color="orange" />
            )
          )}
        </Stack>
        <SimpleGrid
          columns={{ base: 1, lg: 2 }}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 6, md: 12 }}
        >
          <Flex>
            <Box position="relative">
              <Image
                borderRadius={useBreakpointValue({
                  sm: "md",
                  base: "md",
                  md: "lg",
                })}
                alt={accom.attributes.name}
                src={
                  accom.attributes.image.data
                    ? accom.attributes.image.data.attributes.url
                    : "/images/default.jpg"
                }
                fit={"cover"}
                align={"center"}
                w={"100%"}
                h={{ base: "100%", sm: "400px", lg: "500px" }}
                fallback={<Skeleton />}
              />
            </Box>
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
                <Text fontSize={"lg"}>{accom.attributes.description}</Text>
              </VStack>
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
                    <Text fontWeight={"bold"}>facilities:</Text>{" "}
                    {accom.attributes.facilities}
                  </ListItem>
                  <ListItem>
                    <Text as={"span"} fontWeight={"bold"}>
                      Accomodation type:
                    </Text>{" "}
                    {accom.attributes.room_type}
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
            </Stack>
            <Button
              w="full"
              px={4}
              py={2}
              border="solid transparent"
              fontWeight="bold"
              rounded="md"
              color={"body.light"}
              bg={"brand.dark"}
              _hover={{
                bg: "brand.darkhover",
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
                  <EnquieryForm />
                </ModalBody>
              </ModalContent>
            </Modal>
          </Stack>
        </SimpleGrid>
      </Container>
    </>
  );
}
