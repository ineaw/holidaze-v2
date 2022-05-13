import { fetchAPI } from "../../lib/strapiApi";
import { getStrapiMedia } from "../../lib/strapiMedia";
import Image from "next/image";
import { Box, Heading, Stack, Text } from "@chakra-ui/react";
import CustomLink from "../../component/Link";

const Accomodation = ({ hotel }) => {
  const imageUrl = getStrapiMedia(hotel.attributes.image);

  return (
    <>
      <Stack spacing={8} align="center">
        <Box>
          <Heading>{hotel.attributes.name}</Heading>
          <Image src={imageUrl} width={200} height={200} />
          <Text>{hotel.attributes.desicription}</Text>
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
  const hotelRes = await fetchAPI("/hotels", {
    filters: {
      slug: params.slug,
    },
    populate: "*",
  });

  return {
    props: { hotel: hotelRes.data[0] },
    revalidate: 1,
  };
}

export default Accomodation;
