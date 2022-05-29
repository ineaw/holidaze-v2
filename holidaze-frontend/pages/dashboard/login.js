import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from "next/router";
import { fetcher } from "../../lib/api";
import { setToken } from "../../lib/auth";
import { API_URL } from "../../lib";
import { useFetchUser } from "../../context/authContext";
import Layout from "../../components/layout/index";
import { SuccessAlert } from "@/components/layout/Alerts";
import PageHead from "@/components/layout/PageHead";

export default function Login({}) {
  const [data, setData] = useState({
    identifier: "",
    password: "",
  });

  const { user } = useFetchUser();
  const { push } = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const responseData = await fetcher(`${API_URL}/api/auth/local`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        identifier: data.identifier,
        password: data.password,
      }),
    });
    setToken(responseData);
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  if (user) {
    setTimeout(() => {
      push("/");
    }, 3000);

    return (
      <>
        <SuccessAlert />
      </>
    );
  }

  if (!user) {
    return (
      <>
        <Layout user={user}>
        <PageHead title="Log in" />
          <Flex minH={"100vh"} align={"center"} justify={"center"}>
            <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
              <Stack align={"center"}>
                <Heading fontSize={"4xl"}>Sign in</Heading>
                <Text fontSize={"lg"} color={"gray.600"}>
                  to access your account
                </Text>
              </Stack>
              <Box rounded={"lg"} boxShadow={"lg"} p={8}>
                <Stack spacing={4}>
                  <FormControl id="email">
                    <FormLabel>Email address</FormLabel>
                    <Input
                      type="text"
                      name="identifier"
                      onChange={handleChange}
                      placeholder="Username"
                      bg="#fff"
                      borderColor="brand.text"
                      border="2px"
                      required
                    />
                  </FormControl>
                  <FormControl id="password">
                    <FormLabel>Password</FormLabel>
                    <Input
                      type="password"
                      name="password"
                      onChange={handleChange}
                      placeholder="Password"
                      bg="#fff"
                      borderColor="brand.text"
                      border="2px"
                      required
                    />
                  </FormControl>
                  <Stack spacing={10}>
                    <Stack
                      direction={{ base: "column", sm: "row" }}
                      align={"start"}
                      justify={"space-between"}
                    >
                      <Checkbox>Remember me</Checkbox>
                    </Stack>
                    <Button
                      variant="solid"
                      bg="brand.dark"
                      color="body.light"
                      _hover={{
                        bg: "brand.darkhover",
                      }}
                      onClick={handleSubmit}
                    >
                      Sign in
                    </Button>
                  </Stack>
                </Stack>
              </Box>
            </Stack>
          </Flex>
        </Layout>
      </>
    );
  }
}
