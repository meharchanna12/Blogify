import { useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import DOMPurify from "dompurify"; 
import { BACKEND_URL } from "../config";
import Appbar from "../components/Appbar";

export default function Publish() {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const handleSubmit = async () => {
    if (!title || !content) {
      toast.error("Title and content are required!");
      return;
    }
  
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("User not authenticated!");
      return;
    }
  
    const blogPost = {
      title,
      content: DOMPurify.sanitize(content),
    };
  
    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/v1/blog`,
        blogPost,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (res.status >= 200 && res.status < 300) {
        toast.success("Blog published successfully!");
        setTitle("");
        setContent("");
      } else {
        toast.error("Failed to publish blog.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong.");
    }
  };
  
  return (
    <div>
      <Appbar />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <ToastContainer position="top-right" autoClose={3000} />

        <h1 className="text-2xl font-extrabold mb-4">✍️ Create a New Post</h1>

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Blog title"
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <ReactQuill
          theme="snow"
          value={content}
          onChange={setContent}
          placeholder="Write your blog here..."
          className="bg-white rounded-l mb-4"
        />
        {title && content && (
            <div className="mt-10 border-t pt-6">
              <h2 className="text-xl font-semibold mb-2">📄 Preview:</h2>
              <div className="font-extrabold text-2xl mb-4">
                {title}
              </div>
              <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(content),
                }}
              />
            </div>
          )}


        <button
          onClick={handleSubmit}
          className="mt-6 bg-green-600 text-white px-6 py-2 rounded-3xl hover:bg-green-700"
        >
          Publish
        </button>      
      </div>
    </div>
  );
}
