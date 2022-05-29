import { useRouter } from "next/router";
import { API_URL } from "lib/index";
// import AdminPanel from "@/components/AdminPanel";
import { useFetchUser } from "@/context/authContext";
import Layout from "@/components/layout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import React, { useState } from "react";
import {
  Flex,
  Heading,
  Avatar,
  AvatarGroup,
  Text,
  Icon,
  IconButton,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Divider,
  Link,
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Tooltip,
  Center,
} from "@chakra-ui/react";
import { FiTrash } from "react-icons/fi";

import DashboardNav from "@/components/dashboard/DashboardNav";
import PageHead from "@/components/layout/PageHead";

const RecievedEmails = ({ emails }) => {
  const router = useRouter();
  const { user } = useFetchUser();

  const deleteEmail = async (e) => {
    if (confirm("Are you sure you want to delete this email?")) {
      const res = await fetch(`${API_URL}/api/contacts/${emails.id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error("Could not delete this item");
      } else {
        toast.success("Email was deleted successfully");
      }
    }
  };
  const DeleteButton = (
    <>
      <FiTrash color="red" onClick={deleteEmail} />
    </>
  );

  return (
    <>
      <Layout user={user}>
        <ToastContainer />
        <PageHead title="Email Inbox" />
        <Flex flexDir={["column", "column", "row"]}>
          <Flex
            w={["100%", "100%", "20%", "15%", "15%"]}
            flexDir="column"
            alignItems="center"
            backgroundColor="brand.accent"
            color="body.light"
          >
            <DashboardNav />
          </Flex>
          <Flex
            w={["100%", "100%", "80%", "80%", "80%"]}
            p="3%"
            flexDir="column"
            overflow="auto"
          >
            <Heading fontWeight="normal" mb={4} letterSpacing="tight">
              Welcome back,{" "}
              <Flex display="inline-flex" fontWeight="bold">
                {user}
              </Flex>
            </Heading>
            <Flex justifyContent="space-between" mt={8}>
              <Flex align="flex-end">
                <Heading as="h2" size="lg" letterSpacing="tight">
                  Inbox
                </Heading>
                {/* <Text fontSize="small" color="gray" ml={4}>Apr 2021</Text> */}
              </Flex>
            </Flex>
            <Flex flexDirection="column">
              <Flex overflow="auto">
                <Table variant="unstyled" mt={4}>
                  <Thead>
                    <Tr color="brand.text">
                      <Th>Name</Th>
                      <Th>E-mail</Th>
                      <Th>Message</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {emails.length === 0 && <h3>No emails</h3>}
                    {emails.data.map((mail) => (
                      <Tr key={mail.id}>
                        <Td>
                          <Flex align="center">
                            <Flex flexDirection="column">
                              <Heading size="sm" letterSpacing="tight">
                                {mail.attributes.name}
                              </Heading>
                              {/* <Text fontSize="sm" color="gray">{mail.attributes.message}</Text> */}
                            </Flex>
                          </Flex>
                        </Td>
                        <Td>{mail.attributes.email}</Td>
                        <Td>{mail.attributes.message}</Td>
                        <Td> {DeleteButton} </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
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
