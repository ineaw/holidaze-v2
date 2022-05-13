import { Button, Heading, Text, Box, Link, useTheme } from "@chakra-ui/react";
import AccomodationCard from "../component/Accomodation/AccomodationCard";

import Head from "../component/layout/Head";
import { AccomodationGrid } from "../component/Accomodation/AccomodationGrid";
import { fetchAPI } from "../lib/strapiApi";
import CustomLink from "../component/Link";

const IndexPage = ({ accomRes }) => {
  return (
    <>
      <Head title="Home" />
      <Heading>Holidaze</Heading>
      <Box maxW="7xl" mx="auto" px={{ base: "4", md: "8", lg: "12" }} py={{ base: "6", md: "8", lg: "12" }}>
        <AccomodationGrid>
          {accomRes.length === 0 && <h3>No Hotels to show</h3>}
          {accomRes.data.map((place) => (
            <AccomodationCard key={place.id} place={place} />
          ))}
        </AccomodationGrid>
      </Box>
      <Box>
        {accomRes.length > 0 && (
          <CustomLink href="/accomodation" ChakraComponent={Text}>
            View all accomodation
          </CustomLink>
        )}
      </Box>
    </>
  );
};

export async function getStaticProps() {
  const accomRes = await fetchAPI("/hotels", {
    populate: "*",
  });

  return {
    props: { accomRes },
    revalidate: 1,
  };
}

export default IndexPage;
