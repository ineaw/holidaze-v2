import { useState } from "react";
import { AiFillPlusCircle } from "react-icons/ai";

function getImage(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

const UploadImage = ({ images, setImages }) => {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const handleCancel = () => setPreviewVisible(false);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getImage(file.originFileObj);
    }

    setPreviewVisible(true);

    setPreviewImage(file.url || file.preview);
  };

  const handleChange = ({ fileList }) => {
    setImages(fileList);
  };

  const uploadButton = (
    <div>
      <AiFillPlusCircle />
    </div>
  );

  const dummyRequest: any = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  return <></>;
};

export default UploadImage;
