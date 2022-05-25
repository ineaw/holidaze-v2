import {
    Heading,
    Text,
    Box,
    Stack,
    Tab,
    TabList,
    Tabs,
  } from "@chakra-ui/react";
//   import { useSession } from "next-auth/react";
  import { useRouter } from "next/router";
  import { API_URL } from "../../config";
  import Link from "next/link";
//   import AdminPanel from "@/components/AdminPanel";
  
  const RecievedEnquiries = ({ enquiries }) => {
    // const { data: session, status } = useSession();
    const router = useRouter();
  
    // if (status === "loading")
    //   return <Heading>Checking Authentication...</Heading>;
  
    // if (!session) {
    //   setTimeout(() => {
    //     router.push("/auth/signin");
    //   }, 5000);
    //   return (
    //     <Stack isInline spacing={4} align="center">
    //       <Heading>You have to be signed in</Heading>
    //     </Stack>
    //   );
    // }
  
    return (
      <>
        {/* <AdminPanel /> */}
        <Stack align={"center"}>
          {/* <Heading>Inbox</Heading>
          <Tabs size="sm" variant="enclosed">
            <TabList>
              {/* <Tab _selected={{ color: "white", bg: "green.400" }}>Enquires</Tab> */}
          {/* <Tab _selected={{ color: "green" }}>
                {" "}
                <Link href={`/dashboard/enquiries`} passHref>
                  Enquires
                </Link>
              </Tab>
              <Tab _selected={{ color: "green" }}>
                <Link href={`/dashboard/email`} passHref>
                  Messages
                </Link>
              </Tab>
              <Tab _selected={{ color: "green" }}>
                <Link href={`/dashboard/add`} passHref>
                  New acommodation
                </Link>{" "}
              </Tab>
            </TabList>
          </Tabs> */}
  
          <Box
            maxW="7xl"
            mx="auto"
            px={{ base: "4", md: "8", lg: "12" }}
            py={{ base: "6", md: "8", lg: "12" }}
          >
            {enquiries.length === 0 && <h3>No enquires</h3>}
            {enquiries.data.map((enq) => (
              <Box key={enq.id}>
                <Heading>From: {enq.attributes.email}</Heading>
                <Text>{enq.attributes.first_name}{" "}{enq.attributes.last_name}</Text>
                <Text></Text>
                From: {" "}{new Date(enq.attributes.arrive).toLocaleDateString("no")}{" "}
                To: {" "}{new Date(enq.attributes.leave).toLocaleDateString("no")} 
                  {/* {enq.attributes.time} */}
              </Box>
            ))}
          </Box>
        </Stack>
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
    const accomRes = await fetch(`${API_URL}/api/enquieries?${query}`);
    const enquiries = await accomRes.json();
    console.log(enquiries);
    return {
      props: { enquiries: enquiries },
      revalidate: 1,
    };
  }
  
  export default RecievedEnquiries;
  