import Nextlink from "next/link";
import { Link } from "@chakra-ui/react";

const CustomLink = ({ ChakraComponent, href, children, ...props }) => {
  return (
    <Nextlink href={href} passHref>
      <Link>
        <ChakraComponent {...props}>{children}</ChakraComponent>
      </Link>
    </Nextlink>
  );
};

export default CustomLink;
