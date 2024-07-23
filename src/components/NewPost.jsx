import { useEffect, useState } from "react";
import { createPost } from "../http";

export default function NewPost({ onCancel, afterSubmit }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState(false);
  const [data, setData] = useState({
    title: "",
    content: "",
    error: false,
    isLoading: false,
  });
  function handleChangeTitle(event) {
    setData((prevData) => {
      return {
        ...prevData,
        title: event.target.value,
      };
    });
  }
  function handleChangeContent(event) {
    setData((prevData) => {
      return {
        ...prevData,
        content: event.target.value,
      };
    });
  }
  async function sendingReq() {
    try {
      if (!localStorage.getItem("token")) {
        throw new Error("Token not found!");
      }
      const { title, content } = data;
      const resData = await createPost({ title, content });
      //   console.log(resData);
      afterSubmit();
    } catch (err) {
      setData((prevData) => {
        return {
          ...prevData,
          error: err.message || "Failed to create post.",
        };
      });
    }
  }
  function handlePost() {
    sendingReq();
  }
  //error handling
  return (
    <section className="w-5/6 sm:w-3/4 md:w-1/2 bg-slate-900 p-4 rounded-lg shadow-lg mx-auto flex flex-col gap-4">
      {/* {error && <p>{data.error}</p>} */}
      <div>
        <h3 className="text-2xl font-semibold mb-2">Create Post</h3>
      </div>
      <div>
        <label htmlFor="title" className="font-semibold">
          Title
        </label>
        <input
          onChange={handleChangeTitle}
          value={data.title}
          id="title"
          className="bg-slate-700 focus:outline-none px-3 py-1 rounded w-full"
          type="text"
        />
      </div>
      <div>
        <label htmlFor="content" className="font-semibold">
          Content
        </label>
        <textarea
          onChange={handleChangeContent}
          value={data.content}
          id="content"
          className="bg-slate-700 focus:outline-none px-3 py-1 rounded w-full"
          type="text"
        />
      </div>
      <div className="flex gap-4 flex-row-reverse">
        <button
          onClick={handlePost}
          className="bg-slate-800 px-4 py-2 rounded hover:bg-slate-700"
        >
          Post
        </button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </section>
  );
}
