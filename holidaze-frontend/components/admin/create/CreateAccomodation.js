import {
  Button,
  Stack,
  Box,
  Heading,
  ButtonGroup,
  Text,
  FormLabel,
  Flex,
  useColorModeValue,
  IconButton,
  Center,
  Container,
  NumberInputField,
  NumberInput,
  InputRightElement,
} from "@chakra-ui/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import { Formik, Form } from "formik";
import { useRouter } from "next/router";
import { useState } from "react";
import { HiStar, HiOutlineStar } from "react-icons/hi";
import * as Yup from "yup";

import { TextField } from "@/components/formComponents/FormFields";
import { API_URL } from "../../../lib";

export default function CreateAccomodation() {
  const [values, setValues] = useState({
    name: "",
    address: "",
    price: 0,
    description: "",
    facilities: "",
    room_type: "",
    rating: 0,
    beds: 0,
  });
  const router = useRouter();

  const handleCreate = async (values) => {
    const res = await fetch(`${API_URL}/api/accomodations?populate=*`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({ data: { ...values } }),
    });

    if (!res.ok) {
      toast.error("Something Went Wrong");
    } else {
      const accomodation = await res.json();
      toast.success("Your listing was created Successfully");
      setTimeout(() => {
        router.push(`/accomodations/${accomodation.data.attributes.slug}`);
      }, 3000);
    }
  };

  const validateForm = Yup.object({
    name: Yup.string()
      .matches(/^.{1,30}$/gm, "Maximum character reached")
      .required("Title is Required"),
    address: Yup.string()
      .matches(/^.{1,30}$/gm, "Maximum character reached")
      .required("Address is Required"),
    rating: Yup.number().min(1).max(5).required("Between 1-5 stars"),
    beds: Yup.number().required("Minimum 1 bed").positive().integer(),
    price: Yup.number().required().positive().integer(),
    description: Yup.string()
      .min(10, "Must be more than 10 characters")
      .required("This field is requried"),
    room_type: Yup.string()
      .min(2, "Must be more than 2 characters")
      .required("This field is requried"),
    facilities: Yup.string()
      .min(2, "Must be more than 2 characters")
      .required("This field is requried"),
  });

  const stars = [1, 2, 3, 4, 5];

  return (
    <>
      <Container centerContent>
        <ToastContainer />
        <Heading fontWeight="normal" m={8} letterSpacing="tight">
          List a new accomodation
        </Heading>
        <Flex px={24} px={[4, 24]} py={12} mb={8}>
        <Box rounded={"lg"} boxShadow={"lg"} p={8} center="true">

          <Formik
            initialValues={{
              name: "",
              address: "",
              price: 0,
              description: "",
              room_type: "",
              rating: 0,
              beds: 0,
              facilities: "",
            }}
            validationSchema={validateForm}
            onSubmit={handleCreate}
          >
            {({
              isSubmitting,
              handleSubmit,
              handleReset,
              values,
              setFieldValue,
              setValues,
            }) => (
              <Form onSubmit={handleSubmit}>
                <Box>
                  <FormLabel>Name</FormLabel>
                  <TextField
                    placeholder="Name of Accomodation"
                    name="name"
                    value={values}
                  />
                </Box>
                <Box>
                  <FormLabel>Address</FormLabel>
                  <TextField
                    placeholder="Address"
                    name="address"
                    value={values}
                  />
                </Box>
                <Box>
                  <FormLabel>Room type</FormLabel>
                  <TextField
                    placeholder="Room type"
                    name="room_type"
                    value={values}
                  />
                </Box>
                <Box>
                  <FormLabel>Facilities</FormLabel>
                  <TextField
                    placeholder="Facilities"
                    name="facilities"
                    value={values}
                  />
                </Box>
                <Box>
                  <FormLabel>Description</FormLabel>
                  <TextField
                    placeholder="Description"
                    name="description"
                    value={values}
                    textbox
                  />
                </Box>
                <Flex direction="row" justifyContent="space-evenly" >
                <Box>
                  <FormLabel>Beds</FormLabel>
                  <NumberInput
                    defaultValue={2}
                    name="beds"
                    min={0}
                    onChange={(e) => setFieldValue("beds", e)}
                    maxW={"6rem"}
                    errorBorderColor="red.300"
                    bg="#fff"
                    borderColor="brand.text"
                  >
                    <NumberInputField />
                  </NumberInput>
                </Box>
             
                <Box>
                  <FormLabel>Price</FormLabel>
                  <NumberInput
                    defaultValue={0}
                    name="price"
                    min={0}
                    onChange={(e) => setFieldValue("price", e)}
                    maxW={"6rem"}
                    errorBorderColor="red.300"
                    bg="#fff"
                    borderColor="brand.text"
                  >
                    <NumberInputField />
                    <InputRightElement children="NOK" />
                  </NumberInput>
                </Box>
                </Flex>
                <Box my="2em">
                  <FormLabel>Rating</FormLabel>
                  <Stack direction={"row"}>
                    {stars.map((star) => (
                      <IconButton
                        key={star}
                        fontSize="2em"
                        variant={"ghost"}
                        aria-label="star"
                        onClick={() => {
                          return setFieldValue("rating", star);
                        }}
                        icon={
                          values.rating >= star ? (
                            <HiStar color="orange" />
                          ) : (
                            <HiOutlineStar color="orange" />
                          )
                        }
                      />
                    ))}
                  </Stack>
                </Box>
                <ButtonGroup spacing={2}>
                  <Button
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
              </Form>
            )}
          </Formik>
          </Box>
        </Flex>
      </Container>
    </>
  );
}
