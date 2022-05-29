import Layout from "../../components/layout/";
import { useUser, useFetchUser } from "../../context/authContext";
import { Flex } from "@chakra-ui/react";
import CreateAccomodation from "../../components/admin/create/CreateAccomodation";
import DashboardNav from "@/components/dashboard/DashboardNav";
import PageHead from "@/components/layout/PageHead";

export default function CreatePage() {
  const { user, loading } = useFetchUser();
  return (
    <Layout user={user}>
      <PageHead title="Create new Accomodation" />
      <Flex flexDir={["column", "column", "row"]}>
        <Flex
          w={["100%", "100%", "20%", "15%", "15%"]}
          flexDir="column"
          alignItems="center"
          backgroundColor="brand.accent"
          color="body.light"
          p={2}
        >
          <DashboardNav />
        </Flex>
        <CreateAccomodation />
      </Flex>
    </Layout>
  );
}
