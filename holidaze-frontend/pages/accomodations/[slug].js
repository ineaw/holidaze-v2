import Link from "next/link";
import { API_URL } from "../../lib";
import { useRouter } from "next/router";
import AccomodationDetail from "../../components/Accomodations/AccomodationDetail";
import {
  getTokenFromLocalCookie,
  getTokenFromServerCookie,
  getUserFromLocalCookie,
} from "../../lib/auth";
import { useFetchUser } from "../../context/authContext";
import Layout from "../../components/layout";
import {
  BreadcrumbItem,
  BreadcrumbLink,
  Breadcrumb,
  ButtonGroup,
  IconButton,
  Box,
  Flex,
} from "@chakra-ui/react";
import { HiOutlineTrash, HiPencil } from "react-icons/hi";
import { CustomLink } from "../../components/layout/CustomLinks";
import PageHead from "@/components/layout/PageHead";

export default function AccomodationPage({ accom, categories, jwt, error }) {
  const { user, loading } = useFetchUser();

  const router = useRouter();

  const deleteEvent = async (e) => {
    if (confirm("Are you sure you want to delete this accomodation?")) {
      const res = await fetch(`${API_URL}/api/accomodations/${accom.id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        data.message;
      } else {
        router.push("/accomodations");
      }
    }
  };

  const EditButtons = () => {
    if (!user) {
      return false;
    }

    return (
      <>
        <Flex direction="row" justifyContent="flex-end">
          <Box>
            <ButtonGroup variant="solid" size="sm" spacing={3}>
              <CustomLink href={`/accomodations/edit/${accom.id}`}>
                <IconButton variant='outline' colorScheme="green" icon={<HiPencil />} />
              </CustomLink>
              <IconButton
                colorScheme="red"
                variant="outline"
                icon={<HiOutlineTrash />}
                onClick={deleteEvent}
              >
                Delete
              </IconButton>
            </ButtonGroup>
          </Box>
        </Flex>
      </>
    );
  };

  return (
    <>
      <Layout user={user}>
        {/* <CategoryNav categories={categories} /> */}
        <PageHead title={accom.name} />
        <Box
          px={{ sm: 2, base: 4, md: 8 }}
          py={{ sm: 6, base: 8, md: 14, lg: 20 }}
        >
          <Breadcrumb>
            <BreadcrumbItem>
              <BreadcrumbLink as={Link} href={"/"}>
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink as={Link} href={"/accomodations"}>
                Accomodations
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink _disabled>{accom.attributes.name}</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          {!loading && (user ? <>{EditButtons()}</> : "")}
          <AccomodationDetail accom={accom} />
        </Box>
      </Layout>
    </>
  );
}

export async function getStaticPaths() {
  const res = await fetch(`${API_URL}/api/accomodations`);
  const accomodations = await res.json();
  const paths = accomodations.data.map((accom) => ({
    params: { slug: accom.attributes.slug },
  }));

  return { paths, fallback: true };
}

export async function getStaticProps({ params: { slug } }) {
  const qs = require("qs");
  const query = qs.stringify(
    {
      filters: {
        slug: {
          $eq: slug,
        },
      },
      populate: ["image", "category"],
    },
    {
      encodeValuesOnly: true,
    }
  );
  const response = await fetch(`${API_URL}/api/accomodations?${query}`);
  const accomodations = await response.json();
  const categoriesRes = await fetch(`${API_URL}/api/categories?${query}`);
  const categories = await categoriesRes.json();

  return {
    props: {
      accom: accomodations.data[0],
      categories: categories.data,
    },
    revalidate: 1,
  };
}
