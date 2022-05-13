import MyAccountPageComponent from "../../components/MyAccount";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getSession } from "next-auth/react";
import { Button, Text, Stack, Flex, Heading, Wrap, Tab, TabList, TabPanels, TabPanel, Tabs, Box } from "@chakra-ui/react";
import { AiOutlinePlusSquare } from "react-icons/ai";
import Link from "next/link";
import Head from "../../components/layout/Head";
import { signIn, signOut, useSession } from "next-auth/react";
import RecievedEnquiries from "../../components/MyAccount/RecievedEnquiries";

const MyAccountPage: InferGetServerSidePropsType<typeof getServerSideProps> = ({ session, hotel }) => {
  const signInButtonNode = () => {
    if (session) {
      return false;
    }

    return (
      <>
        <Box maxW="7xl" mx="auto" px={{ base: "4", md: "8", lg: "12" }} py={{ base: "6", md: "8", lg: "12" }}>
          <Heading display="inline-block">Unauthorized, Please sign in</Heading>
          <Box>
            <Link href="/api/auth/signin">
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  signIn();
                }}
              >
                Sign In
              </Button>
            </Link>
          </Box>
        </Box>
      </>
    );
  };

  const signOutButtonNode = () => {
    if (!session) {
      return false;
    }

    return (
      <Box>
        <Link href="/api/auth/signout">
          <Button
            onClick={(e) => {
              e.preventDefault();
              signOut();
            }}
          >
            Sign Out
          </Button>
        </Link>
      </Box>
    );
  };

  if (!session) {
    return (
      <>
        <Box>
          <Stack isInline spacing={4} align="center">
            {signInButtonNode()}
            {signOutButtonNode()}
          </Stack>
        </Box>
      </>
    );
  }

  return (
    <>
      <Head title="My account" />
      {/* <MyAccountPageComponent /> */}
      <Box maxW="80vw" mx="auto" px={{ base: "4", md: "8", lg: "12" }} py={{ base: "6", md: "8", lg: "12" }}>
        {session && (
          <Wrap>
            {/* {hotels.map((hotel) => {
              return <HotelCard key={hotel.id} hotel={hotel}/>;
            })} */}
            <Tabs size="md" variant="enclosed">
              <TabList>
                {/* <Tab _selected={{ color: "white", bg: "green.400" }}>Enquires</Tab> */}
                <Tab _selected={{ color: "white", bg: "green.400" }}>Inbox</Tab>
                <Tab _selected={{ color: "white", bg: "green.400" }}>Add Hotel</Tab>
                <Tab _selected={{ color: "white", bg: "green.400" }}>Edit Hotel</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <RecievedEnquiries hotel={hotel} />
                </TabPanel>
                <TabPanel>
                  <Box>
                    <Link href={`/my-account/create-accomodation`} passHref>
                      <Button leftIcon={<AiOutlinePlusSquare />}>Add new acommodation</Button>
                    </Link>
                  </Box>{" "}
                </TabPanel>
                <TabPanel></TabPanel>
              </TabPanels>
            </Tabs>
          </Wrap>
        )}
      </Box>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  return {
    props: {
      session,
    },
  };
};

export default MyAccountPage;
