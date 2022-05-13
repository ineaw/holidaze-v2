import { getSession, useSession, signIn, signOut } from "next-auth/react";
import { Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";

// // Get Token
// const { data: token, status } = useSession()
// console.log(token)

// // Get Token
// const { data: session, status } = useSession()
// console.log(session)

const RecievedEnquiries = ({ hotel }) => {
  return <Heading>Inbox</Heading>;
};

export default RecievedEnquiries;
