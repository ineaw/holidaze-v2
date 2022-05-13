import { getSession, useSession, signIn, signOut } from "next-auth/react";

import { useRouter } from "next/router";
import { useState } from "react";

// // Get Token
// const { data: token, status } = useSession()
// console.log(token)

// // Get Token
// const { data: session, status } = useSession()
// console.log(session)

const SendEnquiery = ({ jwt, hotel }) => {
  const router = useRouter();
  const [enquiries, setEnquiery] = useState({
    value: "",
  });

  const HandleChange = (e) => {
    setEnquiery({ value: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventdefault();
    try {
      await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/enquiries`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            enquiry: enquiries.value,
            // hotel: hotel.id
          },
        }),
      });
      router.reload();
    } catch (error) {
      console.log("error in request", error);
    }
  };
  if (Error) {
    return (
      <>
        <p>Error</p>
      </>
    );
  } else {
    return {};
  }
};

// export async function getServerSideProps({ req }) {
//   // const jwt =
//   //   typeof window !== 'undefined'
//   //     ? getTokenFromLocalCookie
//   //     : getTokenFromServerCookie(req);
//   const enqResponse = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/hotels`);
//   if (enqResponse.data) {
//     return {
//       props: {
//         hotel: enqResponse.data,
//         jwt: jwt ? jwt : "",
//       },
//     };
//   } else {
//     return {
//       props: {
//         error: enqResponse.error.message,
//       },
//     };
//   }
// }

export default SendEnquiery;
