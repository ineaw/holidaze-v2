import { AspectRatio, Box, Button, HStack, Image, Link as _Link, Skeleton, Stack, StackProps, Text, useBreakpointValue, useColorModeValue } from "@chakra-ui/react";
import { getStrapiMedia } from "../../lib/strapiMedia";
import CustomLink from "../Link";

export default function AccomodationCard({ place }) {
  const imageUrl = getStrapiMedia(place.attributes.image);

  return (
    <>
      <Stack spacing={useBreakpointValue({ base: "4", md: "5" })}>
        <Box position="relative">
          <AspectRatio ratio={4 / 3}>
            <Image src={imageUrl} alt={place.attributes.title} draggable="false" fallback={<Skeleton />} borderRadius={useBreakpointValue({ base: "md", md: "xl" })} />
          </AspectRatio>
        </Box>
        <Stack>
          <Stack spacing="1">
            <Text fontWeight="medium" color={useColorModeValue("gray.700", "gray.400")}>
              {place.attributes.title}
            </Text>
            {/* <PriceTag price={evt.attributes.price} currency="NOK" /> */}
            <Text fontSize="sm" display={"none"}>
              {place.attributes.description}
            </Text>
          </Stack>
          <HStack>
            <Text fontSize="sm" color={useColorModeValue("gray.600", "gray.400")}>
              {place.attributes.reviews}
            </Text>
          </HStack>
        </Stack>
        <Stack align="center">
          <Box key={place.id}>
            <CustomLink href={`/accomodations/${place.attributes.slug}`} ChakraComponent={Button}>
              Book now
            </CustomLink>
          </Box>
        </Stack>
      </Stack>
      {/* <div>{evt.attributes.image ? <TheImage image={evt.attributes.image}></TheImage> : "no image"}</div>
       */}
    </>
  );
}
