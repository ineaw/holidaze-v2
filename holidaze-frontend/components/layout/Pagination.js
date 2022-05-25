import Link from "next/link";

export default function Pagination({ page, pageCount }) {
  return (
    <>
      {page > 1 && (
        <Link href={`/accomodations?page=${page - 1}`}>
          <a>Previous</a>
        </Link>
      )}

      {page < pageCount && (
        <Link href={`/accomodations?page=${page + 1}`}>
          <a>Next</a>
        </Link>
      )}
    </>
  );
}

