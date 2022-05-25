import {
  Button,
  Stack,
  Box,
  Heading,
  useToast,
  Text,
  FormLabel,
  Flex,
  useColorModeValue,
  IconButton,
  Center,
} from "@chakra-ui/react";
import Link from "next/link";
import { Formik, Form } from "formik";
import { useRouter } from "next/router";
import { useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import * as Yup from "yup";
import TextField from "../../components/form-components/TextField";
import { API_URL } from "../../config";
import Layout from "../../components/layout/Layout";
import { useUser, useFetchUser } from "../../lib/authContext";

const NewAccomodation = ({ id, token }) => {
  const { user, loading } = useFetchUser();

  const [values, setValues] = useState({
    name: "",
    address: "",
    date: "",
    description: "",
    rating: 0,
    category: "",
    //   jwt: token.jwt,
  });
  const router = useRouter();
  const toast = useToast();

  // const { push } = useRouter()

  const handleCreate = async (values) => {
    try {
      const res = await fetch(`${API_URL}/api/accomodations?=*`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify({ data: { ...values } }),
      });
      if (responseData.message === "success") {
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
                Successfully Posted
              </Text>
            </Box>
          ),
          duration: 3000,
        });
        const accomodation = await res.json();
        router.push(`/accomodations/${accomodation.data.attributes.slug}`);
      }
    } catch (error) {
      toast({
        position: "top",
        render: () => (
          <Box
            borderRadius={"0.3em"}
            backgroundColor={"red.300"}
            padding="2em"
            mx="auto"
          >
            <Text color={"black"} fontWeight={"700"}>
              Post error
            </Text>
            <Text color={"black"}>Try again...</Text>
          </Box>
        ),
        duration: 3000,
      });
    }
    console.error(JSON.stringify(error));
    // clearAlert();
  };

  const validateForm = Yup.object({
    name: Yup.string()
      .matches(/^.{1,30}$/gm, "Maximum character reached")
      .required("Title is Required"),
    address: Yup.string()
      .matches(/^.{1,30}$/gm, "Maximum character reached")
      .required("Address is Required"),
    category: Yup.string().required("category is Required"),
  });

  const category = ["Cabin", "Hotel", "Bed & Breakfast"];
  const stars = [1, 2, 3, 4, 5];

  return (
    <>
      <Layout user={user}>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <Formik
              initialValues={{
                values,
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
                  <Box>
                    <FormLabel>name</FormLabel>
                    <TextField placeholder="name" name="name" />
                  </Box>
                  <Box>
                    <FormLabel>address</FormLabel>
                    <TextField placeholder="address" name="address" />
                  </Box>
                  <Box my="2em">
                    <FormLabel>Category</FormLabel>
                    <TextField
                      selectField={category}
                      placeholder="category"
                      name="category"
                    />
                  </Box>
                  <Box my="2em">
                    <FormLabel>Rating</FormLabel>
                    <Stack direction={"row"}>
                      {stars.map((star) => (
                        <IconButton
                          key={star}
                          fontSize="2em"
                          variant={"ghost"}
                          aria-label="star"
                          onClick={() => setFieldValue("rating", star)}
                          icon={
                            values.rating >= star ? (
                              <AiFillStar color="rgb(221, 227, 146)" />
                            ) : (
                              <AiOutlineStar />
                            )
                          }
                        />
                      ))}
                    </Stack>
                  </Box>
                  <Stack direction="row" justifyContent="space-between">
                    <Button
                      isLoading={isSubmitting}
                      disabled={isSubmitting}
                      loadingText="Submitting"
                      size="lg"
                      type="submit"
                    >
                      Submit
                    </Button>
                    <Stack direction="column">
                      <Button
                        size="sm"
                        colorScheme="orange"
                        onClick={handleReset}
                        disabled={isSubmitting}
                      >
                        Clear
                      </Button>
                      <Link href={"/dashboard"} passHref>
                        <Button size="sm" disabled={isSubmitting}>
                          Cancel
                        </Button>
                      </Link>
                    </Stack>
                  </Stack>
                </Form>
              )}
            </Formik>
          </Stack>
        </Box>
      </Layout>
    </>
  );
};

export default NewAccomodation;
