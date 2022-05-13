import { Alert, AlertIcon, AlertTitle, Box, Button, CloseButton, FormControl, FormLabel, Grid, Heading, Input, Stack, useColorMode } from "@chakra-ui/react";
import { FormEvent, useState } from "react";

const MyAccountPageComponent = () => {
  const { colorMode } = useColorMode();
  const bgColor = { light: "white", dark: "gray.800" };
  const color = { light: "gray.800", dark: "gray.100" };
  const [username, setUsername] = useState("");

  const handleSubmit = (e) => {
    return (
      <Alert status="error">
        <AlertIcon />
        <AlertTitle>hello</AlertTitle>
        <CloseButton position="absolute" right="8px" top="8px" />
      </Alert>
    );
  };

  return (
    <>
      <Stack spacing={4}>
        <Grid templateColumns="repeat(1, 1fr)" gap={4}>
          <Box p={4} bg={bgColor[colorMode]} color={color[colorMode]} shadow="sm" rounded="lg">
            <Stack spacing={4}>
              <FormControl isRequired>
                <FormLabel htmlFor="username">Username</FormLabel>
                <Input type="text" id="username" value={username} onChange={(e: FormEvent<HTMLInputElement>) => setUsername(e.currentTarget.value)} isDisabled={false} />
              </FormControl>
              <FormControl>
                <Button loadingText="Saving..." onClick={handleSubmit} isLoading={false}>
                  Save
                </Button>
              </FormControl>
            </Stack>
          </Box>
        </Grid>
      </Stack>
    </>
  );
};

export default MyAccountPageComponent;
