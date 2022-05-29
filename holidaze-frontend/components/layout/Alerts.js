import { Box, Heading, Text, Link } from "@chakra-ui/react";
import { WarningTwoIcon, CheckCircleIcon } from "@chakra-ui/icons";
import { CustomLink } from "./CustomLinks";

export function WarningAlert() {
  return (
    <Box textAlign="center" py={10} px={6}>
      <WarningTwoIcon boxSize={"50px"} color={"orange.300"} />
      <Heading as="h1" size="xl" mt={6} mb={2}>
        You are no authorized to view this content,
      </Heading>
      <Text color={"gray.500"}>
        Please proceed to the
        <span>
          <CustomLink href={"/account/login"} passhref>
            <Link color='teal.500'> Login Page </Link>
          </CustomLink>
        </span>
      </Text>
    </Box>
  );
}

export function SuccessAlert() {
  return (
    <Box textAlign="center" py={10} px={6}>
      <CheckCircleIcon boxSize={"50px"} color={"green.500"} />
      <Heading as="h1" size="xl" mt={6} mb={2}>
        Success
      </Heading>
      <Text color={"gray.500"}>You are signed in, redirecting to homepage</Text>
    </Box>
  );
}
