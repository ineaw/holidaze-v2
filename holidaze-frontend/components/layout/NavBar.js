import {
  Box,
  Avatar,
  Menu,
  Flex,
  MenuButton,
  MenuList,
  MenuDivider,
  Button,
  IconButton,
  CloseButton,
  Heading,
  Image,
  Center,
  HStack,
  useBreakpointValue,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
  Link,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { CustomLink, CustomNavLink } from "./CustomLinks";
import NextLink from "next/link";
import { setToken, unsetToken } from "../../lib/auth";
import { useUser } from "../../context/authContext";
import { FiLogOut } from "react-icons/fi";

const NavBar = () => {
  const { user, loading } = useUser();
  const mobileNav = useDisclosure();
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
      id: "contact",
      label: "Contact",
      href: "/contact",
    },
  ];

  const linksForAuthenticatedUsers = [
    // {
    //   id: "dashboard",
    //   label: "Dashboard",
    //   href: "/dashboard",
    // },
  ];


  const logout = () => {
    unsetToken();
  };

  const signOutButton = () => {
    if (!loading && !user) {
      return false;
    }
    return (
      <>
        {!loading &&
          (user ? (
            <Button
              my={2}
              size="sm"
              color={"body.light"}
              bg={"brand.dark"}
              _hover={{
                bg: "brand.darkhover",
              }}
              onClick={logout}
            >
              Logout
            </Button>
          ) : (
            ""
          ))}
      </>
    );
  };

  const userHeading = (
    <>
      <Heading
        as="h5"
        fontSize="md"
        fontWeight="normal"
        mb={4}
        letterSpacing="tight"
        textAlign={"center"}
      >
        You are logged in as{" "}
        <Flex display="column" fontWeight="bold">
          {user}
        </Flex>
      </Heading>
    </>
  );

  const isDesktop = useBreakpointValue({ base: false, md: true, lg: true });
  const MobileNavContent = (
    <>
      <Drawer
        placement="right"
        onClose={mobileNav.onClose}
        isOpen={mobileNav.isOpen}
        size="sm"
      >
        <DrawerOverlay />
        <DrawerContent bg="body.light">
          <DrawerBody>
            <CloseButton
              aria-label="Close menu"
              justifySelf="self-start"
              onClick={mobileNav.onClose}
              size="lg"
            />
            <Flex
              h="full"
              flexDirection="column"
              alignItems="center"
              mx="8"
              my="16"
              justifyContent="flex-start"
            >
              {linksForAllUsers.map((link) => {
                return (
                  <Box key={link.id}>
                    <CustomNavLink
                      fontSize="2xl"
                      href={link.href}
                      variant="ghost"
                      my={2}
                    >
                      <Link> {link.label} </Link>
                    </CustomNavLink>
                  </Box>
                );
              })}
            </Flex>
            {user &&
              linksForAuthenticatedUsers.map((link) => {
                return (
                  <Box key={link.id}>
                    <CustomNavLink href={link.href} variant="ghost" my={2}>
                      <Link> {link.label} </Link>
                    </CustomNavLink>
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
                  <NextLink href="/" passHref>
                    <Link>
                    <Image
                      src="/images/logo.png"
                      height={"40px"}
                      width={"full"}
                    />{" "}
                    </Link>
                  </NextLink>
                </Box>
                <HStack
                  as={"nav"}
                  spacing={4}
                  display={{ base: "none", md: "flex" }}
                >
                  {linksForAllUsers.map((link) => {
                    return (
                      <Box key={link.id}>
                        <CustomNavLink href={link.href}>
                          <Link> {link.label} </Link>
                        </CustomNavLink>
                      </Box>
                    );
                  })}
                  {user &&
                    linksForAuthenticatedUsers.map(
                      (link) => {
                        return (
                          <Box key={link.id}>
                            <CustomNavLink href={link.href}>
                              <Link> {link.label} </Link>
                            </CustomNavLink>
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
                            <Avatar name={user} size="sm" bg="brand.text" />{" "}
                          </MenuButton>
                        </Menu>
                      </Flex>
                    )}
                </HStack>
              </HStack>
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
                      <Avatar name={user} size="sm" bg="brand.dull" />{" "}
                    </MenuButton>
                    <MenuList textAlign={"flex-start"} zIndex="5" px={6} py={8}>
                      {userHeading}
                      <MenuDivider />
                      <Box my={2}>
                        <CustomLink href="/dashboard">Dashboard</CustomLink>{" "}
                      </Box>
                      <Box my={2}>
                        <CustomLink href="/dashboard/enquiries" my={6}>
                          Enquiries
                        </CustomLink>{" "}
                      </Box>
                      <Box my={2}>
                        <CustomLink href="/dashboard/email" my={4}>
                          Emails
                        </CustomLink>{" "}
                      </Box>
                      <Box my={2}>
                        <CustomLink href="/dashboard/create" my={4}>
                          Manage listing
                        </CustomLink>{" "}
                      </Box>
                      <MenuDivider />
                      <Center>{signOutButton()}</Center>
                    </MenuList>
                  </Menu>
                ) : (
                  <>
                    <NextLink href="/dashboard/login">
                      <Link
                        w="70px"
                        display="inline-flex"
                        alignItems="center"
                        justifyContent="center"
                        px={2}
                        py={1.5}
                        border="solid transparent"
                        fontWeight="bold"
                        fontSize={"sm"}
                        rounded="md"
                        color={"body.light"}
                        bg={"brand.dark"}
                        _hover={{
                          bg: "brand.darkhover",
                        }}
                      >
                        Login
                      </Link>
                    </NextLink>
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
              <NextLink href="/" passHref>
                    <Link>
                    <Image
                      src="/images/logo.png"
                      height={"40px"}
                      width={"full"}
                    />{" "}
                    </Link>
                  </NextLink>
              </Box>

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
                      <Avatar name={user} bg={"brand.dull"} size="sm" />
                    </MenuButton>
                    <MenuList textAlign={"flex-start"} zIndex="5" px={6} py={8}>
                      {userHeading}
                      <MenuDivider />
                      <Box my={2}>
                        <CustomLink href="/dashboard" passhref>
                          Dashboard
                        </CustomLink>{" "}
                      </Box>
                      <Box my={2}>
                        <CustomLink href="/dashboard/enquiries" my={6} passhref>
                          <Link>Enquiries</Link>
                        </CustomLink>{" "}
                      </Box>
                      <Box my={2}>
                        <CustomLink href="/dashboard/email" my={4} passhref>
                          <Link>Emails</Link>
                        </CustomLink>{" "}
                      </Box>
                      <Box my={2}>
                        <CustomLink href="/dashboard/create" my={4} passhref>
                          <Link>Manage listing</Link>
                        </CustomLink>{" "}
                      </Box>
                      <MenuDivider />
                      <Center>{signOutButton()}</Center>
                    </MenuList>
                  </Menu>
                ) : (
                  <>
                    <NextLink href="/dashboard/login" passhref>
                      <Link
                        w="60px"
                        display="inline-flex"
                        alignItems="center"
                        justifyContent="center"
                        px={2}
                        py={1.5}
                        border="solid transparent"
                        fontWeight="bold"
                        fontSize={"sm"}
                        rounded="md"
                        color={"body.light"}
                        bg={"brand.dark"}
                        _hover={{
                          bg: "brand.darkhover",
                        }}
                      >
                        Login
                      </Link>
                    </NextLink>
                  </>
                ))}
            </>
          )}
        </Flex>
      </Box>
      {MobileNavContent}
    </>
  );
};

export default NavBar;
