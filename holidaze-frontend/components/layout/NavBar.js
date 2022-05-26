import {
  Box,
  Avatar,
  Menu,
  Flex,
  MenuButton,
  MenuItem,
  MenuList,
  MenuDivider,
  Stack,
  Button,
  IconButton,
  Text,
  CloseButton,
  Container,
  VStack,
  Center,
  HStack,
  useBreakpointValue,
  useColorModeValue,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

import { CustomLink } from "./CustomLinks";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";

import { setToken, unsetToken } from "../../lib/auth";
import { useUser } from "../../context/authContext";
import { API_URL } from "../../config";

const NavBar = () => {
  const [data, setData] = useState({
    identifier: "",
    password: "",
  });

  const { user, loading } = useUser();
  const mobileNav = useDisclosure();
  const router = useRouter();
  const linksForAllUsers = [
    {
      id: "home",
      label: "Home",
      href: "/",
    },

    {
      id: "accomodation",
      label: "Accomodations",
      href: "/accomodations",
    },
    {
      id: "contac",
      label: "Contact",
      href: "/contact",
    },
  ];

  const linksForAuthenticatedUsers = [
    {
      id: "dashboard",
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      id: "profile",
      label: "Profile",
      href: "/profile",
    },
  ];

  const logout = () => {
    unsetToken();
  };

  const signOutButton = () => {
    // if (!loading && !user) {
    //   return false;
    // }
    return (
      <>
        {!loading &&
          (user ? (
            <Button>
              <a onClick={logout}>Logout</a>
            </Button>
          ) : (
            ""
          ))}{" "}
      </>
    );
  };

  const isDesktop = useBreakpointValue({ base: false, md: true, lg: true });
  const MobileNavContent = (
    <>
      <Drawer
        placement="left"
        onClose={mobileNav.onClose}
        isOpen={mobileNav.isOpen}
        size="sm"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerBody>
            <CloseButton
              aria-label="Close menu"
              justifySelf="self-start"
              onClick={mobileNav.onClose}
            />
            {linksForAllUsers.map((link) => {
              return (
                <Box key={link.id}>
                  <CustomLink href={link.href} variant="ghost" my={2}>
                    {link.label}
                  </CustomLink>
                </Box>
              );
            })}
            {user &&
              linksForAuthenticatedUsers.map((link) => {
                return (
                  <Box key={link.id}>
                    <CustomLink href={link.href} variant="ghost" my={2}>
                      {link.label}
                    </CustomLink>
                  </Box>
                );
              })}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );

  return (
    <>
      <Box px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          {isDesktop ? (
            <>
              <HStack spacing={8} alignItems={"center"}>
                <Box>
                  <Link href="/" passHref>
                    <a>Logo</a>
                  </Link>
                </Box>
                <HStack
                  as={"nav"}
                  spacing={4}
                  display={{ base: "none", md: "flex" }}
                >
                  {linksForAllUsers.map((link) => {
                    return (
                      <Box key={link.id}>
                        <CustomLink href={link.href}>{link.label}</CustomLink>
                      </Box>
                    );
                  })}
                  {user &&
                    linksForAuthenticatedUsers.map(
                      (link) => {
                        return (
                          <Box key={link.id}>
                            <CustomLink href={link.href}>
                              {link.label}
                            </CustomLink>
                          </Box>
                        );
                      },
                      <Flex alignItems={"center"}>
                        <Menu>
                          <MenuButton
                            as={Button}
                            rounded={"full"}
                            variant={"link"}
                            cursor={"pointer"}
                            minW={0}
                          >
                            <Avatar name={user} src="https:/" size="sm" />{" "}
                          </MenuButton>
                          <MenuList alignItems={"center"}>
                            <br />
                            <Center>
                              <Avatar name={user} src="https://" size="lg" />{" "}
                            </Center>
                            <br />
                            <Center>Hi {user}</Center>
                            <br />
                            <MenuDivider />
                            <MenuItem>
                              <Link href={"/dashboard"}>My Account</Link>{" "}
                            </MenuItem>
                            {signOutButton()}
                          </MenuList>
                        </Menu>
                      </Flex>
                    )}
                </HStack>
              </HStack>
              {!loading &&
                (user ? (
                  <Flex alignItems={"center"}>
                    <Menu>
                      <MenuButton
                        as={Button}
                        rounded={"full"}
                        variant={"link"}
                        cursor={"pointer"}
                        minW={0}
                      >
                        <Avatar name={user} src="https:/" size="sm" />{" "}
                      </MenuButton>
                      <MenuList alignItems={"center"}>
                        <br />
                        <Center>
                          <Avatar name={user} src="https://" size="lg" />{" "}
                        </Center>
                        <br />
                        <Center>Hi {user}</Center>
                        <br />
                        <MenuDivider />
                        <Link href={"/my-account"}>My Account</Link>{" "}
                        <Center>
                          <Box p={2}>{signOutButton()}</Box>
                        </Center>
                      </MenuList>
                    </Menu>
                  </Flex>
                ) : (
                  <>
                    <Box>
                      <Link href="/login">
                        <a>Login</a>
                      </Link>
                    </Box>
                  </>
                ))}
            </>
          ) : (
            <>
              <IconButton
                variant="ghost"
                icon={<HamburgerIcon fontSize="1.25rem" />}
                aria-label="Open Menu"
                onClick={mobileNav.onOpen}
              />
              <Box>
                <Link href={"/"}>Logo</Link>
              </Box>
              <Flex alignItems={"center"}>
                {!loading &&
                  (user ? (
                    <Menu>
                      <MenuButton
                        as={Button}
                        rounded={"full"}
                        variant={"link"}
                        cursor={"pointer"}
                        minW={0}
                      >
                        <Avatar name={user} src="https://" size="sm" />
                      </MenuButton>
                      <MenuList alignItems={"center"}>
                        <br />
                        <Center>
                          <Avatar name={user} src="https://" size="lg" />{" "}
                        </Center>
                        <br />
                        <Center>
                          <p>{user}</p>
                        </Center>
                        <br />
                        <MenuDivider />
                        <Link href={"/my-account"}>My Account</Link>
                        <Center>
                          <Box p={2}>{signOutButton()}</Box>
                        </Center>
                      </MenuList>
                    </Menu>
                  ) : (
                    <>
                      <Box>
                        <Link href="/login">
                          <a>Login</a>
                        </Link>
                      </Box>
                    </>
                  ))}
              </Flex>
            </>
          )}
        </Flex>
      </Box>
      {MobileNavContent}
    </>
  );
};

export default NavBar;
