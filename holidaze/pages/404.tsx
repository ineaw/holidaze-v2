import { Button, Text } from "@chakra-ui/react";
import CustomLink from "../components/layout/Link";

export default function NotFound() {
  return (
    // <Layout title="Page Not Found">
    <div>
      <h1>404</h1>
      <h4>Sorry, Nothing is here</h4>
      <CustomLink href="/" ChakraComponent={Text}>
        Go Back Home
      </CustomLink>
    </div>
    // </Layout>
  );
}
