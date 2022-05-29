// import CategoryNav from "../../components/Layout/CategoryNav";
import AccomodationCard from "../../components/Accomodations/AccomodationCard";
import { AccomodationGrid } from "../../components/Accomodations/AccomodationGrid";
import { API_URL } from "../../lib";
import Pagination from "../../components/layout/Pagination";
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from "@choc-ui/chakra-autocomplete";
import {
  IconButton,
  Center,
  Box,
  Flex,
  InputGroup,
  InputRightElement,
  BreadcrumbItem,
  BreadcrumbLink,
  Breadcrumb,
  Heading,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import NextLink from "next/link";
import { useFetchUser } from "../../context/authContext";
import Layout from "../../components/layout";
import qs from "qs";
import PageHead from "@/components/layout/PageHead";
import { fetcher } from "lib/api";

const ACCOM_PER_PAGE = 12;

export default function AccomodationsPage({ accomodations, page, pageCount }) {
  const { user, loading } = useFetchUser();

  return (
    <>
      <Layout user={user}>
        <PageHead title="Accomodations" />
        <Heading as="h1" textAlign="center" marginBottom={24}>
          {" "}
          Accomodation in Bergen
        </Heading>
        <Flex direction={"column"} alignItems={"center"}>
          <Box>
            <AutoComplete rollNavigation>
              <InputGroup>
                <InputRightElement
                  pointerEvents="none"
                  children={<SearchIcon color="gray.500" />}
                />
                <AutoCompleteInput
                  variant="filled"
                  placeholder="Search for hotels..."
                />
              </InputGroup>
              <AutoCompleteList bg={"white"}>
                {accomodations.data.map((accom) => (
                  <NextLink
                    key={`${accom.id}`}
                    href={`/accomodations/${accom.attributes.slug}`}
                  >
                    <AutoCompleteItem
                      value={
                        accom.attributes.name || accom.attributes.description
                      }
                      textTransform="capitalize"
                      align="center"
                    >
                      {accom.attributes.name}
                    </AutoCompleteItem>
                  </NextLink>
                ))}
              </AutoCompleteList>
            </AutoComplete>
          </Box>
          <AccomodationGrid>
            {accomodations.data.length === 0 && (
              <h3>No accomodations to show</h3>
            )}
            {accomodations.data.map((accom) => (
              <AccomodationCard key={accom.id} accom={accom.attributes} />
            ))}
          </AccomodationGrid>
          <Pagination page={page} pageCount={pageCount} />
        </Flex>
      </Layout>
    </>
  );
}

export async function getServerSideProps({ query: { page = 1 } }) {
  const query = qs.stringify(
    {
      populate: ["image", "category"],
      pagination: {
        page: page,
        pageSize: ACCOM_PER_PAGE,
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
      page: accomRes.meta.pagination.page,
      pageCount: accomRes.meta.pagination.pageCount,
    },
  };
}
