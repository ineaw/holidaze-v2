import Link from "next/link";
import Image from "next/image";
import { API_URL } from "../../config";
import { useRouter } from "next/router";
// import CategoryNav from "../../components/Layout/CategoryNav";
import AccomodationDetail from "../../components/Accomodations/AccomodationDetail";
// import { fetcher } from '../../lib/api';
// import {
//   getTokenFromLocalCookie,
//   getTokenFromServerCookie,
//   getUserFromLocalCookie,
// } from '../../lib/auth';
// import { useFetchUser } from '../../lib/authContext';
import Layout from "../../components/layout/Layout";
import { Button } from "@chakra-ui/button";
import { HiOutlineTrash } from "react-icons/hi";

export default function AccomodationPage({ accom, categories, jwt, error }) {
  // const { data: session, status } = useSession();
//   const { user, loading } = useFetchUser();

  const router = useRouter();

  const deleteEvent = async (e) => {
    if (confirm("Are you sure ?")) {
      const res = await fetch(`${API_URL}/api/accomodations/${accom.id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        data.message;
      } else {
        router.push("/accomodations");
      }
    }
  };

  const EditButtons = () => {
    if (!user) {
      return false;
    }
    return (
      <div>
        <div>
          <Link href={`/accomodations/edit/${accom.id}`}>
            <a>Edit</a>
          </Link>
          <Button onClick={deleteEvent}>
            Delete
          </Button>
        </div>
      </div>
    );
  };

  return (
    <>
    <Layout user={user}>
      {/* <CategoryNav categories={categories} /> */}
      {EditButtons()}
      <Link href="/accomodations">
        <a>Go Back</a>
      </Link>
      <AccomodationDetail accom={accom} />
      </Layout>
    </>
  );
}

export async function getStaticPaths() {
  const res = await fetch(`${API_URL}/api/accomodations`);
  const accomodations = await res.json();
  const paths = accomodations.data.map((accom) => ({
    params: { slug: accom.attributes.slug },
  }));

  return { paths, fallback: true };
}

export async function getStaticProps({ params: { slug } }) {
  const qs = require("qs");
  const query = qs.stringify(
    {
      filters: {
        slug: {
          $eq: slug,
        },
      },
      populate: ["image", "category"],
    },
    {
      encodeValuesOnly: true,
    }
  );
  const response = await fetch(`${API_URL}/api/accomodations?${query}`);
  const accomodations = await response.json();
  const categoriesRes = await fetch(`${API_URL}/api/categories?${query}`);
  const categories = await categoriesRes.json();

  return {
    props: {
      accom: accomodations.data[0],
      categories: categories.data,
    },
    revalidate: 1,
  };
}
