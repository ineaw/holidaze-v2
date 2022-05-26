import { Container } from "@chakra-ui/react";
import ContactForm from "../components/admin/contact/ContactForm";
import { useFetchUser } from "../context/authContext";
import Layout from "../components/layout/index";

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
