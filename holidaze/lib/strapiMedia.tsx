import { getStrapiURL } from "./strapiApi";

export function getStrapiMedia(image) {
  const { url } = image.data.attributes;
  const imageUrl = url.startsWith("/") ? getStrapiURL(url) : url;
  return imageUrl;
}
