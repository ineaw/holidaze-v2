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
      <h1>Upload Event Image</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input type="file" onChange={handleFileChange} />
        </div>
        <input type="submit" value="Upload" />
      </form>
    </>
  );
}
