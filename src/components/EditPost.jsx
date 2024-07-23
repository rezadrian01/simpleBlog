import { useState, useEffect } from "react";
import { fetchPost, updatePost } from "../http";

export default function EditPost({ postId, onCancel, onAfterEdit }) {
  const [data, setData] = useState({
    post: {},
    isFetching: false,
    error: false,
    titleInput: "",
    contentInput: "",
  });
  function handleChangeTitle(event) {
    setData((prevData) => {
      return {
        ...prevData,
        titleInput: event.target.value,
      };
    });
  }
  function handleChangeContent(event) {
    setData((prevData) => {
      return {
        ...prevData,
        contentInput: event.target.value,
      };
    });
  }
  async function handleSubmitEdit() {
    try {
      const title = data.titleInput;
      const content = data.contentInput;
      const resData = await updatePost(postId, { title, content });
      console.log(resData);
      //back to mypost
      onAfterEdit();
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    async function fetchingPost() {
      setData((prevData) => {
        return {
          ...prevData,
          isFetching: true,
        };
      });
      try {
        const post = await fetchPost(postId);
        // console.log({ ...post });
        setData((prevData) => {
          return {
            ...prevData,
            post,
            titleInput: post.title,
            contentInput: post.content,
          };
        });
      } catch (err) {
        setData((prevData) => {
          return {
            ...prevData,
            error: true,
          };
        });
      }
      setData((prevData) => {
        return {
          ...prevData,
          isFetching: false,
        };
      });
    }
    fetchingPost();
  }, []);
  return (
    <section className="w-5/6 sm:w-3/4 md:w-1/2 bg-slate-900 p-4 rounded-lg shadow-lg mx-auto flex flex-col gap-4">
      {data.error && <p>{data.post.error}</p>}
      {data.post && (
        <>
          <div>
            <h3 className="text-2xl font-semibold mb-2">Edit Post</h3>
          </div>
          <div>
            <label htmlFor="title" className="font-semibold">
              Title
            </label>
            <input
              onChange={handleChangeTitle}
              value={data.titleInput}
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
              value={data.contentInput}
              id="content"
              className="bg-slate-700 focus:outline-none px-3 py-1 rounded w-full"
              type="text"
            />
          </div>
          <div className="flex gap-4 flex-row-reverse">
            <button
              onClick={handleSubmitEdit}
              className="bg-slate-800 px-4 py-2 rounded hover:bg-slate-700"
            >
              Update
            </button>
            <button onClick={onCancel}>Cancel</button>
          </div>
        </>
      )}
    </section>
  );
}
