import { useEffect, useState, useContext } from "react";
import PostCard from "./PostCard";
import { PostContext } from "../store/Post-Context";
import Loading from "./Loading";
import Error from "./Error";

export default function Posts() {
  const { fetchingPosts, postContextState } = useContext(PostContext);
  const [error, setError] = useState(false);
  useEffect(() => {
    async function fetchPosts() {
      const result = await fetchingPosts();
      if (!postContextState.isLoading && postContextState.hasError) {
        setError(true);
      } else {
        setError(false);
      }
      return;
    }
    fetchPosts();
  }, [fetchingPosts]);

  return (
    <>
      {postContextState.hasError && <Error />}
      {postContextState.isLoading && <Loading />}
      {!postContextState.isLoading && (
        <ol className="flex flex-col gap-4">
          {postContextState.posts.map((post) => {
            return <PostCard key={post._id} post={post} />;
          })}
        </ol>
      )}
      {!postContextState.isLoading && !postContextState.hasError && (
        <p className="text-center font-thin mt-8 text-slate-500">
          Total Posts: {postContextState.totalPosts}
        </p>
      )}
    </>
  );
}
