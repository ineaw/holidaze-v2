import axios from "axios";
import { getStrapiURL } from "../lib/strapiApi";

export async function signIn({ email, password }) {
  const res = await axios.post(`${getStrapiURL}api/auth/local`, {
    identifier: email,
    password,
  });
  return res.data;
}
