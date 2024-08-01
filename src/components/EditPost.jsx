import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { uiActions } from "../store/ui-slice";
import { fetchPost, updatePost } from "../store/post-slice";

import Loading from "./Loading";

import Error from "./Error";

export default function EditPost() {
  const dispatch = useDispatch();
  const { isLoading, selectedPostId } = useSelector((state) => state.ui);
  const [error, setError] = useState(false);

  const [data, setData] = useState({
    post: {},
    titleInput: "",
    contentInput: "",
  });
  function handleChangeInput(identifier, value) {
    setData((prevData) => ({
      ...prevData,
      [identifier]: value,
    }));
  }

  async function handleSubmitEdit() {
    const sendData = async () => {
      const resData = await dispatch(
        updatePost(selectedPostId, {
          title: data.titleInput,
          content: data.contentInput,
        })
      );
      if (!resData) {
        setError(true);
        return;
      }
      dispatch(uiActions.backToMyPostMenu());
    };
    sendData();
  }

  useEffect(() => {
    const fetch = async () => {
      const resData = await dispatch(fetchPost(selectedPostId));
      if (!resData) {
        dispatch(uiActions.backToMyPostMenu());
        return;
      }
      setData((prevState) => ({
        ...prevState,
        titleInput: resData.post.title,
        contentInput: resData.post.content,
      }));
    };
    fetch();
  }, [dispatch, selectedPostId]);

  return (
    <section className="w-5/6 sm:w-3/4 md:w-1/2 bg-slate-900 p-4 rounded-lg shadow-lg mx-auto flex flex-col gap-4">
      {error && <Error />}
      {isLoading && <Loading />}
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
            <button onClick={() => dispatch(uiActions.backToMyPostMenu())}>
              Cancel
            </button>
          </div>
        </>
      )}
    </section>
  );
}
