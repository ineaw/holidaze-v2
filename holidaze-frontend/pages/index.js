import NextLink from "next/link";

// import Head from "../components/Layout/Head";
import AccomodationCard from "../components/Accomodations/AccomodationCard";
import { AccomodationGrid } from "../components/Accomodations/AccomodationGrid";
import { Box, Container, Center, Link, useColorModeValue } from "@chakra-ui/react";
// import { AutoComplete, AutoCompleteInput, AutoCompleteItem, AutoCompleteList } from "@choc-ui/chakra-autocomplete";
// import { IconButton } from "@chakra-ui/react";
// import { SearchIcon } from "@chakra-ui/icons";
import { API_URL } from "../config/index";
import Layout from "../components/layout/index";
import { useFetchUser } from "../context/authContext";
import { CustomLink } from "../components/layout/CustomLinks";

export default function HomePage({ accomodations }) {
  // const { user, loading } = useFetchUser();
  return (
    <>
      <Layout>
        <Container maxW={400} p={6}>
        </Container>
        <AccomodationGrid>
          {accomodations.data.length === 0 && <h3>No accomodations to show</h3>}
          {accomodations.data.map((accom) => (
            <AccomodationCard key={accom.id} accom={accom.attributes} />
          ))}
        </AccomodationGrid>
        {accomodations.data.length > 0 && (
          <Center>
          <Box display="inline-flex" rounded="md" shadow="md">
          <NextLink href="/accomodations" passHref>
            <Link
              w="full"
              display="inline-flex"
              alignItems="center"
              justifyContent="center"
              px={4}
              py={2}
              border="solid transparent"
              fontWeight="bold"
              rounded="md"
              color={useColorModeValue("white")}
              bg={useColorModeValue("green.600", "green.500")}
              _hover={{
                bg: useColorModeValue("brand.700", "brand.600"),
              }}
            
            >
              <a>View All accomodations</a>
            </Link>
          </NextLink>
          
            </Box>
            </Center>
        )}
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  const qs = require("qs");
  const query = qs.stringify(
    {
      // sort: ["name"],
      populate: ["image", "category", "*"],
      pagination: {
        start: 0,
        limit: 3,
      },
    },
    {
      encodeValuesOnly: true,
    }
  );
  const [accomRes, categoriesRes] = await Promise.all([
    fetch(`${API_URL}/api/accomodations?${query}`),
    fetch(`${API_URL}/api/categories?${query}`),
  ]);
  const accomodations = await accomRes.json();
  const categories = await categoriesRes.json();
  console.log(categoriesRes);
  return {
    props: {
      accomodations: accomodations,
      categories: categories.data,
    },
    revalidate: 1,
  };
}
