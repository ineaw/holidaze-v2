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
  ButtonGroup,
  Skeleton,
  IconButton,
  Center,
  Container,
  NumberInputField,
  NumberInput,
  InputRightElement,
} from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ImageUpload from "@/components/admin/edit/ImageUpload";
import Link from "next/link";
import Image from "next/image";
import { API_URL } from "../../../lib";
import { HiStar, HiOutlineStar } from "react-icons/hi";
import * as Yup from "yup";
import { TextField } from "@/components/formComponents/FormFields";
import qs from "qs";
import { Formik, Form } from "formik";

export default function EditAccomPage({ accomodation }) {
  const [values, setValues] = useState({
    name: accomodation.data.attributes.name,
    address: accomodation.data.attributes.address,
    price: accomodation.data.attributes.price,
    rating: accomodation.data.attributes.rating,
    beds: accomodation.data.attributes.beds,
    room_type: accomodation.data.attributes.room_type,
    facilities: accomodation.data.attributes.facilities,
  });

  const [imagePreview, setImagePreview] = useState(
    accomodation.data.attributes.image.data
      ? accomodation.data.attributes.image.data.attributes.url
      : null
  );

  const router = useRouter();

  const handleCreate = async (values) => {
    const res = await fetch(
      `${API_URL}/api/accomodations/${accomodation.data.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify({ data: { ...values } }),
      }
    );

    if (!res.ok) {
      toast.error("Something Went Wrong");
    } else {
      const accomodation = await res.json();
      toast.success("Your listing was updated Successfully");
      setTimeout(() => {
        router.push(`/accomodations/${accomodation.data.attributes.slug}`);
      }, 3000);
    }
  };

  const imageUploaded = async () => {
    const query = qs.stringify(
      {
        populate: "image",
      },
      {
        encodeValuesOnly: true,
      }
    );

    const res = await fetch(
      `${API_URL}/api/accomodations/${accomodation.data.id}?${query}`
    );
    const data = await res.json();

    setImagePreview(data.data.attributes.image.data.attributes.url);
  };
  const validateForm = Yup.object({
    name: Yup.string()
      .matches(/^.{1,30}$/gm, "Maximum character reached")
      .required("Title is Required"),
    address: Yup.string()
      .matches(/^.{1,30}$/gm, "Maximum character reached")
      .required("Address is Required"),
  });

  const stars = [1, 2, 3, 4, 5];
  return (
    <>
      <Box mx={4}>
        <Link href="/accomodations">Go back</Link>
      </Box>
      <ToastContainer />
      <Container centerContent>
        <Heading as="h1" my={8}>
          Edit {accomodation.data.attributes.name}
        </Heading>
        <Flex
          direction="column"
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          px={24}
          px={[4, 24]}
          py={12}
          mb={8}
        >
          <Container p={["0,2em", "0"]}>
            <Formik
              initialValues={{
                name: accomodation.data.attributes.name,
                address: accomodation.data.attributes.address,
                price: accomodation.data.attributes.price,
                rating: accomodation.data.attributes.rating,
                beds: accomodation.data.attributes.beds,
                room_type: accomodation.data.attributes.room_type,
                facilities: accomodation.data.attributes.facilities,
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
                    <TextField placeholder="Name of Accomodation" name="name" />
                  </Box>
                  <Box>
                    <FormLabel>Address</FormLabel>
                    <TextField placeholder="Address" name="address" />
                  </Box>
                  <Box>
                    <FormLabel>Room type</FormLabel>
                    <TextField placeholder="Room type" name="room_type" />
                  </Box>
                  <Flex direction="row" justifyContent="space-evenly">
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
                  <Box>
                    <FormLabel>Facilities</FormLabel>
                    <TextField placeholder="Facilities" name="facilities" />
                  </Box>
                  <Box>
                    <FormLabel>Description</FormLabel>
                    <TextField
                      placeholder="Description"
                      name="description"
                      textbox
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
            <ImageUpload
              accomId={accomodation.data.id}
              imageUploaded={imageUploaded}
            />
            {imagePreview ? (
              <>
                <Heading as="h3" fontSize="lg" textAlign="center">
                  Featured image
                </Heading>
                <Box py="4">
                  <Center>
                    <Image
                      src={imagePreview}
                      width={170}
                      height={100}
                      alt="Hotel room image"
                    />
                  </Center>
                </Box>
              </>
            ) : (
              <Heading as="h4" fontSize="md" textAlign="center">
                No image has been uploaded
              </Heading>
            )}
          </Container>
        </Flex>
      </Container>
    </>
  );
}

export async function getServerSideProps({ params: { id } }) {
  const query = qs.stringify(
    {
      populate: "image",
    },
    {
      encodeValuesOnly: true,
    }
  );
  const res = await fetch(`${API_URL}/api/accomodations/${id}?${query}`);
  const accomodation = await res.json();

  return {
    props: { accomodation },
  };
}
