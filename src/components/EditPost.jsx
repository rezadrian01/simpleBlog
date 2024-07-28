import { useState, useEffect, useContext } from "react";

import { MenuContext } from "../store/Menu-Context";
import { PostContext } from "../store/Post-Context";

import Loading from "./Loading";

import Error from "./Error";

export default function EditPost() {
  const { menuContextState, handleMyPostMenu } = useContext(MenuContext);
  const { fetchingPost, updatingPost } = useContext(PostContext);

  const [data, setData] = useState({
    post: {},
    isLoading: false,
    error: false,
    titleInput: "",
    contentInput: "",
  });
  const [error, setError] = useState(false);
  function handleChangeInput(identifier, value) {
    setData((prevData) => ({
      ...prevData,
      [identifier]: value,
    }));
  }
  const { selectedPostId } = menuContextState;

  async function handleSubmitEdit() {
    if (!data.isLoading) {
      setData((prevData) => ({ ...prevData, isLoading: true }));
    }
    const result = await updatingPost(selectedPostId, {
      title: data.titleInput,
      content: data.contentInput,
    });
    if (!result) {
      setError(true);
      setData((prevData) => ({ ...prevData, isLoading: false }));
      return;
    }
    handleMyPostMenu(localStorage.getItem("token"));
  }

  useEffect(() => {
    async function fetchCurrentPost() {
      if (!data.isLoading) {
        setData((prevData) => ({ ...prevData, isLoading: true }));
      }
      const result = await fetchingPost(selectedPostId);
      if (!result) {
        setError(true);
        setData((prevData) => ({ ...prevData, isLoading: false }));
        return;
      }
      setData((prevData) => ({
        ...prevData,
        isLoading: false,
        post: { ...result.post },
        titleInput: result.post.title,
        contentInput: result.post.content,
      }));
    }
    fetchCurrentPost();
  }, [fetchingPost, menuContextState.selectedPostId]);

  return (
    <section className="w-5/6 sm:w-3/4 md:w-1/2 bg-slate-900 p-4 rounded-lg shadow-lg mx-auto flex flex-col gap-4">
      {error && <Error />}
      {data.isLoading && <Loading />}
      {!data.isLoading && data.post && (
        <>
          <div>
            <h3 className="text-2xl font-semibold mb-2">Edit Post</h3>
          </div>
          <div>
            <label htmlFor="title" className="font-semibold">
              Title
            </label>
            <input
              onChange={({ target }) =>
                handleChangeInput("titleInput", target.value)
              }
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
              onChange={({ target }) =>
                handleChangeInput("contentInput", target.value)
              }
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
            <button onClick={handleMyPostMenu}>Cancel</button>
          </div>
        </>
      )}
    </section>
  );
}
