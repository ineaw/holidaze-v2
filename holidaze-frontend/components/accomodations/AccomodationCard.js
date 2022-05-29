import Link from "next/link";
import {
  AspectRatio,
  Box,
  Image,
  Skeleton,
  Stack,
  useBreakpointValue,
  Badge,
  LinkOverlay,
  LinkBox,
} from "@chakra-ui/react";
import { HiStar, HiOutlineStar } from "react-icons/hi";

export default function AccomodationCard({ accom }) {
  const stars = [1, 2, 3, 4, 5];

  return (
    <>
      <Stack
        maxWidth="24rem"
        spacing={useBreakpointValue({ base: "4", md: "5" })}
        bg="#fff"
        p={4}
        borderRadius={useBreakpointValue({ base: "sm", md: "md" })}
      >
        <Box as="article" position="relative">
            <AspectRatio ratio={4 / 3}>
              <Image
                src={
                  accom.image.data
                    ? accom.image.data.attributes.url
                    : "/images/default.jpg"
                }
                width={170}
                height={100}
                alt={accom.name}
                borderRadius={useBreakpointValue({ base: "sm", md: "md" })}
                fallback={<Skeleton />}
                draggable="false"
              />
            </AspectRatio>
          </Box>
          <Box p="2">
            <Box display="flex" mt="2" alignItems="left">
              {/* <Badge>
                {accom.category ? accom.category.data.attributes.name : ""}
              </Badge> */}
              {stars.map((star) =>
                accom.rating >= star ? (
                  <HiStar key={star} color="orange" />
                ) : (
                  <HiOutlineStar key={star} color="orange" />
                )
              )}
            </Box>
            <Box mt="1" fontWeight="semibold" lineHeight="tight" noOfLines={1}>
              <Link href={`/accomodations/${accom.slug}`}>{accom.name}</Link>
            </Box>
            <Box color="brand.text" fontSize="sm">
            {accom.price}  / night
            </Box>
            <Link href={`/accomodations/${accom.slug}`}>View details</Link>
          </Box>
      </Stack>
    </>
  );
}
