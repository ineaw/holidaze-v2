import { useEffect, useState } from "react";
import { NextComponentType } from "next";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { Box, chakra, Flex, Stack, Button, IconButton, Text, CloseButton, Container, useDisclosure, VStack, HStack, useBreakpointValue, useColorModeValue } from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";
import { useViewportScroll } from "framer-motion";

import CustomLink from "../layout/Link";

const Navbar: NextComponentType = () => {
  const { data: session, status } = useSession();
  const bgColor = { light: "white", dark: "gray.800" };
  const color = { light: "gray.800", dark: "gray.100" };
  const [y, setY] = useState(0);

  const mobileNav = useDisclosure();

  const { scrollY } = useViewportScroll();
  useEffect(() => {
    return scrollY.onChange(() => setY(scrollY.get()));
  }, [scrollY]);

  const linksForAllUsers = [
    {
      id: "home",
      label: "Home",
      href: "/",
    },
    {
      id: "hotels",
      label: "Hotels",
      href: "/hotels",
    },
    {
      id: "accomodation",
      label: "Accomodation",
      href: "/accomodation",
    },
    {
      id: "contact",
      label: "Contact",
      href: "/contact",
    },
  ];

  const linksForAuthenticatedUsers = [
    {
      id: "myAccount",
      label: "My Account",
      href: "/my-account",
    },
  ];

  const signInButtonNode = () => {
    if (session) {
      return false;
    }

    return (
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
  const isDesktop = useBreakpointValue({ base: false, lg: true });
  const MobileNavContent = (
    <VStack pos="absolute" top={0} left={0} right={0} display={mobileNav.isOpen ? "flex" : "none"} flexDirection="column" p={2} pb={4} bg={"white"} spacing={3} rounded="sm" shadow="sm" zIndex={20}>
      <CloseButton aria-label="Close menu" justifySelf="self-start" onClick={mobileNav.onClose} />
      {linksForAllUsers.map((link) => {
        return (
          <Box key={link.id}>
            <CustomLink href={link.href} ChakraComponent={Text}>
              {link.label}
            </CustomLink>
          </Box>
        );
      })}
      {session &&
        linksForAuthenticatedUsers.map((link) => {
          return (
            <Box key={link.id}>
              <CustomLink href={link.href} ChakraComponent={Text}>
                {link.label}
              </CustomLink>
            </Box>
          );
        })}
    </VStack>
  );

  return (
    <>
      <chakra.header transition="box-shadow 0.2s" borderTop="6px solid" borderTopColor="brand.400" w="full" overflowY="hidden">
        <Flex w="full" h="full" px="6" alignItems="center" justifyContent="space-between">
          <Box as="section" maxW="full">
            <Box as="nav" bg="bg-surface" boxShadow={useColorModeValue("sm", "sm-dark")}>
              <Container py={{ base: "4", lg: "5" }}>
                <HStack spacing="10" justify="space-between">
                  <Stack isInline spacing={4} align="center" justifyContent="space-between" w="full">
                    {isDesktop ? (
                      <Stack isInline spacing={4} align="center" fontWeight="semibold">
                        {linksForAllUsers.map((link) => {
                          return (
                            <Box key={link.id}>
                              <CustomLink href={link.href} ChakraComponent={Text}>
                                {link.label}
                              </CustomLink>
                            </Box>
                          );
                        })}
                        {session &&
                          linksForAuthenticatedUsers.map((link) => {
                            return (
                              <Box key={link.id}>
                                <CustomLink href={link.href} ChakraComponent={Text}>
                                  {link.label}
                                </CustomLink>
                              </Box>
                            );
                          })}
                      </Stack>
                    ) : (
                      <IconButton variant="ghost" icon={<FiMenu fontSize="1.25rem" />} aria-label="Open Menu" onClick={mobileNav.onOpen} />
                    )}
                    <Box>
                      <Stack isInline spacing={4} align="center">
                        {signInButtonNode()}
                        {signOutButtonNode()}
                      </Stack>
                    </Box>
                  </Stack>
                </HStack>
                {MobileNavContent}
              </Container>
            </Box>
          </Box>
        </Flex>
      </chakra.header>
    </>
  );
};

export default Navbar;
