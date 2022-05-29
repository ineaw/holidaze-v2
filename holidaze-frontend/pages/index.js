import NextLink from "next/link";
import PageHead from "../components/layout/PageHead";
import AccomodationCard from "../components/Accomodations/AccomodationCard";
import { AccomodationGrid } from "../components/Accomodations/AccomodationGrid";
import { Box, Center, Link } from "@chakra-ui/react";
import { API_URL } from "../lib/index";
import Layout from "../components/layout/index";
import { useFetchUser } from "../context/authContext";
import qs from "qs";
import { fetcher } from "lib/api";

export default function HomePage({ accomodations }) {
  const { user } = useFetchUser();
  return (
    <>
      <Layout user={user}>
      <PageHead />
        <Box px={{ base: 2, md: 6 }} py={{ sm: 6, base: 8, md: 14, lg: 20 }}>
          <AccomodationGrid>
            {accomodations.data.length === 0 && (
              <h3>No accomodations to show</h3>
            )}
            {accomodations.data.map((accom) => (
              <AccomodationCard key={accom.id} accom={accom.attributes} />
            ))}
          </AccomodationGrid>
          {accomodations.data.length > 0 && (
            <Center>
              <Box display="inline-flex" rounded="md" shadow="md">
                <NextLink href="/accomodations">
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
                    color={"body.light"}
                    bg={"brand.dark"}
                    _hover={{
                      bg: ("brand.darkhover"),
                    }}
                  >
                    View All accomodations
                  </Link>
                </NextLink>
              </Box>
            </Center>
          )}
        </Box>
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  const query = qs.stringify(
    {
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
    fetcher(`${API_URL}/api/accomodations?${query}`),
    fetcher(`${API_URL}/api/categories?${query}`),
  ]);
  return {
    props: {
      accomodations: accomRes,
      categories: categoriesRes.data,
    },
    revalidate: 1,
  };
}
