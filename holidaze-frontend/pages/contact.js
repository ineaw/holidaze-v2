import { Box, Container } from "@chakra-ui/react";
import ContactForm from "../components/admin/contact/ContactForm";
import { useFetchUser } from "../context/authContext";
import Layout from "../components/layout/index";
import PageHead from "@/components/layout/PageHead";

export default function Contact() {
  const { user, loading } = useFetchUser();

  return (
    <Layout user={user}>
      <PageHead title="Contact" />
      <Box px={{ base: 2, md: 6 }} py={{ sm: 6, base: 8, md: 14, lg: 20 }}>
        <Container>
          <ContactForm />
        </Container>
      </Box>
    </Layout>
  );
}
