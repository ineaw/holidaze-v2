import axios from "axios";

const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;

export async function signIn({ email, password }) {
  const res = await axios.post(`${strapiUrl}api/auth/local`, {
    identifier: email,
    password,
  });
  return res.data;
}
