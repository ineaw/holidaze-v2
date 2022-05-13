import { ChakraProvider } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";

import theme from "../theme";
import Layout from "../components/layout";

import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  const { session } = pageProps;
  return (
    <SessionProvider session={session}>
      <ChakraProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </SessionProvider>
  );
}

export default MyApp;
