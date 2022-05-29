import {
  Flex,
  Box,
  Heading,
  Breadcrumb,
  BreadcrumbLink,
  BreadcrumbItem,
  Text,
  Center,
} from "@chakra-ui/react";
import PageHead from "../../components/layout/PageHead";
import Link from "next/link";
import { useUser, useFetchUser } from "../../context/authContext";
import Layout from "../../components/layout/";
import { WarningAlert } from "@/components/layout/Alerts";
import DashboardNav from "@/components/dashboard/DashboardNav";

const Dashboard = () => {
  const { user, loading } = useFetchUser();

  return (
    <>
      <Layout user={user}>
        <PageHead title="Dashboard" />
        {!loading &&
          (user ? (
            <>
              <Flex flexDir={["column", "column", "row"]}>
                <Flex
                  w={["100%", "100%", "15%", "15%", "15%"]}
                  flexDir="column"
                  alignItems="center"
                  backgroundColor="brand.accent"
                  color="body.light"
                >
                  <DashboardNav />
                </Flex>
                <Flex
                  w={["100%", "100%", "80%", "80%", "80%"]}
                  p="3%"
                  flexDir="column"
                
                >
                  <Breadcrumb py={2}>
                    <BreadcrumbItem>
                      <BreadcrumbLink as={Link} href={"/"}>
                        Home
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbItem isCurrentPage>
                      <BreadcrumbLink>Dashboard</BreadcrumbLink>
                    </BreadcrumbItem>
                  </Breadcrumb>
                  <Heading fontWeight="normal" mb={4} letterSpacing="tight" textAlign="center">
                    Welcome back,{" "}
                    <Flex display="inline-flex" fontWeight="bold">
                      {user}
                    </Flex>
                  </Heading>
                  <Box>
                    <Center>
                    <Text maxWidth={"380px"} lineHeight="1.4">
                      Welcome to your admin page. Here you can manage your
                      incoming enquiries and emails, and also add a new
                      accomodation to the collection. If you want to edit or
                      delete one of your current listings, please go to the
                      specific listing. There you will find links for editing or
                      deleting.
                    </Text>
                    </Center>
                  </Box>
                </Flex>
              </Flex>
            </>
          ) : (
            <WarningAlert />
          ))}
      </Layout>
    </>
  );
};

export default Dashboard;
