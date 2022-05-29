import {
  Box,
  Heading,
  Stack,
  HStack,
  IconButton,
  Text,
  Button,
  useToast,
  Flex,
  FormLabel,
  VStack,
  WrapItem,
  ButtonGroup,
  Wrap,
  Center,
} from "@chakra-ui/react";
import { MdPhone, MdEmail, MdLocationOn, MdFacebook } from "react-icons/md";
import { BsGithub, BsDiscord, BsPerson } from "react-icons/bs";
import axios from "axios";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { useRouter } from "next/router";
import { API_URL } from "../../../lib";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { TextField } from "../../formComponents/FormFields";

const ContactForm = () => {
  const router = useRouter();
  const toast = useToast();

  const handleCreate = async (values) => {
    try {
      const json = JSON.stringify({
        data: values,
      });

      const response = await axios.post(
        `${API_URL}/api/contacts?populate=*`,
        json,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast({
        position: "top",
        render: () => (
          <Box
            borderRadius={"0.3em"}
            backgroundColor={"green.400"}
            padding="2em"
            mx="auto"
          >
            <Text color={"white"} fontWeight={"700"}>
              Successfully sent!
            </Text>
          </Box>
        ),
        duration: 3000,
      });
    } catch (error) {
      toast({
        position: "top",
        render: () => (
          <Box
            borderRadius={"0.3em"}
            backgroundColor={"red.400"}
            padding="2em"
            mx="auto"
          >
            <Text color={"white"} fontWeight={"700"}>
              Post error
            </Text>
            <Text color={"white"}>Something went wrong</Text>
          </Box>
        ),
        duration: 3000,
      });
    }
  };

  const validateForm = Yup.object({
    name: Yup.string()
      .matches(/^.{1,30}$/gm, "Maximum character reached")
      .required("Firstname is Required"),
    email: Yup.string()
      .email("Must be a valid email")
      .max(255)
      .required("Email is required"),
    subject: Yup.string().required("This field is requried"),
    message: Yup.string()
      .min(10, "Must be more than 10 characters")
      .required("This field is requried"),
  });

  return (
    <>
      <Flex>
        <Box rounded={"lg"} boxShadow={"lg"} p={8} center="true">
          <Wrap justify="center">
            <WrapItem>
              <Center direction="column">
                <VStack>
                  <Heading>Contact Us</Heading>
                  <Text mt={{ sm: 3, md: 3, lg: 5 }} color="brand.text">
                    send us a message
                  </Text>
                  <Box py={{ base: 5, sm: 5, md: 8, lg: 10 }}>
                    <VStack spacing={3} alignItems={"center"}>
                      <Button
                        size="md"
                        height="48px"
                        width="200px"
                        variant="ghost"
                        leftIcon={<MdPhone color="black" size="20px" />}
                      >
                        +77-66558899
                      </Button>
                      <Button
                        size="md"
                        height="48px"
                        width="200px"
                        variant="ghost"
                        leftIcon={<MdEmail color="black" size="20px" />}
                      >
                        holidaze@mail.us
                      </Button>
                      <Button
                        size="md"
                        height="48px"
                        width="200px"
                        variant="ghost"
                        leftIcon={<MdLocationOn color="black" size="20px" />}
                      >
                        Fløygata 5, Bergen
                      </Button>
                    </VStack>
                  </Box>
                </VStack>
              </Center>
            </WrapItem>
            <WrapItem>
              <Stack spacing={4}>
                <Formik
                  initialValues={{
                    name: "",
                    email: "",
                    subject: "",
                    message: "",
                  }}
                  validationSchema={validateForm}
                  onSubmit={handleCreate}
                >
                  {({ isSubmitting, handleSubmit, handleReset }) => {
                    return (
                      <Form onSubmit={handleSubmit}>
                        <Center>
                          <Box m={8} color="#0B0E3F">
                            <VStack spacing={5}>
                              <Box>
                                <FormLabel>Firstname</FormLabel>
                                <TextField
                                  placeholder="Firstname"
                                  name="name"
                                />
                              </Box>

                              <Box>
                                <FormLabel>Email</FormLabel>
                                <TextField placeholder="Email" name="email" />
                              </Box>

                              <Box>
                                <FormLabel>Subject</FormLabel>
                                <TextField
                                  placeholder="Subject"
                                  name="subject"
                                />
                              </Box>

                              <Box>
                                <FormLabel>Message</FormLabel>
                                <TextField
                                  placeholder="Message"
                                  textbox
                                  name="message"
                                />
                              </Box>
                              <ButtonGroup spacing={6}>
                                <Button
                                  variant="solid"
                                  bg="brand.dark"
                                  color="body.light"
                                  _hover={{
                                    bg: "brand.darkhover",
                                  }}
                                  isLoading={isSubmitting}
                                  disabled={isSubmitting}
                                  loadingText="Submitting"
                                  type="submit"
                                >
                                  Submit
                                </Button>
                                <Button
                                  variant="outline"
                                  colorScheme="brand.dark"
                                  onClick={handleReset}
                                  isDisabled={isSubmitting}
                                >
                                  Clear
                                </Button>
                              </ButtonGroup>
                            </VStack>
                          </Box>
                        </Center>
                      </Form>
                    );
                  }}
                </Formik>
              </Stack>
            </WrapItem>
          </Wrap>
        </Box>
      </Flex>
    </>
  );
};

export default ContactForm;
