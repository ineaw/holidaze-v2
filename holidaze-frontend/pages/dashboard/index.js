import {
  Button,
  Center,
  Container,
  Flex,
  Heading,
  Wrap,
  Tab,
  TabList,
  TabPanels,
  Stack,
  Tabs,
  Box,
  Breadcrumb,
  BreadcrumbLink,
  BreadcrumbItem,
  Spinner,
} from "@chakra-ui/react";
import Link from "next/link";
// import Head from "../../components/layout/Head";
import RecievedEnquiries from "./enquiries";
import { useRouter } from "next/router";
import { useUser, useFetchUser } from "../../lib/authContext";
import Layout from "../../components/layout/Layout";
import { getTokenFromServerCookie } from "../../lib/auth";

const MyAccountPage = ({ hotels }) => {
  const { user, loading } = useFetchUser();

  const router = useRouter();

  return (
    <>
      {/* <Head title="My account" /> */}
      {/* <MyAccountPageComponent /> */}
      <Layout user={user}>
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink as={Link} href={"/"}>
              <a>Home</a>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink>Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>

        <Stack align={"center"}>
          <Box
            maxW="80vw"
            mx="auto"
            px={{ base: "4", md: "8", lg: "12" }}
            py={{ base: "6", md: "8", lg: "12" }}
          >
            {!loading &&
              (user ? (
                <Wrap>
                  <Tabs size="sm" variant="enclosed">
                    <TabList>
                      {/* <Tab _selected={{ color: "white", bg: "green.400" }}>Enquires</Tab> */}
                      <Tab _selected={{ color: "green" }}>
                        <Link href={`/my-account/enquiries`} passHref>
                          Enquires
                        </Link>
                      </Tab>
                      <Tab _selected={{ color: "green" }}>
                        <Link href={`/my-account/email`} passHref>
                          Messages
                        </Link>
                      </Tab>
                      <Tab _selected={{ color: "green" }}>
                        <Link href={`/my-account/add`} passHref>
                          New acommodation
                        </Link>
                      </Tab>
                    </TabList>
                  </Tabs>
                </Wrap>
              ) : (
                <Heading>
                  You are not authorized to view the content of this page
                </Heading>
              ))}
          </Box>
        </Stack>
      </Layout>
    </>
  );
};

export default MyAccountPage;
