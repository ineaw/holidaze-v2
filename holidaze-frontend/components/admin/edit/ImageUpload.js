import {
  Box,
  Flex,
  Avatar,
  Button,
  FormControl,
  FormLabel,
  Stack,
  Icon,
  chakra,
  VisuallyHidden,
} from "@chakra-ui/react";
import { HiOutlineTrash, HiUpl } from "react-icons/hi";

import { useState } from "react";
import { API_URL } from "../../config";

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
    }
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <>
      <h1>Upload Image</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input type="file" onChange={handleFileChange} />
        </div>
        <input type="submit" value="Upload" />
      </form>
      <chakra.form
        method="PUT"
        shadow="base"
        rounded={[null, "md"]}
        overflow={{ sm: "hidden" }}
      >
        <FormControl>
          <FormLabel
            fontSize="sm"
            fontWeight="md"
            color={useColorModeValue("gray.700", "gray.50")}
          >
            Image
          </FormLabel>
          <Flex alignItems="center" mt={1}>
            <Avatar
              boxSize={12}
              bg={useColorModeValue("gray.100", "gray.800")}
              icon={
                <Icon
                  as={FaUser}
                  boxSize={9}
                  mt={3}
                  rounded="full"
                  color={useColorModeValue("gray.300", "gray.700")}
                />
              }
            />
            <Button
              type="button"
              ml={5}
              variant="outline"
              size="sm"
              fontWeight="medium"
              _focus={{ shadow: "none" }}
            >
              Change
            </Button>
          </Flex>
        </FormControl>
        <FormControl>
          <FormLabel
            fontSize="sm"
            fontWeight="md"
            color={useColorModeValue("gray.700", "gray.50")}
          >
            Cover photo
          </FormLabel>
          <Flex
            mt={1}
            justify="center"
            px={6}
            pt={5}
            pb={6}
            borderWidth={2}
            borderColor={useColorModeValue("gray.300", "gray.500")}
            borderStyle="dashed"
            rounded="md"
          >
            <Stack spacing={1} textAlign="center">
              <Icon
                mx="auto"
                boxSize={12}
                color={useColorModeValue("gray.400", "gray.500")}
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
                color={useColorModeValue("gray.600", "gray.400")}
                alignItems="baseline"
              >
                <chakra.label
                  htmlFor="file-upload"
                  cursor="pointer"
                  rounded="md"
                  fontSize="md"
                  color={useColorModeValue("brand.600", "brand.200")}
                  pos="relative"
                  _hover={{
                    color: useColorModeValue("brand.400", "brand.300"),
                  }}
                >
                  <span>Upload a file</span>
                  <VisuallyHidden>
                    <input id="file-upload" name="file-upload" type="file" />
                  </VisuallyHidden>
                </chakra.label>
                <Text pl={1}>or drag and drop</Text>
              </Flex>
              <Text
                fontSize="xs"
                color={useColorModeValue("gray.500", "gray.50")}
              >
                PNG, JPG, GIF up to 10MB
              </Text>
            </Stack>
          </Flex>
        </FormControl>
        <Box
          px={{ base: 4, sm: 6 }}
          py={3}
          bg={useColorModeValue("gray.50", "gray.900")}
          textAlign="right"
        >
          <Button
            type="submit"
            colorScheme="brand"
            _focus={{ shadow: "" }}
            fontWeight="md"
          >
            Save
          </Button>
        </Box>

        <Box visibility={{ base: "hidden", sm: "visible" }} aria-hidden="true">
          <Box py={5}>
            <Box
              borderTop="solid 1px"
              borderTopColor={useColorModeValue("gray.200", "whiteAlpha.200")}
            ></Box>
          </Box>
        </Box>
      </chakra.form>
    </>
  );
}
