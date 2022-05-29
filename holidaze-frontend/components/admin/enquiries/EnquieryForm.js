import {
  Box,
  Heading,
  Stack,
  Text,
  FormLabel,
  Button,
  ButtonGroup,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { CalendarIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import { useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { TextField } from "../../formComponents/FormFields";
import { API_URL } from "lib";

const EnquieryForm = () => {
  const router = useRouter();
  const toast = useToast();

  // const isDateInFuture = date => {
  //   if (!date) { return false; }
  //   const today = new Date();
  //   today.setHours(0,0,0,0);

  //   return !(date > today);
  // }
  // useEffect(() => {
  //   register({name: 'arrive', type: 'custom'}, {validate: { isDateInFuture }});
  //   register({name: 'leave', type: 'custom'}, {validate: { isDateInFuture }});
  // }, [])

  const handleCreate = async (values) => {
    try {
      const json = JSON.stringify({
        data: values,
      });

      const response = await axios.post(
        `${API_URL}/api/enquiries?populate=*`,
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
            <Text color={"body.light"} fontWeight={"700"}>
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
            backgroundColor={"brand.bright"}
            padding="2em"
            mx="auto"
          >
            <Text color={"body.light"} fontWeight={"700"}>
              There was an error while trying to send the enquiry
            </Text>
            <Text color={"body.light"}>Please try again...</Text>
          </Box>
        ),
        duration: 3000,
      });
    }
  };

  const validateForm = Yup.object({
    first_name: Yup.string()
      .matches(/^.{2,30}$/gm, "Maximum character reached")
      .required("Firstname is Required"),
    last_name: Yup.string()
      .matches(/^.{2,30}$/gm, "Maximum character reached")
      .required("Lastname is Required"),
    name: Yup.string()
      .matches(/^.{2,30}$/gm, "Maximum character reached")
      .required("Accomodation is Required"),
    email: Yup.string()
      .email("Must be a valid email")
      .max(255)
      .required("Email is required"),
    room_type: Yup.string()
      .matches(/^.{2,30}$/gm, "Maximum character reached")
      .required("Room type is Required"),
    date: Yup.date().default(() => new Date()),
  });

  return (
    <>
      <Stack align={"center"}>
        <Heading fontSize={"4xl"} my={4}>
          Enquiery
        </Heading>
        <Text fontSize={"lg"} color={"gray.600"}>
          Enter details for booking
        </Text>
      </Stack>
      <Box p={4}>
        <Stack spacing={4}>
          <Formik
            initialValues={{
              first_name: "",
              last_name: "",
              name: "",
              email: "",
              room_type: "",
              arrive: new Date(),
              leave: new Date(),
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
            }) => (
              <Form onSubmit={handleSubmit}>
                <FormLabel>Firstname</FormLabel>
                <TextField
                  placeholder="Enter your Firstname"
                  name="first_name"
                />
                <FormLabel>Lastname</FormLabel>
                <TextField placeholder="Enter your Lastname" name="last_name" />
                <Box my="2em">
                  <FormLabel>Accomodation</FormLabel>
                  <TextField placeholder="Name of accomodation" name="name" />
                </Box>
                <Box>
                  <FormLabel>Email</FormLabel>
                  <TextField placeholder="Email" name="email" />
                </Box>
                <Box my="2em">
                  <FormLabel>Room type</FormLabel>
                  <TextField placeholder="Room type" name="room_type" />
                </Box>
                <Stack direction={"column"} spacing="1em" my="2em">
                  <Box>
                    <FormLabel>Date of arrival</FormLabel>
                    <DatePicker
                      selected={values.arrive}
                      dateFormat="MMMM d, yyyy"
                      className="form-control"
                      name="arrive"
                      onChange={(date) => setFieldValue("arrive", date)}
                      // { ...error &&
                      //   <Alert variant="danger">
                      //     { error.arrive?.type === "isDateInFuture" && <p>Please choose present or past date!</p> }
                      //   </Alert>
                      //   }
                    />
                    <FormLabel>Departure</FormLabel>
                    <DatePicker
                      selected={values.leave}
                      dateFormat="MMMM d, yyyy"
                      className="form-control"
                      name="leave"
                      onChange={(date) => setFieldValue("leave", date)}
                    />
                  </Box>
                </Stack>
                {/* <MyCheckbox name="acceptedTerms">
                    I accept the terms and conditions
                  </MyCheckbox> */}
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
              </Form>
            )}
          </Formik>
        </Stack>
      </Box>
    </>
  );
};

export default EnquieryForm;
