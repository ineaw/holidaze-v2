import Link from "next/link";
import { CustomLink } from "./CustomLinks";
import { ButtonGroup } from "@chakra-ui/button";
export default function Pagination({ page, pageCount }) {
  return (
    <>
    <ButtonGroup variant="solid" size="sm" spacing={3}>
      {page > 1 && (
        <CustomLink href={`/accomodations?page=${page - 1}`} ChakraComponent={"Button"} >
          Previous page
        </CustomLink>
      )}

      {page < pageCount && (
        <CustomLink href={`/accomodations?page=${page + 1}`} ChakraComponent={"Button"}>
          Next page
        </CustomLink>
      )}
      </ButtonGroup>
    </>
  );
}

