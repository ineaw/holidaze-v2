import { fetchAPI } from "../../lib/strapiApi";
import { getStrapiMedia } from "../../lib/strapiMedia";
import Image from "next/image";
import { Box, Heading, Stack, Text } from "@chakra-ui/react";
import CustomLink from "../../components/layout/Link";

const Accomodation = ({ hotel }) => {
  const imageUrl = getStrapiMedia(hotel.attributes.image);

  return (
    <>
      <Stack spacing={8} align="center">
        <Box>
          <Heading>{hotel.attributes.title}</Heading>
          <Image src={imageUrl} width={200} height={200} />
          <Text>{hotel.attributes.content}</Text>
          <Text>KR {hotel.attributes.price}</Text>
          <CustomLink href="/accomodation" ChakraComponent={Text}>
            Back
          </CustomLink>
        </Box>
      </Stack>
    </>
  );
};

export async function getStaticPaths() {
  const hotelRes = await fetchAPI("/hotels", { fields: ["slug"] });

  return {
    paths: hotelRes.data.map((hotel) => ({
      params: {
        slug: hotel.attributes.slug,
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  let hotel = [];

  try {
    const hotelRes = await fetchAPI("/hotels", {
      filters: {
        slug: params.slug,
      },
      populate: "*",
    });
    hotel = hotelRes.data;
  } catch (error) {
    console.log(error);
  }
  return {
    props: { hotel: hotel[0] },
    revalidate: 1,
  };
}

export default Accomodation;
