import { Box, Heading, Text, Button } from "@chakra-ui/react";
import PageHead from "@/components/layout/PageHead";

export default function NotFound() {
  return (
    <>
      <PageHead title="404" />
      <Box textAlign="center" py={10} px={6}>
        <Heading
          display="inline-block"
          as="h2"
          size="2xl"
        >
          404
        </Heading>
        <Text fontSize="18px" mt={3} mb={2}>
          Page Not Found
        </Text>
        <Text color={"gray.500"} mb={6}>
          The page you are looking for does not seem to exist
        </Text>
        <Button
          bg="brand.dark"
          color="white"
          variant="solid"
        >
          Go Home
        </Button>
      </Box>
    </>
  );
}
