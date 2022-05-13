import { Container, Button, Stack, Box, Heading, useToast, Text } from "@chakra-ui/react";
import Link from "next/link";
import { Formik, Form } from "formik";
import { useRouter } from "next/router";
import { useState } from "react";
import { useSession } from "next-auth/react";
import Head from "../../component/layout/Head";

import UploadImage from "../../component/UploadImage";

import axios from "axios";
import * as Yup from "yup";

const CreateAccomodation = () => {
  const { data: session, status } = useSession();

  const router = useRouter();
  const toast = useToast();

  const [images, setImages] = useState([]);

  if (status === "loading") {
    return <p>Please Wait</p>;
  }

  if (status === "unauthenticated") {
    router.push("/");
    return <p>Not Authorized</p>;
  }

  const handleCreate = async (values) => {
    const { name } = values;

    try {
      let files = [];

      if (images.length >= 1) {
        const data = new FormData();

        images.forEach(async (img) => {
          return data.append("files", img.originFileObj);
        });

        const res = await axios.post(`http://localhost:1337/api/upload`, data, {
          headers: {
            "Content-type": "application/json",
          },
        });

        await res.data.forEach((file) => {
          files.push(file.id);
        });
      }

      const json = JSON.stringify({
        data: values,
        image: files,
        jwt: session.jwt,
      });

      const response = await axios.post(`http://localhost:1337/api/hotels?populate=*`, json, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      toast({
        position: "top",
        title: `Hello, ${session.username}!`,
        render: () => (
          <Box borderRadius={"0.3em"} backgroundColor={"#40916c"} padding="2em" mx="auto">
            <Text color={"black"} fontWeight={"700"}>
              Successfully Posted
            </Text>
          </Box>
        ),
        duration: 3000,
      });

      router.push(`/hotels`);
    } catch (error) {
      const errorObj = { error };

      toast({
        position: "top",
        render: () => (
          <Box borderRadius={"0.3em"} backgroundColor={"red.300"} padding="2em" mx="auto">
            <Text color={"black"} fontWeight={"700"}>
              Post error
            </Text>
            <Text color={"black"}>Try it again...</Text>
          </Box>
        ),
        duration: 3000,
      });
    }
  };

  const validateForm = Yup.object({
    title: Yup.string()
      .matches(/^.{1,30}$/gm, "Maximum character reached")
      .required("Title is Required"),
    // description: Yup.string().required("Description is Required"),
  });

  return (
    <>
      <Head title="Create" />
      <Container my="2em" textAlign={["start", "start", "center"]}>
        <Heading as="h1" fontSize="2rem" letterSpacing="1px">
          Upload
        </Heading>
        <Text as="h3" fontSize="1rem" letterSpacing="0.5px">
          Add a new accomodation
        </Text>
      </Container>
      <Container p={["0,2em", "0"]}>
        <Formik
          initialValues={{
            title: "",
          }}
          validationSchema={validateForm}
          onSubmit={handleCreate}
        >
          {({ isSubmitting, handleSubmit, handleReset, values, setFieldValue }) => (
            <Form onSubmit={handleSubmit}>
              <Text placeholder="Title" title="title" />
              <Box my="2em">
                <Heading fontSize={"1em"} mb="1em">
                  Upload Images
                </Heading>
                <UploadImage images={images} setImages={setImages} />
              </Box>
              <Stack direction="row" justifyContent="space-between">
                <Button isLoading={isSubmitting} disabled={isSubmitting} loadingText="Submitting" size="lg" type="submit">
                  Submit
                </Button>
                <Stack direction="column">
                  <Button size="sm" colorScheme="red" onClick={handleReset} disabled={isSubmitting}>
                    Clear
                  </Button>
                  <Link href={"/my-account"} passHref>
                    <Button size="sm" disabled={isSubmitting}>
                      Cancel
                    </Button>
                  </Link>
                </Stack>
              </Stack>
            </Form>
          )}
        </Formik>
      </Container>
    </>
  );
};

export default CreateAccomodation;
