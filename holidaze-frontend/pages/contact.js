import { Container } from "@chakra-ui/react";
import ContactForm from "../components/form-components/ContactForm";
import Layout from "../components/layout/Layout";
import { useFetchUser } from "../lib/authContext";

export default function Contact() {
  const { user, loading } = useFetchUser();

  return (
    <Layout user={user}>
      <Container maxW="full" mt={0} centerContent overflow="hidden">
        <ContactForm />
      </Container>
    </Layout>
  );
}
