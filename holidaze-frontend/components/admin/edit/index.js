import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

import ImageUpload from "../../../components/Admin/ImageUpload";

import { API_URL } from "../../../config";
import qs from "qs";

export default function EditAccomPage({ accomodation }) {

  const [values, setValues] = useState({
    name: accomodation.data.attributes.name,
  });

  const [imagePreview, setImagePreview] = useState(
    accomodation.data.attributes.image.data
      ? accomodation.data.attributes.image.data.attributes.url
      : null
  );

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const hasEmptyFields = Object.values(values).some(
      (element) => element === ""
    );

    if (hasEmptyFields) {
      ("Please fill in all fields");
    }

    const res = await fetch(`${API_URL}/api/accomodations/${accomodation.data.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({ data: { ...values } }),
    });

    if (!res.ok) {
      ("Something Went Wrong");
    } else {
      const accomodation = await res.json();
      router.push(`/accomodations/${accomodation.data.attributes.slug}`);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const imageUploaded = async () => {
    const query = qs.stringify(
      {
        populate: "image",
      },
      {
        encodeValuesOnly: true,
      }
    );

    const res = await fetch(`${API_URL}/api/accomodations/${accomodation.data.id}?${query}`);
    const data = await res.json();

    setImagePreview(
      data.data.attributes.image.data.attributes.url
    );
    console.log(setImagePreview)
  };

  return (
    <>
      <Link href="/accomodations">Go back</Link>
      <h1>Edit Event</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <div>
            <label htmlFor="name">Event Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={values.name}
              onChange={handleInputChange}
            />
          </div>
        </div> 
        <input type="submit" value="Update event" className="btn" />
      </form>
      {imagePreview ? (
        <>
          <h2>Event Image</h2>
          <Image
            src={imagePreview}
            alt="event-image"
            height={100}
            width={170}
          />
        </>
      ) : (
        <h2>No image uploaded</h2>
      )}
      <div>
        {/* <button onClick={() => setShowModal(true)}>
      Set Image
        </button> */}
      </div>

      {/* <Modal show={showModal} onClose={() => setShowModal(false)}> */}
        <ImageUpload accomId={accomodation.data.id} imageUploaded={imageUploaded} />
      {/* </Modal> */}
    </>
  );
}

export async function getServerSideProps({ params: { id } }) {
  const query = qs.stringify(
    {
      populate: "image",
    },
    {
      encodeValuesOnly: true,
    }
  );
  const res = await fetch(`${API_URL}/api/accomodations/${id}?${query}`);
  const accomodation = await res.json();

  return {
    props: { accomodation },
  };
}