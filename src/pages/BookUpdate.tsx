import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { Book } from "../types";

const apiUrl = import.meta.env.VITE_API_URL;

export default function BookUpdate() {
  const { id } = useParams<{ id: string }>();
  const [form, setForm] = useState<Omit<Book, "id">>({
    title: "",
    author: "",
    publishedYear: new Date().getFullYear(),
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${apiUrl}/books/${id}`)
      .then((res) => res.json())
      .then((data) =>
        setForm({
          title: data.title,
          author: data.author,
          publishedYear: data.publishedYear,
        })
      );
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch(`${apiUrl}/books/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        publishedYear: Number(form.publishedYear),
      }),
    });
    navigate("/");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 max-w-md mx-auto flex flex-col gap-4"
    >
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
        className="border px-2 py-1 rounded"
        required
      />
      <input
        type="text"
        name="author"
        placeholder="Author"
        value={form.author}
        onChange={handleChange}
        className="border px-2 py-1 rounded"
        required
      />
      <input
        type="number"
        name="publishedYear"
        placeholder="Published Year"
        value={form.publishedYear}
        onChange={handleChange}
        className="border px-2 py-1 rounded"
        required
      />
      <button
        type="submit"
        className="bg-yellow-500 text-white px-4 py-2 rounded"
      >
        Update
      </button>
    </form>
  );
}
