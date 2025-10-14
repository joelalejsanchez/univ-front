import { BrowserRouter, Routes, Route } from "react-router-dom";
import BookGrid from "./pages/BookGrid";
import BookDetails from "./pages/BookDetails";
import BookCreate from "./pages/BookCreate";
import BookUpdate from "./pages/BookUpdate";
import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BookGrid />} />
        <Route path="/details/:id" element={<BookDetails />} />
        <Route path="/create" element={<BookCreate />} />
        <Route path="/update/:id" element={<BookUpdate />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
