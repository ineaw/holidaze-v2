import { Heading, Text, Box } from "@chakra-ui/react";
import AccomodationCard from "../component/Accomodation/AccomodationCard";
import Head from "../component/layout/Head";
import { AccomodationGrid } from "../component/Accomodation/AccomodationGrid";
import { fetchAPI } from "../lib/strapiApi";

const AccomodationPage = ({ hotels }) => {
  return (
    <>
      <Head title="Accomodation" />
      <Heading>Holidaze</Heading>
      <Box maxW="7xl" mx="auto" px={{ base: "4", md: "8", lg: "12" }} py={{ base: "6", md: "8", lg: "12" }}>
        <AccomodationGrid>
          {hotels.length === 0 && <h3>No Hotels to show</h3>}
          {hotels.map((place) => (
            <AccomodationCard key={place.id} place={place} />
          ))}
        </AccomodationGrid>
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

export default AccomodationPage;
