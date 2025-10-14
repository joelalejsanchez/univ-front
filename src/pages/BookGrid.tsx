import { useEffect, useState } from "react";
import type { Book } from "../types";
import { useNavigate } from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_URL;

export default function BookGrid() {
  const [books, setBooks] = useState<Book[]>([]);
  const navigate = useNavigate();

  const fetchBooks = async () => {
    const res = await fetch(`${apiUrl}/books`);
    const data = await res.json();
    console.log(data);
    setBooks(data);
  };

  const deleteBook = async (id: number) => {
    await fetch(`${apiUrl}/books/${id}`, { method: "DELETE" });
    fetchBooks();
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Books</h1>
        <button
          onClick={() => navigate("/create")}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Create New
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {books.map((book) => (
          <div
            key={book.id}
            className="p-4 border rounded shadow flex flex-col"
          >
            <h2 className="font-bold text-lg">{book.title}</h2>
            <p>{book.author}</p>
            <p>{book.publishedYear}</p>
            <div className="mt-auto flex justify-between">
              <button
                className="bg-green-500 text-white px-2 py-1 rounded"
                onClick={() => navigate(`/details/${book.id}`)}
              >
                Details
              </button>
              <button
                className="bg-yellow-500 text-white px-2 py-1 rounded"
                onClick={() => navigate(`/update/${book.id}`)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-2 py-1 rounded"
                onClick={() => deleteBook(book.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
