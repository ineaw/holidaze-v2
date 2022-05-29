import { Flex, Heading, Link, Box } from "@chakra-ui/react";
import { CustomNavLink } from "../layout/CustomLinks";

export default function DashboardNav() {
  return (
    <>
      <Flex
        flexDirection="column"
        h={[null, null, "80vh"]}
        justifyContent="space-between"
        alignItems="center"
        textAlign="center"
      >
        <Flex flexDirection="column" as="nav" my="25" p="4">
          <Heading as="h4" fontSize="xl">
            Dashboard
          </Heading>
          <Flex
            direction={["row", "row", "column", "column", "column"]}
            alignItems="center"
            justifyContent="space-between"
          >
            <Box my="4" mx={["4", "4", "2", "0", "0"]}>
              <CustomNavLink href={"/dashboard"}>
                <Link>Account</Link>
              </CustomNavLink>
            </Box>
            <Box my="4" mx={["4", "4", "2", "0", "0"]}>
              <CustomNavLink href={"/dashboard/enquiries"}>
                <Link>Enquiries </Link>
              </CustomNavLink>
            </Box>
            <Box my="4" mx={["4", "4", "2", "0", "0"]}>
              <CustomNavLink href={"/dashboard/email"}>
                <Link> Mail </Link>
              </CustomNavLink>
            </Box>
            <Box my="4" mx={["4", "4", "2", "0", "0"]}>
              <CustomNavLink href={"/dashboard/create"}>
                <Link>New accomodation</Link>
              </CustomNavLink>
            </Box>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
