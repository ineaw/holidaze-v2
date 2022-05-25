import Link from "next/link";
import { AspectRatio, Box, Image, Skeleton, Stack, useBreakpointValue, Badge, LinkOverlay, LinkBox } from "@chakra-ui/react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

export default function AccomodationCard({ accom }) {
  const categoryColor = () => {
    if (accom.category.data ? accom.category.data.attributes.name : "" === "cabins") {
      return "green";
    }

    if (accom.category.data ? accom.category.data.attributes.name : "" === "bnb") {
      return "orange";
    }

    return "blue";
  };

  const stars = [1, 2, 3, 4, 5];

  return (
    <>
      <Stack spacing={useBreakpointValue({ base: "4", md: "5" })}> 
      <LinkBox as="article" position="relative">
        <Box position="relative">
          <AspectRatio ratio={4 / 3}>
            <Image src={accom.image.data ? accom.image.data.attributes.url : "/images/default.jpg"} width={170} height={100} alt={accom.name} borderRadius={useBreakpointValue({ base: "md", md: "xl" })} fallback={<Skeleton />} draggable="false" />
          </AspectRatio>
        </Box>
        <Box p="2">
          <Box display="flex" mt="2" alignItems="left">
            <Badge colorScheme={categoryColor()}>{ accom.category.data ? accom.category.data.attributes.name : "" }</Badge>
            {stars.map((star) => (accom.rating >= star ? <AiFillStar key={star} color="rgb(221, 227, 146)" /> : <AiOutlineStar key={star} />))}
          </Box>
          <Box mt="1" fontWeight="semibold" lineHeight="tight" noOfLines={1}>
            <Link href={`/accomodations/${accom.slug}`}>{accom.name}</Link>
          </Box>
          {accom.price}
          <Box color="gray.600" fontSize="sm">
            / night
          </Box>
          <Link href={`/accomodations/${accom.slug}`}>View details</Link>
        </Box>
      </LinkBox>
      </Stack>
    </>
  );
}
