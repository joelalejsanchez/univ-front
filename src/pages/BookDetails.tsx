import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { Book } from "../types";

const apiUrl = import.meta.env.VITE_API_URL;

export default function BookDetails() {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${apiUrl}/books/${id}`)
      .then((res) => res.json())
      .then(setBook);
  }, [id]);

  if (!book) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{book.title}</h1>
      <p className="mt-2">Author: {book.author}</p>
      <p className="mt-1">Published Year: {book.publishedYear}</p>
      <button
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        onClick={() => navigate("/")}
      >
        Back
      </button>
    </div>
  );
}
