import { getStrapiMedia } from "../../lib/strapiMedia";
import NextImage from "next/image";

const TheImage = ({ image, style, evt }) => {
  const { url, alternativeText, width, height } = image.data.attributes;

  const loader = () => {
    return getStrapiMedia(image);
  };

  return <NextImage loader={loader} layout="responsive" width={width} height={height} objectFit="contain" src={getStrapiMedia(image)} alt={alternativeText || ""} />;
};

export default TheImage;
