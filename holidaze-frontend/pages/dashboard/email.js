import { Heading, Text, Box, Stack, Spinner } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Layout from "../../components/layout/Layout";
import { API_URL } from "../../config";
// import AdminPanel from "@/components/AdminPanel";
import { useFetchUser } from "../../lib/authContext";

const RecievedEmails = ({ emails }) => {
  const router = useRouter();
  const { user } = useFetchUser();


  return (
    <>
      <Layout user={user}>
        {/* <AdminPanel /> */}
        <Stack align={"center"}>
          <Box>
            {emails.length === 0 && <h3>No emails</h3>}
            {emails.data.map((mail) => (
              <Box key={mail.id}>
                <Heading>From: {mail.attributes.first_name}</Heading>
                <Text>Message: {mail.attributes.message}</Text>
              </Box>
            ))}
          </Box>
        </Stack>
      </Layout>
    </>
  );
};

export async function getStaticProps() {
  const qs = require("qs");
  const query = qs.stringify(
    {
      populate: "*",
    },
    {
      encodeValuesOnly: true,
    }
  );
  const accomRes = await fetch(`${API_URL}/api/contacts?${query}`);
  const emails = await accomRes.json();
  console.log(emails);
  return {
    props: { emails: emails },
    revalidate: 1,
  };
}

export default RecievedEmails;
