import MyAccountPageComponent from "../../component/MyAccount";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getSession } from "next-auth/react";
import { Button, Container, Flex, Heading, Wrap } from "@chakra-ui/react";
import { AiOutlinePlusSquare } from "react-icons/ai";
import CustomLink from "../../component/Link";
import Head from "../../component/layout/Head";

const MyAccountPage: InferGetServerSidePropsType<typeof getServerSideProps> = ({ session }) => {
  if (!session) {
    return "access denied";
  }

  return (
    <>
      <Head title="My account" />

      {/* <MyAccountPageComponent /> */}
      <Flex>
        {session && (
          <CustomLink href={`/my-account/create-accomodation`} ChakraComponent={Button} passHref>
            <Button leftIcon={<AiOutlinePlusSquare />}>Add a new acommodation</Button>
          </CustomLink>
        )}
        <Wrap>{/* {hotels.map((hotel) => {
              return <HotelCard key={hotel.id} hotel={hotel}/>;
            })} */}</Wrap>
      </Flex>
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
