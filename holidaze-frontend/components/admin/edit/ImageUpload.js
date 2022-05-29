import {
  Box,
  Flex,
  chakra,
  Button,
  FormControl,
  FormLabel,
  Stack,
  Icon,
  Container,
  Heading,
  useColorModeValue,
  VisuallyHidden,
  Text,
} from "@chakra-ui/react";
import { HiOutlineTrash, HiUpl } from "react-icons/hi";
import { FaUser } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Formik, Form } from "formik";

import { useState } from "react";
import { API_URL } from "../../../lib";

export default function ImageUpload({ accomId, imageUploaded }) {
  const [image, setImage] = useState(null);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  // const handleCancel = () => setPreviewVisible(false);

  // const handlePreview = async (image) => {
  //       if (!image.url && !image.preview) {
  //         image.preview = setImage(image);
  //        }
  //        setPreviewVisible(true);

  //        setPreviewImage(image.url || image.preview);
  //       }
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("files", image);
    formData.append("ref", "api::accomodation.accomodation");
    formData.append("refId", accomId);
    formData.append("field", "image");

    const res = await fetch(`${API_URL}/api/upload`, {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      imageUploaded();
      toast.success("Your Image was created Successfully");
      setTimeout(() => {}, 3000);
    }
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <>
      <ToastContainer />
      <Container textAlign="center" my="8">
        <form onSubmit={handleSubmit}>
          <FormControl>
            <FormLabel fontSize="md" textAlign="center" my={6}>
              Image upload
            </FormLabel>
            <Stack spacing={1} textAlign="center">
              <Icon
                mx="auto"
                boxSize={12}
                color={"gray.500"}
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Icon>
              <Flex
                fontSize="sm"
                color={"gray.600"}
                alignItems="baseline"
              >
                <chakra.label
                  htmlFor="file"
                  cursor="pointer"
                  rounded="md"
                  fontSize="md"
                  color={("brand.dark")}
                  pos="relative"
                  _hover={{
                    color: ("brand.bright"),
                  }}
                >
                  <span>Press to here upload a file</span>
                  <VisuallyHidden>
                    <input
                      type="file"
                      id="file"
                      name="file"
                      onChange={handleFileChange}
                    />
                  </VisuallyHidden>
                </chakra.label>
                <Text pl={1}> up to 200kb</Text>
              </Flex>
              <Text
                fontSize="xs"
                color={useColorModeValue("gray.500", "gray.50")}
              >
                You can only upload an image once
              </Text>
            </Stack>
          </FormControl>
          <Button mt={4} type="submit" value="Upload">
            Click to set image
          </Button>
        </form>
      </Container>
    </>
  );
}
