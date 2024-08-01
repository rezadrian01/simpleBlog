import { useState } from "react";
import { useDispatch } from "react-redux";

import { createPost } from "../store/post-slice";
import { uiActions } from "../store/ui-slice";
export default function NewPost() {
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [data, setData] = useState({
    title: "",
    content: "",
    error: false,
    isLoading: false,
  });
  function handleInputChange(identifier, value) {
    setData((prevValue) => ({
      ...prevValue,
      [identifier]: value,
    }));
  }
  function handleCreatePost() {
    if (!localStorage.getItem("token")) {
      return;
    }
    const result = dispatch(
      createPost({ title: data.title, content: data.content })
    );
    if (result) {
      dispatch(uiActions.resetMenu());
    }
  }
  //error handling
  return (
    <section className="w-5/6 sm:w-3/4 md:w-1/2 h-[70vh] bg-slate-900 p-4 rounded-lg shadow-lg mx-auto flex flex-col justify-between">
      <div className="flex flex-col gap-4">
        {/* {error && <p>{data.error}</p>} */}
        <div className=" border-b-2 border-b-slate-600 mb-4">
          <h3 className="text-2xl font-semibold mb-2 ">Create Post</h3>
        </div>
        <div>
          <label htmlFor="title" className="font-semibold">
            Title
          </label>
          <input
            onChange={({ target }) => handleInputChange("title", target.value)}
            value={data.title}
            id="title"
            className="bg-slate-700 focus:outline-none px-3 py-1 rounded w-full mt-4"
            type="text"
          />
        </div>
        <div>
          <label htmlFor="content" className="font-semibold">
            Content
          </label>
          <textarea
            onChange={({ target }) =>
              handleInputChange("content", target.value)
            }
            value={data.content}
            id="content"
            className="bg-slate-700 focus:outline-none px-3 py-1 rounded w-full h-[20vh] mt-4"
            type="text"
          />
        </div>
      </div>
      <div className="flex gap-4 flex-row-reverse bottom-28 right-14">
        <button
          onClick={handleCreatePost}
          className="bg-slate-800 px-4 py-2 rounded hover:bg-slate-700"
        >
          Post
        </button>
        <button onClick={() => dispatch(uiActions.resetMenu())}>Cancel</button>
      </div>
    </section>
  );
}
