import {
  Box,
  Heading,
  Stack,
  Text,
  Button,
  useToast,
  Flex,
  FormLabel,
  VStack,
  WrapItem,
} from "@chakra-ui/react";
import axios from "axios";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { useRouter } from "next/router";
import { API_URL } from "../../config";

import TextField from "./TextField";

const ContactForm = () => {
  const router = useRouter();
  const toast = useToast();

  const handleCreate = async (values) => {
    try {
      const json = JSON.stringify({
        data: values,
        // jwt: session.jwt,
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
            backgroundColor={"#40916c"}
            padding="2em"
            mx="auto"
          >
            <Text color={"black"} fontWeight={"700"}>
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
    first_name: Yup.string()
      .matches(/^.{1,30}$/gm, "Maximum character reached")
      .required("Firstname is Required"),
    last_name: Yup.string()
      .matches(/^.{1,30}$/gm, "Maximum character reached")
      .required("Lastname is Required"),
    email: Yup.string()
      .email("Must be a valid email")
      .max(255)
      .required("Email is required"),
    message: Yup.string()
      .min(10, "Must be more than 10 characters")
      .required("This field is requried"),
  });

  return (
    <>
      <Flex minH={"100vh"} align={"center"} justify={"center"}>
        <Stack spacing={8} mx={"auto"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"}>Contact us</Heading>
            <Text fontSize={"lg"} color={"gray.600"}>
              send us a message
            </Text>
          </Stack>
          <Box rounded={"lg"} boxShadow={"lg"} p={8}>
            <Stack spacing={4}>
              <Formik
                initialValues={{
                  first_name: "",
                  last_name: "",
                  email: "",
                  message: "",
                }}
                validationSchema={validateForm}
                onSubmit={handleCreate}
              >
                {({ isSubmitting, handleSubmit, handleReset }) => {
                  return (
                    <Form onSubmit={handleSubmit}>
                      <WrapItem>
                        <Box bg="white" color="black" borderRadius="lg">
                          <Box m={8} color="#0B0E3F">
                            <VStack spacing={5}>
                              <Box>
                                <FormLabel>Firstname</FormLabel>
                                <TextField
                                  placeholder="name"
                                  name="first_name"
                                />
                              </Box>
                              <Box>
                                <FormLabel>Lastname</FormLabel>
                                <TextField
                                  placeholder="name"
                                  name="last_name"
                                />
                              </Box>
                              <Box>
                                <FormLabel>Mail</FormLabel>
                                <TextField placeholder="Email" name="email" />
                              </Box>
                              <Box>
                                <FormLabel>Message</FormLabel>
                                <TextField
                                  placeholder="message"
                                  name="message"
                                />
                              </Box>
                              <Box>
                                <Button
                                  variant="solid"
                                  bg="orange"
                                  color="white"
                                  _hover={{}}
                                  isLoading={isSubmitting}
                                  disabled={isSubmitting}
                                  loadingText="Submitting"
                                  type="submit"
                                >
                                  Submit
                                </Button>
                              </Box>
                              <Button
                                size="sm"
                                colorScheme="red"
                                onClick={handleReset}
                                disabled={isSubmitting}
                              >
                                Clear
                              </Button>
                            </VStack>
                          </Box>
                        </Box>
                      </WrapItem>
                    </Form>
                  );
                }}
              </Formik>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </>
  );
};

export default ContactForm;
