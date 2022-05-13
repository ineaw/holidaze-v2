import { Button, Heading, Text, Box, Link, useTheme } from "@chakra-ui/react";
import AccomodationCard from "../components/Accomodation/AccomodationCard";

import Head from "../components/layout/Head";
import { AccomodationGrid } from "../components/Accomodation/AccomodationGrid";
import { fetchAPI } from "../lib/strapiApi";
import CustomLink from "../components/layout/Link";
import Hero from "../components/layout/Hero";

const IndexPage = ({ hotels }) => {
  return (
    <>
      <Head title="Home" />
      <Hero />
      <Heading>Holidaze</Heading>
      <Box maxW="7xl" mx="auto" px={{ base: "4", md: "8", lg: "12" }} py={{ base: "6", md: "8", lg: "12" }}>
        <AccomodationGrid>
          {hotels.length === 0 && <h3>No Hotels to show</h3>}
          {hotels.map((place) => (
            <AccomodationCard key={place.id} place={place} />
          ))}
        </AccomodationGrid>
      </Box>
      <Box>
        {hotels.length > 0 && (
          <CustomLink href="/accomodation" ChakraComponent={Button}>
            View all accomodation
          </CustomLink>
        )}
      </Box>
    </>
  );
};

export async function getStaticProps() {
  let hotels = [];
  try {
    const accomRes = await fetchAPI("/hotels", {
      populate: "*",
    });

    hotels = accomRes.data;
  } catch (error) {
    console.log(error);
  }

  return {
    props: { hotels: hotels },
    revalidate: 1,
  };
}

export default IndexPage;
